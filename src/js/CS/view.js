const viewContent = document.getElementById("viewContent"); // 상세 페이지의 내용들을 담을 div
const title = document.getElementById("_title"); // 상세 페이지의 출력 될 제목
const content = document.getElementById("_content"); // 내용
const writer = document.getElementById("_writer"); // 작성자
const date = document.getElementById("_date"); // 작성일
const views = document.getElementById("_views"); // 조회수

const csData = JSON.parse(localStorage.getItem("csData")); // 로컬 스토리지에 저장되어 있는 csData 키 값을 JSON 파씽하여 csData 변수에 할당

const index = (parseInt(sessionStorage.getItem("viewIndex"))); // 세션 스토리지에 저장되어 있는 viewIndex 키 안의 값을 정수형으로 변환 후 index 변수에 할당
if (csData !== null) {
    title.innerHTML = `제목 : ${csData[index].title}`;
    content.innerHTML = `내용 : ${csData[index].content}`;
    writer.innerHTML = `작성자 : ${csData[index].writer}`;
    date.innerHTML = `작성일 : ${csData[index].date}`;
    views.innerHTML = `조회수 : ${csData[index].views}`;
}

const deleteBtn = document.getElementById("_delete");

deleteBtn.addEventListener("click", () => {
    csData.splice(index, 1);
    for (let i = 0; i < csData.length; i++) {
        csData[i].index = i;
    }
    const setCS = JSON.stringify(csData);
    localStorage.setItem("csData", setCS);
    location.href = "./list.html";
});

const modifyBtn = document.getElementById("_modify");

modifyBtn.addEventListener("click", () => {
    location.href = "modify.html"
})



// url을 참조하여 url 주소에서 짤라서 다시 반환 후 전달 하는 방식