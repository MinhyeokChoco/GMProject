const nowlocation = location.search; // 주소의 쿼리스트링 가져옴
const nowIndex = nowlocation.split("=")[1]; // 쿼리스트링에서 인덱스번호 추출
const nowKategorie = new MemorizeKategorie().getSession(); // 세션에서 카테고리 가져옴
const contentObj = new StoreBoard().getContentArray(nowKategorie)[nowIndex]; // 로컬저장소에서 해당 인덱스 컨텐츠 불러오기
const userInfor = new UserLoginManager().getUserInforBox(); // 지금 로그인 중인 유저의 정보를 가져옴
const localConetArray = new StoreBoard().getContentArray(nowKategorie); // 로컬의 모든 정보 불러옴

const userProfileImg = new UserProfileManage('lUserProfile')
const userProfilemessage = new UserProfileManage('lUserMessage')
const userProfileLikeGame = new UserProfileManage('lUserFavoriteGame');

console.log(nowKategorie);

window.onload = () => {
    document.querySelector("#topDiv-userInforDiv-nick").innerHTML = contentObj.userNicknameInfor;
    document.querySelector("#midDiv-titleDiv-h").innerHTML = contentObj.postTitle;
    document.querySelector("#midDiv-contentDiv").innerHTML = contentObj.postContent;
    const imgSrc = userProfileImg.getProfileData(contentObj.userId);
    document.querySelector("#topDiv-profileDiv-img").src = imgSrc;
    const userMessage = userProfilemessage.getProfileData(contentObj.userId);
    console.log(userMessage);
    document.querySelector("#topDiv-userInforDiv-message").innerHTML = userMessage;
    const userLikeGmae = userProfileLikeGame.getProfileData(contentObj.userId);
    document.querySelector ("#midTopDiv-playList-p").innerHTML = userLikeGmae;


    if(userInfor.userId == contentObj.userId) {
        addUDbtn();
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
        default:
            alert("잘못된 접근입니다.");
            /* ↓ 임시 코드입니다 수정 필요 ↓*/
            window.location.href = "https://www.naver.com"
            /* ↑ 임시 코드입니다 수정필요 ↑*/
    }
})

// 수정 및 삭제버튼 구현 함수
function addUDbtn() {
    const pTag = document.createElement("p"); // 수정버튼
    const pTag02 = document.createElement("p"); // 삭제버튼
    pTag.id = "midbottomDiv-updateBtn";
    pTag02.id = "midbottomDiv-deleteBtn";

    document.querySelector("#midbottomDiv").prepend(pTag, pTag02);
    pTag.innerHTML = "수정"
    pTag02.innerHTML = "삭제"

    // 수정 버튼 시행
    pTag.addEventListener('click', () => {
        window.location.href = `../MwritePage/kategorieUpdate.html?index=${nowIndex}`
    })
    
    // 삭제 버튼 클릭
    document.querySelector("#midbottomDiv-deleteBtn").addEventListener('click', () => {
        if (confirm("정말로 글을 삭제하시겠습니까?")) {
            fnImplementation();
        }
    })
}

// 삭제 구현
function fnImplementation() {
    localConetArray.splice(nowIndex, 1); // 로컬스토리지에서 해당 인덱스 부분 삭제
    localStorage.setItem(nowKategorie, JSON.stringify(localConetArray)); // 다시 저장
    
    switch (nowKategorie) {
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
        default:
            alert("잘못된 접근입니다.");
            /* ↓ 임시 코드입니다 수정 필요 ↓*/
            window.location.href = "https://www.naver.com"
        /* ↑ 임시 코드입니다 수정필요 ↑*/
    }
}

// 프사 누르면 해당 유저 정보창으로 이동(추후 버튼은 수정 가능)
document.querySelector("#topDiv-profileDiv").addEventListener('click', () => {
    window.location.href = `../userInfor/userInformation.html?user=${userInfor.userId}`
})