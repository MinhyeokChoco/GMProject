// localStorage.setItem("lUserInfor", JSON.stringify({userNickname: "이리사랑단", userId: "test", userLogOn: true}));
// localStorage.setItem("lUserDB", JSON.stringify([{userId: "March7th", userNickname: "Mar. 7th"}, {userId:"test", userNickname: "이리사랑단"},{userId:"id",userNickname: "TEST"},{userId: "test2",userNickname:"computer"}]))
// const userTierSetting = new UserProfileManage("lUserTier");
// const userProfilSetting = new UserProfileManage("lUserProfile");
// const userMessageSetting = new UserProfileManage("lUserMessage");
// const userFavoriteSetting = new UserProfileManage("lUserFavoriteGame");
// userTierSetting.setProfileData(userId, 5);
// userProfilSetting.setProfileData(userId,`../../../img/anonymous icon.png`);
// userMessageSetting.setProfileData(userId, "테스트용 계정입니다.");
// userFavoriteSetting.setProfileData(userId, "");
// ↑ 테스트용 코드
const user = JSON.parse(localStorage.getItem("lUserInfor"));
const postGmBtn = document.querySelector("#div-writeButton-box"); // 글작성 HTML요소 가져오기


// 메이트 만들기 버튼 클릭시 동작 함수
postGmBtn.addEventListener('click', () => {
    if (!user.userLogOn) {
        alert("로그인을 해주세요!");
    } else {
        new MemorizeKategorie().setSession(globalGameName) // 세션에 카테고리명 저장
        window.location.href = "../MwritePage/kategorieWrite.html";
    }
})


// 게시물 그리기 시작
window.onload = () => {
    const mContentList = new StoreBoard().getContentArray(globalGameName) || [];
    for (let i = 0; i < mContentList.length; i++)
        {
            if (mContentList[i] === null) {
                continue;
            }
            const pTag_03 = document.createElement("p"); // 글번호
            const divTag = document.createElement("div");
            const hTag = document.createElement("h3"); // 제목
            const spanTag = document.createElement("span"); // 본문
            const pTag = document.createElement("p"); // 닉네임
            const pTag_02 = document.createElement("p"); // 댓글 수
            divTag.classList.add('div-item-object');
            
            document.querySelector("#div-item-box").prepend(divTag);
            divTag.append(pTag_03, hTag, spanTag, pTag, pTag_02);
            pTag_03.innerHTML = `# ${i+1}`; // 글번호
            hTag.innerHTML = mContentList[i].postTitle; // 제목
            spanTag.innerHTML = mContentList[i].postContent; // 본문
            pTag.innerHTML = mContentList[i].userNicknameInfor; // 닉네임
            pTag_02.innerHTML = `댓글 수 ${replyCount(i)}`; // 댓글수

            //div 태그에 링크 기능 추가
            divTag.addEventListener("click", () => {
                new MemorizeKategorie().setSession(globalGameName)
                window.location.href = `../detailPage/detailPage.html?index=${i}`
            })
        }
}

function replyCount(index) {
    let replyOfContent = JSON.parse(localStorage.getItem(`${globalGameName}${index}`));
    let replyOfContentLength = 0;
    let totalRepleNumber = 0;
    if (replyOfContent !== null) {
        replyOfContentLength = replyOfContent.length;
    } else {
        replyOfContentLength = 0;
    }
    totalRepleNumber += replyOfContentLength;
    for(let i = 0; i < replyOfContentLength; i++) {
        let commentOfReply = JSON.parse(localStorage.getItem(`${globalGameName}${index}_${i}`));
        if (commentOfReply === null) {
            continue;
        }
        totalRepleNumber += commentOfReply.length;
    }
    console.log("1: ", totalRepleNumber);
    return totalRepleNumber;
}