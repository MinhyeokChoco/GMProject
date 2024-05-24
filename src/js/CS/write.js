class Post { // 클래스 생성
    constructor(number, title, content, name, _date, views) { // 생성자 함수로 제목, 내용, 작성자, 작성일, 조회수 생성
        this.number = number // 글번호
        this.title = title // 제목
        this.content = content // 내용
        this.name = name // 작성자
        this.date = _date // 작성일
        this.views = views // 조회수
    }
}

const writeData = JSON.parse(localStorage.getItem("csData")) || []; // 상수 생성 후 논리연산자로 앞에 값이 있으면 할당하고 없으면 빈 배열 할당
function write() { // write라는 함수 생성
    const titleValue = document.getElementById("_title"); // 제목에 대한 작성 값
    const contentValue = document.getElementById("_content"); // 내용에 대한 작성 값
    const writeBtn = document.getElementById("_writeBtn"); // 글 작성 버튼
    const listBtn = document.getElementById("_listBtn"); // 목록으로 돌아가는 버튼
    const date = new Date(); // 생성 순간의 날짜와 시간을 가져옴
    const year = date.getFullYear(); // 현재 연도를 반환함
    const month = date.getMonth() + 1; // 현재 월을 반환하는데 0부터 시작해서 + 1을 해줌
    const day = date.getDate(); // 현재 일을 반환함
    writeBtn.onclick = () => { // 글쓰기 버튼 클릭 했을 때
        const csList = new Post(writeData.length, titleValue.value, contentValue.value, undefined, `${year}-${month}-${day}`, 0) // csList 변수에 제목, 내용, 작성자, 작성일, 조회수 할당
        writeData.push(csList); // writeData 배열에 csList 객체를 넣어줌
        localStorage.setItem("csData", JSON.stringify(writeData)); // writeData 배열을 문자형으로 변환하여 csData라는 키를 가진 로컬스토리지에 저장
        location.href = "list.html" // list.html로 이동
    }
    listBtn.onclick = () => { // 목록으로 버튼 클릭 했을 때
        location.href = "list.html"; // list.html로 이동
    }
}
write();