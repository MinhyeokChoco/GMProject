const userLogin = true; 
localStorage.setItem("lUserInfor", JSON.stringify({userNickname: "nick", userId: "id", obj, userprofile: "src"}));
// ↑ 테스트용 코드

const user = localStorage.getItem("lUserInfor")
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

    for (let i = 0; i < mContentList.length; i++)
        {
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
            pTag_02.innerHTML = `댓글 수 0`; // 댓글수

            //div 태그에 링크 기능 추가
            divTag.addEventListener("click", () => {
                new MemorizeKategorie().setSession(globalGameName)
                window.location.href = `../detailPage/detailPage.html?index=${i}`
            })
        }
}
