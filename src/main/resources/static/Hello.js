const header = document.querySelector('header');
let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

header.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = header.scrollLeft;
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        let deltaX = e.clientX - startX;
        header.scrollLeft = startScrollLeft - deltaX;
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});

document.addEventListener('mouseleave', function () {
    isDragging = false;
});


const categoriesElement = document.getElementById('categories');
const loadedCategories = new Set();
function loadCategoryImage(category, categoryDiv) {
    fetch(`api/getImg/${category.id}`)
        .then(response => response.blob())
        .then(blob => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            img.style.maxWidth = '180px';
            img.style.maxHeight = '180px';
            categoryDiv.appendChild(img);
        })
        .catch(error => {
            console.error(`Error loading image: ${error}`);
        });
}

function redirectToAddPage(categoryName) {
    window.location.href = `api/add?category=${encodeURIComponent(categoryName)}`;
}
fetch('api/alladmin')
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
            if (!loadedCategories.has(category.groupName)) {
                const categoryDiv = document.createElement('div');
                const categoryP = document.createElement('h3');
                const categoryRh = document.createElement('hr');
                categoryP.textContent = category.groupName;
                categoryDiv.className = 'category-div';
                categoryDiv.appendChild(categoryP);
                categoryDiv.appendChild(categoryRh);
                loadedCategories.add(category.groupName);

                loadCategoryImage(category, categoryDiv);

                categoryDiv.addEventListener('click', () => {
                    redirectToAddPage(category.groupName);
                });

                categoriesElement.appendChild(categoryDiv);
            }
        });
    })
    .catch(error => {
        console.error(`Error loading categories: ${error}`);
    });

function handleDivClick(event) {
    const divId = event.currentTarget.id;

    fetch(`/api/category?name=${divId}`)
        .then(response => {
            if (response.ok) {

                const mainElement = document.getElementById("main");
                mainElement.scrollIntoView({ behavior: "smooth" });
            } else {
                console.error(`Chyba při volání endpointu: ${response.status}`);
            }
        })
        .catch(error => {
            console.error(`Chyba při volání endpointu: ${error}`);
        });
}


const clickableDivs = document.querySelectorAll(".clickable-div");
clickableDivs.forEach(function(div) {
    div.addEventListener("click", handleDivClick);
