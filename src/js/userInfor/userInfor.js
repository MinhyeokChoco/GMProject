const userId = "id";
/*↑ 테스트용 */

const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1];
const nowConnectUser = new UserLoginManager().getUserInforBox();

const userMessase = new UserProfileManage("lUserMessage").getProfileData(pageUserId); // 상메
const userProfile = new UserProfileManage("lUserProfile").getProfileData(pageUserId); // 프사
const userTier = new UserProfileManage("lUserTier").getProfileData(pageUserId); // 티어
const userFavorite = new UserProfileManage("lUserFavoritGame").getProfileData(pageUserId); //즐겨하는 게임
console.log(userMessase);

window.onload = () => {
    document.querySelector("#topDiv-nicknameRegion-nick").innerHTML = nowConnectUser.userNickname;
    document.querySelector("#bottomDiv-messageRegion").innerHTML = userMessase;
    document.querySelector("#topDiv-nicknameRegion-tier").innerHTML += userTier;
    document.querySelector("#midDiv-favoritRegion").innerHTML = userFavorite;

    if (nowConnectUser.userId === pageUserId) {
        createUpdateBtn();
    } else if (nowConnectUser.userId !== pageUserId && nowConnectUser.userLogOn) {
        createReview();
    }
}

function createUpdateBtn() {
    const pTag = document.createElement('p');
    document.querySelector("#addtionalBottmDiv").append(pTag);

    pTag.innerHTML = "정보수정";
    
    pTag.addEventListener('click', () => {
        window.location.href = `./userInforUpdate.html?user=${pageUserId}`
})
}