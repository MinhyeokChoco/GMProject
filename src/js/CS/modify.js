const modifyContent = document.getElementById("modifyContent"); // 수정할 내용을 담은 div 요소를 할당한 변수 생성
const modifyBtn = document.getElementById("modifyBtn");
const csData = JSON.parse(localStorage.getItem("csData")); // 로컬 스토리지에 저장되어 있는 csData 
let viewIndex = sessionStorage.getItem("viewIndex")

modifyBtn.addEventListener("click", () => {
    console.log(csData);
    const index = parseInt(sessionStorage.getItem("viewIndex"));

    const newTitle = document.getElementById("newTitle").value;
    const newContent = document.getElementById("newContent").value;

    if (newTitle.trim() !== "" && newContent.trim() !== "") {
        csData[index].title = newTitle;
        csData[index].content = newContent;
        localStorage.setItem("csData", JSON.stringify(csData));
        alert("수정되었습니다.")
        location.href = `view.html?index=${viewIndex}`;
    } else {
        alert("새 제목과 내용을 모두 입력해주세요.")
    }
});

// 검색창, 페이지네이션, 댓글 (대댓글)