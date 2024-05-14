// const userLoginStatus = new UserLoginStatus;
// const userLoginManager = new UserLoginManager;

// let userLogin = userLoginStatus.getUserStatus();
// let userInforObj = userLoginManager.getUserInforBox();

const postGmBtn = document.querySelector("#div-writeButton-box");

const userLogin = true;

postGmBtn.addEventListener('click', () => {
    if(!userLogin) {
        alert("로그인을 해주세요!");
    } else {
        window.location.href = "../MwritePage/kategorieWrite.html";
    }
})

console.log(typeof (new Date().getFullYear() +"-"+ (new Date().getMonth() + 1) + "-"+ new Date().getDate()))