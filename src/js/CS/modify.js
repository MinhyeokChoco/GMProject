const modifyBtn = document.getElementById("modifyBtn"); // 수정 버튼
const backBtn = document.getElementById("backBtn"); // 뒤로 가기 버튼
const csData = JSON.parse(localStorage.getItem("csData")); // 로컬 스토리지에 저장되어 있는 csData
const viewIndex = JSON.parse(sessionStorage.getItem("viewIndex")); // 세션 스토리지에 저장되어 있는 viewIndex

const index = parseInt(sessionStorage.getItem("viewIndex")); // 세션 스토리지에 저장되어 있는 viewIndex 키의 값을 정수형으로 변환 후 index의 할당

const newTitle = document.getElementById("newTitle"); // newTitle 이라는 id를 가진 HTML 요소의 값을 newTitle 변수에 할당
const newContent = document.getElementById("newContent"); // netContent에 할당

newTitle.placeholder = csData[index].title; // 제목 입력 창에 전 제목을 먼저 띄워주는 기능
newContent.placeholder = csData[index].content; // 내용 입력 창에 전 내용을 먼저 띄워주는 기능

modifyBtn.addEventListener("click", () => { // 수정 버튼을 눌렀을 때의 이벤트 추가
    if (newTitle.value.trim() !== "" && newContent.value.trim() !== "") { // newTitle과 newContent가 빈 문자열이 아니면 true 즉 밑에 조건식을 실행
        csData[index].title = newTitle.value; // csData 배열 중 요소를 가리키는 viewIndex 번호에 해당하는 제목 값에 newTitle을 할당
        csData[index].content = newContent.value; // 위와 동일하나, 내용 할당
        localStorage.setItem("csData", JSON.stringify(csData)); // 로컬스토리지에 다시 저장
        alert("수정되었습니다.")
        location.href = `view.html?index=${viewIndex}`; // 수정 후 상세페이지로 이동
    } else {
        alert("새 제목과 내용을 모두 입력해주세요.") // 제목이나 내용 중 입력 값이 없으면 다시 입력해달라는 알림창
    }
});

backBtn.addEventListener("click", () => { // 뒤로 가기 버튼을 눌렀을 때의 이벤트 추가
    location.href = `view.html?index=${viewIndex}`; // 수정 전 상세 페이지로 이동
});