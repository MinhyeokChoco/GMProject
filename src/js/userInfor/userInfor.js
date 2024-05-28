/*↑ 테스트용 */
const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 페이지 유저 정보

const userDB = JSON.parse(localStorage.getItem('lUserDB')); // 전체 유저 정보 가져옴
const pageuserIndex = new UserDBManager('lUserDB').getWantedUserDBIndex(pageUserId); // 페이지 유저의 인덱스 번호 찾기
const pageuserInfor = userDB[pageuserIndex]; // 전체 유저 정보에서 페이지 유저 정보를 찾아온다.
const nowConnectUser = new UserLoginManager().getUserInforBox() || {}; // 현재 접속 중인 유저

const userLastCheckTime = new UserProfileManage("lastGiveAScoreTime"); // 시간
const userMessase = new UserProfileManage("lUserMessage").getProfileData(pageUserId); // 상메
const userProfile = new UserProfileManage("lUserProfile").getProfileData(pageUserId); // 프사
const userTier = new ForGrade().getUserTier(pageUserId); // 티어
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
    case "kartrider":
        userFavorteGame = "카트라이더";
        break;
    case "lostark":
        userFavorteGame = "로스트아크";
        break;
    case "overwatch":
        userFavorteGame = "오버워치";
        break;
    case "TFT":
        userFavorteGame = "전략적 팀 전투";
        break;
    case "starcraft":
        userFavorteGame = "스타크래프트";
        break;
    case "suddenattack":
        userFavorteGame = "서든어택";
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
        createReviewBtn(); // 별점주기 창 만들기 위한 함수
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

// 메이트 평가 버튼 생성
function createReviewBtn() {
    const pTag = document.createElement('p');
    document.querySelector("#addtionalBottmDiv").append(pTag);
    pTag.id = "mateAssessP";

    pTag.innerHTML = "메이트 평가";
    
    pTag.addEventListener('click', () => {
        assessMate();
    })
}

// 평가버튼 누르면 모달창이 뜨게
function assessMate() {
    document.querySelector("#mateAssessP").addEventListener('click', () => {
        document.querySelector("#mateTier-background").style.display = "flex";
    })
}

// 배경 누르면 모달창 닫히게
document.querySelector("#mateTier-background").addEventListener('click', (e) => {
    const modalBackground = document.querySelector("#mateTier-background");
    if (e.target === modalBackground) {
        modalBackground.style.display = "none"
    }
})

// 이벤트 버블링 방지
document.querySelector("#meteTier-modal").addEventListener('click', (e) => {
    e.stopPropagation();
});

// 별점 submit 눌렀을때 이벤트
document.querySelector("#modal-form-submit").addEventListener('click', (e) => {
    e.preventDefault();
    executeTheAssesment();
});

// 별점 주는 함수
function executeTheAssesment() {
    const selectedRadio = document.querySelector("input[type = radio][name='evluation']:checked"); // 레디오 값 가져옴
    if(selectedRadio) {
        markInMT = selectedRadio.value;
    } else {
        return; // 선택 안되있으면 리턴
    }
    const checkPossible = checkTheTime(nowConnectUser.userId); // 마지막으로 평가한 날 체크
    // const checkPossible = true; // 테스트용 코드

    if (!checkPossible) {
        alert("메이트 평가는 하루에 한번만 하실 수 있습니다");
        return;
    }
    markInMT = Number(markInMT); // 라디오 밸류 숫자로 변환
    const userTierImgManager = new ForGrade();
    userTierImgManager.setTierData(pageuserInfor.userId, markInMT);
    location.reload();
}

// 시간 확인하는 함수
function checkTheTime(id) {
    const userDate = userLastCheckTime.getProfileData(id);
    const today = new Date().toISOString().split('T')[0];
    if(userDate === null) {
        userLastCheckTime.setProfileData(id, today);
        return true; // 한번도 평가한적 없으면 (로컬스토리지에 저장된 값이 없으면) 현재 날짜 저장하고 true 반환
    }
    // 날짜 비교 후 결과 반환
    if (userDate !== today) {
        return true;
    } else {
        return false;
    }
}