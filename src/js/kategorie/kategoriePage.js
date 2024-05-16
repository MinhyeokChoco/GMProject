const userLogin = true; 
localStorage.setItem("lUserInfor", JSON.stringify({objUserNickname: "nick", objUserId: "id"}));
// ↑ 테스트용 코드

// const userLoginStatus = new UserLoginStatus;
// const userLoginManager = new UserLoginManager;

// let userLogin = userLoginStatus.getUserStatus();
// let userInforObj = userLoginManager.getUserInforBox();

const postGmBtn = document.querySelector("#div-writeButton-box"); // 메이트 만들기 div id명 가져오기


// 메이트 만들기 버튼 클릭시 동작 함수
postGmBtn.addEventListener('click', () => {
    if (!userLogin) {
        alert("로그인을 해주세요!");
    } else {
        new MemorizeKategorie().setSession(globalGameName) // 세션에 카테고리명 저장
        window.location.href = "../MwritePage/kategorieWrite.html";
    }
})


// 게시물 그리기 시작
window.onload = () => {
    const mContentList = new StoreBoard().getContentArray(globalGameName);
    console.log(mContentList);

    for (i = 0; i < mContentList.length; i++)
        {
            const divTag = document.createElement("div");
            const hTag = document.createElement("h3"); // 제목
            const spanTag = document.createElement("span"); // 본문
            const pTag = document.createElement("p"); // 닉네임
            const pTag_02 = document.createElement("p"); // 댓글 수
            divTag.classList.add('div-item-object');
            
            document.querySelector("#div-item-box").prepend(divTag);
            divTag.append(hTag);
            divTag.append(spanTag);
            divTag.append(pTag);
            divTag.append(pTag_02);
            hTag.innerHTML = mContentList[i].postTitle;
            spanTag.innerHTML = mContentList[i].postContent;
            pTag.innerHTML = mContentList[i].userNicknameInfor;
            pTag_02.innerHTML = `댓글 수 0`;
            console.log(i)
        }
}
