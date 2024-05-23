/*↑ 테스트용 */
const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 페이지 유저 정보
console.log(pageUserId);

const userDB = JSON.parse(localStorage.getItem('lUserDB')); // 전체 유저 정보 가져옴
const pageuserIndex = new UserDBManager('lUserDB').getWantedUserDBIndex(pageUserId); // 페이지 유저의 인덱스 번호 찾기
const pageuserInfor = userDB[pageuserIndex]; // 전체 유저 정보에서 페이지 유저 정보를 찾아온다.
const nowConnectUser = new UserLoginManager().getUserInforBox(); // 현재 접속 중인 유저

const userMessase = new UserProfileManage("lUserMessage").getProfileData(pageUserId); // 상메
const userProfile = new UserProfileManage("lUserProfile").getProfileData(pageUserId); // 프사
const userTier = new UserProfileManage("lUserTier").getProfileData(pageUserId); // 티어
const userFavorite = new UserProfileManage("lUserFavoriteGame").getProfileData(pageUserId); //즐겨하는 게임
let userFavorteGame = ""

// select 메뉴의 밸류 값을 텍스트로 변환하는 스위치문
switch (userFavorite) {
    case "LOL":
        userFavorteGame = "리그 오브 레전드";
        break;
    case "starrail":
        userFavorteGame = "붕괴: 스타레일";
        break;
    case "eternalreturn":
        userFavorteGame = "이터널 리턴";
        break;
    case "PUBG":
        userFavorteGame = "배틀그라운드";
        break;
    case "valorant":
        userFavorteGame = "발로란트";
        break;
    default:
        userFavorteGame = "";
}

window.onload = () => {
    document.querySelector("#topDiv-nicknameRegion-nick").innerHTML = pageuserInfor.userNickname;
    document.querySelector("#bottomDiv-messageRegion").innerHTML = userMessase;
    document.querySelector("#topDiv-nicknameRegion-tier").innerHTML += userTier;
    document.querySelector("#midDiv-favoritRegion-p").innerHTML = userFavorteGame;
    document.querySelector(".topDiv-imgRegion-img").src = userProfile;

    if (nowConnectUser.userId === pageUserId) {
        createUpdateBtn(); // 아이디랑 페이지 유저가 같으면 정보수정 버튼이 뜬다.
    } else if (nowConnectUser.userId !== pageUserId && nowConnectUser.userLogOn) {
        // createReview(); 별점주기 창 만들기 위한 함수 (추가 예정)
    }
}

// 정보수정 버튼 생성
function createUpdateBtn() {
    const pTag = document.createElement('p');
    document.querySelector("#addtionalBottmDiv").append(pTag);

    pTag.innerHTML = "정보수정";
    
    pTag.addEventListener('click', () => {
        window.location.href = `./userInforUpdate.html?user=${pageUserId}`
})
}