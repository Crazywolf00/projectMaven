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
    const addImageButton = document.getElementById('addImage');

    addImageButton.addEventListener('click', function (e) {
        e.preventDefault();

        const uniqueId = Date.now();

        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.name = 'imageUpload';
        newInput.required = true;
        newInput.classList.add('add');
        newInput.id = `imageUpload_${uniqueId}`;

        const newImage = document.createElement('img');
        newImage.style.display = 'none';
        newImage.id = `thumbnail_${uniqueId}`;
        newImage.alt = 'Miniatura obrázku';
        newImage.style.maxWidth = '100px';
        newImage.style.maxHeight = '100px';

        newInput.addEventListener('change', function (e) {
            e.preventDefault();
            if (newInput.files && newInput.files[0]) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    newImage.style.display = 'block';
                    newImage.src = e.target.result;
                };

                reader.readAsDataURL(newInput.files[0]);
            }
        });

        infoForm.insertBefore(newInput, addImageButton);
        infoForm.insertBefore(newImage, addImageButton);
    });

    infoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const groupName = document.getElementById('groupName').value;
        const setName = document.getElementById('setName').value;

        const formData = new FormData();
        formData.append('key', info);
        formData.append('groupName', groupName);
        formData.append('setName', setName);
        console.log("ahoj1")
        document.querySelectorAll(".add").forEach(
            input=> {
                console.log(input)
                console.log("ahoj2")
                formData.append('img', input.files[0])
            })
        console.log("ahoj3")


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

    const resetButton = document.querySelector('#reset-button');
    resetButton.addEventListener('click' , e => {
        e.preventDefault();
        cat();
    })
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