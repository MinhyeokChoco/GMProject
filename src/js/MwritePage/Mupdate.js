const nowlocation = location.search; // 주소의 쿼리스트링 가져옴
const nowIndex = nowlocation.split("=")[1]; // 쿼리스트링에서 인덱스번호 추출
const nowKategorie = new MemorizeKategorie().getSession(); // 세션에서 카테고리 가져옴
const contentObj = new StoreBoard().getContentArray(nowKategorie)[nowIndex]; // 로컬저장소에서 해당 인덱스 컨텐츠 불러오기
const userInfor = new UserLoginManager().getUserInforBox(); // 유저 정보를 가져옴
const postBtn = document.querySelector("#itembox-make"); // 글 작성 HTML버튼 가져옴
const cancleBtn = document.querySelector("#itembox-cancle"); // 글 작성 취소 HTML 버튼 가져옴

document.querySelector("#title-box-form-input").value = contentObj.postTitle;
document.querySelector("#text-box-area").innerHTML = contentObj.postContent;

cancleBtn.addEventListener('click', () => {
    const beforeSrc = document.referrer;
    window.location.href = beforeSrc;
})