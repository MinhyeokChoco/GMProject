const viewContent = document.getElementById("viewContent"); // 상세 페이지의 내용들을 담을 div
const title = document.getElementById("_title"); // 상세 페이지의 출력 될 제목
const content = document.getElementById("_content"); // 내용
const writer = document.getElementById("_writer"); // 작성자
const date = document.getElementById("_date"); // 작성일
const views = document.getElementById("_views"); // 조회수

const csData = JSON.parse(localStorage.getItem("csData")); // 로컬 스토리지에 저장되어 있는 csData 키 값을 JSON 파씽하여 csData 변수에 할당

const index = (parseInt(sessionStorage.getItem("viewIndex"))); // 세션 스토리지에 저장되어 있는 viewIndex 키 안의 값을 정수형으로 변환 후 index 변수에 할당
if (csData !== null) { // 로컬 스토리지에 저장되어 있는 csData키 안의 값이 있으면
    title.innerHTML = `제목 : ${csData[index].title}`; // _title id를 가지고 있는 div 태그 안에 내용 할당
    content.innerHTML = `내용 : ${csData[index].content}`; // _content
    writer.innerHTML = `작성자 : ${csData[index].writer}`; // _writer
    date.innerHTML = `작성일 : ${csData[index].date}`; // _date
    views.innerHTML = `조회수 : ${csData[index].views}`; // _views
}

const deleteBtn = document.getElementById("_delete"); // 삭제 버튼

deleteBtn.addEventListener("click", () => { // 삭제 버튼에 클릭했을 때의 이벤트를 추가
    csData.splice(index, 1); // 로컬스토리지 안 배열에서 보기 버튼을 눌렀을 때의 해당 객체를 삭제
    for (let i = 0; i < csData.length; i++) { // 삭제 후 배열의 인덱스 재설정
        csData[i].index = i;
    }
    const setCS = JSON.stringify(csData); // csData를 문자형으로 변환해서 setCS 변수에 할당
    localStorage.setItem("csData", setCS); // 로컬스토리지 csData 키 값에 새로 저장
    location.href = "./list.html"; // 삭제 후 저장하면서 list 페이지로 이동
});

const modifyBtn = document.getElementById("_modify"); // 수정 버튼

modifyBtn.addEventListener("click", () => { // 수정 버튼을 눌렀을 때의 이벤트 추가
    location.href = "modify.html" // 수정 페이지로 이동
})