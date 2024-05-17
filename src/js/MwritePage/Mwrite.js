const userInfor = new UserLoginManager().getUserInforBox(); // 로컬 스토리지에서 유저 정보 가져옴
const postBtn = document.querySelector("#itembox-make"); // 글 작성 HTML버튼 가져옴
const cancleBtn = document.querySelector("#itembox-cancle"); // 글 작성 취소 HTML 버튼 가져옴
const nowKategorie = new MemorizeKategorie().getSession(); // 세션에 저장된 카테고리명을 가져옴
const storeBoard = new StoreBoard(nowKategorie); // 컨텐츠가 담길 객체 생성

/* 글 작성 이벤트 */
postBtn.addEventListener('click', () => {
    // 제목 공백입력 방지
    if (document.querySelector("#title-box-form-input").value.trim() == "") {
        alert("제목을 입력하세요");
        return;
    }
    // 제목 글자수 제한
    if (document.querySelector("#title-box-form-input").value.length > 30) {
        alert("제목은 30자를 넘길 수 없습니다.");
        return;
    }
        // 본문 공백입력 방지
    if (document.querySelector("#text-box-area").value.trim() == "") {
        alert("본문 내용을 입력하세요");
        return;
    }
    // 컨텐츠 내용 임시배열에 저장
    const mateBoardManager = new MateBoardManager(new GetConetent().getTitleContent("#title-box-form-input"), new GetConetent().getPosterConetent("#text-box-area"), userInfor.userNickname, userInfor.userId);
    // 임시배열을 로컬 저장소에  저장
    storeBoard.setContentArray(mateBoardManager, nowKategorie);

    // 원래 페이지로 돌아가는 스위치문
    switch (nowKategorie) {
        case "LOL":
            window.location.href = "../kategoriePage/LoLPage.html";
            break;
        case "StarRail":
            window.location.href = "../kategoriePage/StarRail.html"
            break;
        default:
            alert("잘못된 접근입니다."); 
            /* ↓ 임시 코드입니다 수정 필요 ↓*/
            window.location.href = "https://www.naver.com"
            /* ↑ 임시 코드입니다 수정필요 ↑*/
    }
})


/* 취소버튼 이벤트 */
cancleBtn.addEventListener('click', () => {
    switch(nowKategorie) {
        case "LOL":
            window.location.href = "../kategoriePage/LoLPage.html";
            break;
         case "StarRail":
            window.location.href = "../kategoriePage/StarRail.html"
            break;
            
        default:
            alert("잘못된 접근입니다.");
            /* ↓ 임시 코드입니다 수정 필요 ↓*/
            window.location.href = "https://www.naver.com"
            /* ↑ 임시 코드입니다 수정필요 ↑*/
    }
})