let writeList = JSON.parse(localStorage.getItem("csData")) || []; // csData 키에 저장되어 있는 값을 parse 해서 writeList 배열에 할당, 값이 없으면 빈 배열 할당
let viewIndex = sessionStorage.getItem("viewIndex"); // 세션스토리지에 있는 viewIndex 키의 값을 viewIndex 변수에 할당
function render() { // render 함수 선언
    let list = document.getElementById("List"); // list 변수에 List 요소 할당
    // 변수명을 임시로 사용 할 때 변수명 앞에 언더바를 붙임
    if (list !== null) {
        for (let i = 0; i < writeList.length; i++) { // writeList 배열 길이 만큼 반복문 실행
            const _list = document.createElement("div");
            // span 태그를 담을 div 요소 생성, 그리고 _list에 할당

            // const _num = document.createElement("span"); // 고객 문의 글의 번호를 담은 span 태그 요소 생성, 변수에 할당
            // const _title = document.createElement("span"); // 제목 span
            // const _content = document.createElement("span"); // 내용 span
            // const _nickname = document.createElement("span"); // 작성자 span
            // const _date = document.createElement("span"); // 작성일 span
            // const _views = document.createElement("span"); // 조회수 span
            // const _view = document.createElement("span"); // 상세 페이지 들어가는 버튼 생성
            // _view.dataset.index = i + "" // _view의 데이터셋 값에 i를 문자열로 할당
            // _list.append(_num, _title, _content, _nickname, _date, _views, _view); // _list 변수 안에 즉 div 요소 안에 생성시킨 span 하나하나 담는다.
            _list.innerHTML = `
            <span>${i + 1}</span>
            <span>${writeList[i].title}</span>
            <span>${writeList[i].content}</span>
            <span>${writeList[i].nickname}</span>
            <span>${writeList[i].date}</span>
            <span>${writeList[i].views}</span>
            <span data-index="${i}">⭐️</span>
            `
            console.log(_list.childNodes);
            _list.lastElementChild.onclick = (e) => { // 클릭 했을 때 발생되는 이벤트 작성
                sessionStorage.setItem("viewIndex", e.target.dataset.index) // 세션스토리지에 viewIndex 라는 키 안에 이벤트가 발생되는 데이터셋의 값을 저장한다.
                writeList[i].views++; // writeList 배열의 i번째 요소의 views 속성을 1씩 증가 시킵니다. (조회수)
                localStorage.setItem("csData", JSON.stringify(writeList)); // writeList 배열을 JSON 문자형으로 변환해서 로컬스토리지에 csData라는 키 안에 값으로 저장 합니다.
                location.href = `view.html?index=${viewIndex}` // 상세 페이지로 이동
            }
            // _num.innerHTML = i + 1; // 번호는 0부터 시작하므로 1 증가 후 할당
            // _title.innerHTML = writeList[i].title; // writeList 배열 안에 i번째의 title 속성
            // _content.innerHTML = writeList[i].content; // 내용
            // _nickname.innerHTML = writeList[i].nickname; // 작성자
            // _date.innerHTML = writeList[i].date; // 작성일
            // _views.innerHTML = writeList[i].views; // 조회수
            // _view.innerHTML = "⭐️" // 보기 버튼
            list.append(_list) // span을 담은 div를 다른 div list에 담는다.
        }
    }
}
render();