
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


    });
});