const nowlocation = location.search; // 주소의 쿼리스트링 가져옴
const nowIndex = nowlocation.split("=")[1]; // 쿼리스트링에서 인덱스번호 추출
const nowKategorie = new MemorizeKategorie().getSession(); // 세션에서 카테고리 가져옴
const contentObj = new StoreBoard().getContentArray(nowKategorie)[nowIndex]; // 로컬저장소에서 해당 인덱스 컨텐츠 불러오기
const userInfor = new UserLoginManager().getUserInforBox() || {}; // 지금 로그인 중인 유저의 정보를 가져옴
const localConetArray = new StoreBoard().getContentArray(nowKategorie); // 로컬의 모든 정보 불러옴
const postingNumber = nowKategorie + nowIndex; // 댓글 구현을 위한 현재 카테고리와 게시물 인덱스 정보
const replyStore = new StoreBoard(postingNumber); // 댓글 담을 객체 생성
const replyObj = new StoreBoard().getContentArray(postingNumber); // 현재페이지 댓글 가져옴
const elementMaker = new createHTMLElement(); // html 요소 만들어주는 클래스 불러옴
const userProfileImg = new UserProfileManage('lUserProfile');


window.onload = () => {
    lenderDetailPage();
}
    

function lenderDetailPage() {
    const userProfilemessage = new UserProfileManage('lUserMessage')
    const userLikeGmae = new UserProfileManage('lUserFavoriteGame').getProfileData(contentObj.userId);
    let userLikeGameToText = ""
    
    switch (userLikeGmae) {
        case "LOL":
            userLikeGameToText = "리그 오브 레전드";
            break;
        case "starrail":
            userLikeGameToText = "붕괴: 스타레일";
            break;
        case "eternalreturn":
            userLikeGameToText = "이터널 리턴";
            break;
        case "PUBG":
            userLikeGameToText = "배틀그라운드";
            break;
        case "valorant":
            userLikeGameToText = "발로란트";
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
            userLikeGameToText = "";
    }
    

    const imgSrc = userProfileImg.getProfileData(contentObj.userId);
    const userMessage = userProfilemessage.getProfileData(contentObj.userId);
    const userTier = new ForGrade().getUserTier(contentObj.userId);

    //최상단 영역
    document.querySelector("#topDiv-userInforDiv-nick").innerHTML = contentObj.userNicknameInfor;
    document.querySelector("#topDiv-userInforDiv-message").innerHTML = userMessage;
    document.querySelector(".topDiv-profileDiv-img").src = imgSrc; // 프사
    document.querySelector("#topDiv-userInforDiv-tier").innerHTML += userTier; //티어
    //즐겨하는 게임
    document.querySelector ("#midTopDiv-playList-p").innerHTML = userLikeGameToText;
    //제목 및 본문
    document.querySelector("#midDiv-titleDiv-h").innerHTML = contentObj.postTitle;
    document.querySelector("#midDiv-contentDiv").innerHTML = contentObj.postContent;



    // 업데이트 삭제 버튼 생성
    if(userInfor.userId == contentObj.userId) {
        addUDbtn();
    }

    // 댓글 생성
    if(replyObj) {
        renderReply();
    }
}

// 목록으로 기능 구현
document.querySelector("#midbottomDiv-listBtn").addEventListener('click', () => {
    switch(nowKategorie) {
        case "LOL":
            window.location.href = "../kategoriePage/LoLPage.html";
            break;
        case "StarRail":
            window.location.href = "../kategoriePage/StarRail.html"
            break;
        case "PUBG":
            window.location.href = "../kategoriePage/PUBG.html";
            break;
        case "eternalreturn":
            window.location.href = "../kategoriePage/eternalreturn.html";
            break;
        case "valorant":
            window.location.href = "../kategoriePage/valorant.html"
            break;
        case "kartrider":
            window.location.href = "../kategoriePage/kartrider.html"
            break;
        case "lostark":
            window.location.href = "../kategoriePage/lostark.html"
            break;
        case "overwatch":
            window.location.href = "../kategoriePage/overwatch.html"
            break;
        case "starcraft":
            window.location.href = "../kategoriePage/starcraft.html"
            break;
        case "steamgame":
            window.location.href = "../kategoriePage/steamgame.html"
            break;
        case "suddenattack":
            window.location.href = "../kategoriePage/suddenattack.html"
            break;
        case "TFT":
            window.location.href = "../kategoriePage/TFT.html"
            break;
        default:
            alert("잘못된 접근입니다.");
            /* ↓ 임시 코드입니다 수정 필요 ↓*/
            window.location.href = "https://www.naver.com"
            /* ↑ 임시 코드입니다 수정필요 ↑*/
    }
})


// 프사 누르면 해당 유저 정보창으로 이동
document.querySelector("#topDiv-profileDiv").addEventListener('click', () => {
    window.location.href = `../userInfor/userInformation.html?user=${contentObj.userId}`
})


