const userInforObj = new UserLoginManager().getUserInforBox(); // 아이디 닉네임 등등...


window.onload = () => {
    document.querySelector("#topDiv-nicknameRegion-nick").innerHTML = userInforObj.userNickname;
    document.querySelector("#topDiv-nicknameRegion-message").innerHTML = userProfileObj.userMessase;
}