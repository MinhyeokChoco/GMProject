const nowlocation = location.search; // 주소의 쿼리스트링 가져옴
const nowIndex = nowlocation.split("=")[1]; // 쿼리스트링에서 인덱스번호 추출
const nowKategorie = new MemorizeKategorie().getSession(); // 세션에서 카테고리 가져옴
const contentObj = new StoreBoard().getContentArray(nowKategorie)[nowIndex]; // 로컬저장소에서 해당 인덱스 컨텐츠 불러오기
const userInfor = new UserLoginManager().getUserInforBox(); // 지금 로그인 중인 유저의 정보를 가져옴
const localConetArray = new StoreBoard().getContentArray(nowKategorie); // 로컬의 모든 정보 불러옴
const postingNumber = nowKategorie + nowIndex; // 댓글 구현을 위한 현재 카테고리와 게시물 인덱스 정보
const replyObj = new StoreBoard().getContentArray(postingNumber); // 현재페이지 댓글 가져옴


const userProfileImg = new UserProfileManage('lUserProfile');
const userProfilemessage = new UserProfileManage('lUserMessage')
const userProfileLikeGame = new UserProfileManage('lUserFavoriteGame');
const userLikeGmae = userProfileLikeGame.getProfileData(contentObj.userId);
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
    default:
        userLikeGameToText = "";
}


window.onload = () => {
    
    const imgSrc = userProfileImg.getProfileData(contentObj.userId);
    const userMessage = userProfilemessage.getProfileData(contentObj.userId);

    //최상단 영역
    document.querySelector("#topDiv-userInforDiv-nick").innerHTML = contentObj.userNicknameInfor;
    document.querySelector("#topDiv-userInforDiv-message").innerHTML = userMessage;
    document.querySelector(".topDiv-profileDiv-img").src = imgSrc; // 프사
    //즐겨하는 게임
    document.querySelector ("#midTopDiv-playList-p").innerHTML = userLikeGameToText;
    //제목 및 본문
    document.querySelector("#midDiv-titleDiv-h").innerHTML = contentObj.postTitle;
    document.querySelector("#midDiv-contentDiv").innerHTML = contentObj.postContent;


    if(userInfor.userId == contentObj.userId) {
        addUDbtn();
    }

    if(replyObj) {
        lenderReply();
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

// 수정 및 삭제버튼 생성 함수
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
    localConetArray[nowIndex] = null; // 로컬스토리지에서 해당 인덱스 부분 삭제
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
    window.location.href = `../userInfor/userInformation.html?user=${contentObj.userId}`
})


// 댓글 달기
document.querySelector("#bottomDiv-replyDiv-form").addEventListener('submit', (e) => {
    e.preventDefault(e);
    if (document.querySelector("#bottomDiv-replyDiv-area").value.trim() === "")
        {
            alert("내용을 입력해주세요");
            return;
        }
    const replyContent = new ReplyManager(new GetConetent().getPosterConetent("#bottomDiv-replyDiv-area"), userInfor.userNickname, userInfor.userId)
    const replyStore = new StoreBoard(postingNumber);
    replyStore.setContentArray(replyContent, postingNumber);
    location.reload();
})

function lenderReply() {
    console.dir(replyObj);
    for(let i = 0; i < replyObj.length; i++) {
        if(replyObj[i] === null) {
            continue;
        }

        const replyTag = document.createElement('div'); // 댓글 전체 박스
        replyTag.classList.add("bottomDiv-replyDiv-contentDiv-replyBox");

        const profileDivTag = document.createElement('div'); // 프사 영역
        profileDivTag.classList.add("contentDiv-profile");

        const profileImg = document.createElement('img'); // 프사 이미지태그
        profileImg.classList.add('topDiv-profileDiv-img');

        const contentDivTag = document.createElement('div'); // 닉네임 댓글 내용 담는 박스
        contentDivTag.classList.add("contentDiv-reple");

        const nickPTag = document.createElement('p'); // 닉네임
        nickPTag.id = "nickNamePtag";
        nickPTag.classList.add('contentDiv-reple-nickName');

        const contentPTag = document.createElement('p'); // 댓글 내용
        contentPTag.id = "contentPtag";
        contentPTag.classList.add('contentDiv-reple-p');

        document.querySelector("#bottomDiv-replyDiv-contentDiv").append(replyTag);
        replyTag.append(profileDivTag, contentDivTag);
        profileDivTag.append(profileImg);
        contentDivTag.append(nickPTag, contentPTag);

        profileImg.src = userProfileImg.getProfileData(replyObj[i].userId);
        nickPTag.innerHTML = replyObj[i].nickname
        contentPTag.innerHTML = replyObj[i].content;

    }
}