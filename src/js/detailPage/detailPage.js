const nowlocation = location.search; // 주소의 쿼리스트링 가져옴
const nowIndex = nowlocation.split("=")[1]; // 쿼리스트링에서 인덱스번호 추출
const nowKategorie = new MemorizeKategorie().getSession(); // 세션에서 카테고리 가져옴
const contentObj = new StoreBoard().getContentArray(nowKategorie)[nowIndex]; // 로컬저장소에서 해당 인덱스 컨텐츠 불러오기
console.dir(contentObj);

window.onload = () => {
    document.querySelector("#topDiv-userInforDiv-nick").innerHTML = contentObj.userNicknameInfor;
    document.querySelector("#midDiv-titleDiv-h").innerHTML = contentObj.postTitle;
    document.querySelector("#midDiv-contentDiv").innerHTML = contentObj.postContent;
}

document.querySelector("#midbottomDiv-listBtn").addEventListener('click', () => {
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