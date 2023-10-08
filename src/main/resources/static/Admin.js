let info = "";

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


    infoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const groupName = document.getElementById('groupName').value;
        const setName = document.getElementById('setName').value;
        const imageUpload = document.getElementById('imageUpload').files[0];

        const formData = new FormData();
        formData.append('key', info);
        formData.append('groupName', groupName);
        formData.append('setName', setName);
        if (imageUpload) {
            formData.append('img', imageUpload);
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
