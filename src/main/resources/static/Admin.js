let info = "info";

function checkPassword() {
    const inputPassword = prompt("Zadejte heslo:");
    fetch("api/password?inputPassword=" + inputPassword)
        .then(response => {
            if (response.status === 200) {
                response.text()
                    .then(body => {
                        info = body;
                    })
            } else {
                checkPassword();
            }
        })
}

checkPassword();

document.addEventListener('DOMContentLoaded', function () {
    const infoForm = document.getElementById('infoForm');
    const imageUpload = document.getElementById('imageUpload');
    const thumbnail = document.getElementById('thumbnail');

    const resetButton = document.querySelector("#reset-button")
    resetButton.addEventListener('click', e => {
        e.preventDefault();
        cat();
    })

    imageUpload.addEventListener('change', function (e) {
        e.preventDefault();
        if (imageUpload.files && imageUpload.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                thumbnail.style.display = 'block';
                thumbnail.src = e.target.result;
            };

            reader.readAsDataURL(imageUpload.files[0]);
        }
    });

    infoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const groupName = document.getElementById('groupName').value;
        const setName = document.getElementById('setName').value;
        const selectedImage = imageUpload.files[0];

        const formData = new FormData();
        formData.append('key', info);
        formData.append('groupName', groupName);
        formData.append('setName', setName);
        if (selectedImage) {
            formData.append('img', selectedImage);
        }

        fetch('api/post', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Chyba při provádění HTTP požadavku:', error);
            });
    });
});


function cat() {
    const asideElement = document.querySelector('#cat');
    asideElement.textContent = "";
    fetch('api/alladmin?key=' + info)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const categories = data;

            const categoryList = document.createElement('ul');
            categories.forEach(category => {
                const listItem = document.createElement('li');
                listItem.textContent = category;
                categoryList.appendChild(listItem);
            });

            asideElement.appendChild(categoryList);
        })
}