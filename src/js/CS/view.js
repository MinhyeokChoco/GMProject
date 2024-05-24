class CommentPost { // 클래스 생성
    constructor(name, comment, _date, _page) { // 작성자, 댓글, 작성일 생성
        this.name = name; // 작성자
        this.comment = comment; // 댓글
        this.date = _date; // 작성일
        this.page = _page;
    }
}


const title = document.getElementById("_title"); // 상세 페이지의 출력 될 제목
const content = document.getElementById("_content"); // 내용
const writer = document.getElementById("_writer"); // 작성자
const date = document.getElementById("_date"); // 작성일
const views = document.getElementById("_views"); // 조회수

const csData = JSON.parse(localStorage.getItem("csData")); // 로컬 스토리지에 저장되어 있는 csData 키 값을 JSON 파씽하여 csData 변수에 할당

const index = (parseInt(sessionStorage.getItem("viewIndex"))); // 세션 스토리지에 저장되어 있는 viewIndex 키 안의 값을 정수형으로 변환 후 index 변수에 할당
if (csData !== null) { // 로컬 스토리지에 저장되어 있는 csData키 안의 값이 있으면
    writer.innerHTML = `작성자 : ${csData[index].writer}`; // _writer (작성자) id를 가지고 있는 div 태그 안에 내용 할당
    date.innerHTML = `작성일 : ${csData[index].date}`; // _date (작성일)
    views.innerHTML = `조회수 : ${csData[index].views}`; // _views (조회수)
    title.innerHTML = `${csData[index].title}`; // _title (제목)
    content.innerHTML = `${csData[index].content}`; // _content (내용)
}

const modifyBtn = document.getElementById("_modify"); // 수정 버튼

modifyBtn.addEventListener("click", () => { // 수정 버튼을 눌렀을 때의 이벤트 추가
    location.href = "modify.html" // 수정 페이지로 이동
})

const backBtn = document.getElementById("_back"); // 뒤로가기 버튼

backBtn.addEventListener("click", () => { // 뒤로 가기 버튼을 눌렀을 때의 이벤트 추가
    location.href = "list.html" // 리스트 페이지로 이동
})

const deleteBtn = document.getElementById("_delete"); // 삭제 버튼

deleteBtn.addEventListener("click", () => { // 삭제 버튼에 클릭했을 때의 이벤트를 추가
    csData.splice(index, 1); // 로컬스토리지 안 배열에서 삭제 버튼을 눌렀을 때의 해당 객체를 삭제
    for (let i = 0; i < csData.length; i++) { // 삭제 후 배열의 인덱스 재설정
        csData[i].index = i;
    }
    const setCS = JSON.stringify(csData); // csData를 문자형으로 변환해서 setCS 변수에 할당
    localStorage.setItem("csData", setCS); // 로컬스토리지 csData 키 값에 새로 저장
    location.href = "list.html"; // 삭제 후 저장하면서 list 페이지로 이동
});


document.addEventListener("DOMContentLoaded", function () {
    render();
    comment();
});

const commentData = JSON.parse(localStorage.getItem("comData")) || [];

function comment() {
    const writerValue = document.getElementById("_writer");
    const commentValue = document.getElementById("commentText");
    const commentBtn = document.getElementById("commentAddBtn");
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    commentBtn.onclick = () => {
        const commentList = new CommentPost(undefined, commentValue.value, `${year}-${month}-${day}`, index)
        const commentData = JSON.parse(localStorage.getItem("comData")) || [];
        commentData.push(commentList);
        localStorage.setItem("comData", JSON.stringify(commentData));
        render();
        commentValue.value = '';
    }
}

function render() {
    const commentView = document.getElementById("commentView");
    const commentData = JSON.parse(localStorage.getItem("comData"))
    if (commentView !== null) {
        commentView.innerHTML = ''; // 기존 댓글 요소 초기화

        for (let i = 0; i < commentData.length; i++) {
            if (commentData[i].page === index) {
                const _view = document.createElement("div");

                _view.innerHTML = `
                <span>${commentData[i].name}</span>
                <span>${commentData[i].comment}</span>
                <span>${commentData[i].date}</span>
                <button>수정</button>
                <button>삭제</button>
                `

                // const commentModify = document.getElementById("commentModify");

                const commentDelete = document.getElementById("commentDelete");

                commentView.append(_view);
                commentDelete.addEventListener("click", () => { // 삭제 버튼에 클릭했을 때의 이벤트를 추가
                    commentData.splice(index, 1); // 로컬스토리지 안 배열에서 삭제 버튼을 눌렀을 때의 해당 객체를 삭제
                    for (let i = 0; i < commentData.length; i++) { // 삭제 후 배열의 인덱스 재설정
                        commentData[i].index = i;
                    }
                    const setCom = JSON.stringify(commentData); // csData를 문자형으로 변환해서 setCS 변수에 할당
                    localStorage.setItem("comData", setCom); // 로컬스토리지 csData 키 값에 새로 저장
                });
            }
        }
    }
}

// 함수 render 순서 여쭤보기
// 검색창 완료 .. ?
// 페이지네이션 CSS 해야 함
// 기존 저장되어 있는 내용 플레이스홀더로 불러서 수정 하는거 완료
// 댓글창 CSS 및 수정과 삭제 기능