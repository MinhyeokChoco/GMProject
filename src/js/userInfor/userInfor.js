const userInforObj = new UserLoginManager().getUserInforBox(); // 아이디 닉네임 등등...
const userProfileObj = new UserProfileManage().getProfileData(); // 티어, 상메, 프사...

window.onload = () => {
    document.querySelector("#topDiv-nicknameRegion-nick").innerHTML = userInforObj.userNickname;
    document.querySelector("#topDiv-nicknameRegion-message").innerHTML = userProfileObj.userMessase;
}