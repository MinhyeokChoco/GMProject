const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 현재 접속중인 유저 아이디

document.querySelector("#topDiv-form-upload").addEventListener('change', (e) => {
    console.dir(e.target.files[0]);
});