class CommentPost { // 클래스 생성
    constructor(name, comment, _date, _page) { // 작성자, 댓글, 작성일 생성
        this.name = name; // 작성자
        this.comment = comment; // 댓글
        this.date = _date; // 작성일
        this.page = _page; // 현재 페이지
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


document.addEventListener("DOMContentLoaded", function () { // 페이지의 모든 DOM 요소가 로드된 후
    render(); // 페이지 로드 시 
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
    const commentView = document.getElementById("commentView"); // commentView div 요소에 접근
    const commentData = JSON.parse(localStorage.getItem("comData")) || []; // 로컬스토리지에 comData 키 안의 값을 파씽해서 가져옵니다.
    if (commentView !== null) { // commentView 값이 있으면
        commentView.innerHTML = ''; // 기존 댓글 요소 초기화

        for (let i = 0; i < commentData.length; i++) {
            if (commentData[i].page === index) { // 로컬스토리지 안에 저장되어 있는 페이지 값과 뷰인덱스의 값이 같으면
                const _view = document.createElement("div"); // div 생성
                _view.dataset.cmt = `${i}` // 생성된 div에게 cmt라는 데이터셋을 부여 (cmt : 키 / `${i}` : 값)

                const name = document.createElement("span"); // span 생성 후 name에 할당
                name.innerHTML = `${commentData[i].name}` // name에 commentData 배열 [i] 요소의 name 값을 입력
                const comment = document.createElement("span"); // comment 변수의 span 생성 할당
                comment.innerHTML = `${commentData[i].comment}` // 내용 값 입력
                const date = document.createElement("span"); // 작성일
                date.innerHTML = `${commentData[i].date}` // 작성일 값 입력
                const modifyBtn = document.createElement("button"); // 수정 역할을 할 버튼 생성
                modifyBtn.innerHTML = "수정"
                const deleteBtn = document.createElement("button"); // 삭제 역할을 할 버튼 생성
                deleteBtn.innerHTML = "삭제"

                _view.append(name, comment, date, modifyBtn, deleteBtn); // div 안에 작성자, 댓글 내용, 작성일, 수정 삭제 버튼 추가
                commentView.append(_view); // span 태그 담은 div 태그를 commentView 태그에 추가

                modifyBtn.addEventListener("click", (e) => { // 수정 버튼 클릭 했을 때의 이벤트 추가
                    const target = e.target.parentNode.dataset.cmt; // 이벤트가 발생한 타겟의 부모 요소의 cmt 데이터셋 값을 가져옴
                    console.log(target);
                    const commentText = prompt("댓글을 수정하세요 : ", commentData[target].comment); // 로컬스토리지에 저장되어 있는 commentData의 target 요소의 comment값을 할당
                    if (commentText !== null) { // commentText 값이 있으면
                        commentData[target].comment = commentText; // 수정한 댓글 내용 업데이트
                        localStorage.setItem("comData", JSON.stringify(commentData)); // 업데이트 후 로컬스토리지에 저장
                        render();
                    }
                });

                deleteBtn.addEventListener("click", (e) => { // 삭제 버튼 클릭 했을 때의 이벤트를 추가
                    let commit = commentData.filter((value) => value.page === index); // 로컬스토리지에 저장된 댓글 배열 안에 있는 객체들 중에 page가 현재 페이지와 일치하는 객체만 불러오기
                    // 배열 상태임

                    const target = e.target.parentNode.dataset.cmt; // 이벤트가 발생된 타겟의 부모 요소의 cmt 라는 데이터셋의 값을 변수 target 할당
                    commit.splice(target, 1); // 로컬스토리지 안 배열에서 삭제 버튼을 눌렀을 때의 해당 객체를 삭제

                    let _index = 0; // _index는 for문이 정상 작동하도록 도와주는 기존 i 역할을 대신 해준다.

                    const a = commentData.length // a는 splice 되기 전 원래 댓글 배열의 길이

                    for (let i = 0; i < a; i++) { // commentData 배열의 여러 요소에서 page 값이 index와 같으면 commentData 배열에서 해당 요소 값을 삭제 
                        if (commentData[_index].page == index) {
                            commentData.splice(_index, 1);
                            _index--; // 삭제 후 인덱스가 올라가는걸 방지하기 위해 빼줌
                        }
                        _index++; // 조건식이 끝나면 다시 증가
                    }

                    for (let i = 0; i < commit.length; i++) { // splice 한 배열을 다시 로컬스토리지에 저장
                        commentData.push(commit[i]);
                    }
                    const setCom = JSON.stringify(commentData); // commentData를 문자형으로 변환해서 setCom 변수에 할당
                    localStorage.setItem("comData", setCom) // 로컬스토리지 comData 키 값에 저장
                    location.reload(); // 페이지 새로 고침
                });
            }
        }
    }
}