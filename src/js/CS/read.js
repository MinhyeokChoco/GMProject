let writeList = JSON.parse(localStorage.getItem("csData")) || []; // csData 키에 저장되어 있는 값을 parse 해서 writeList 배열에 할당, 값이 없으면 빈 배열 할당

function render() { // render 함수 선언
    let list = document.getElementById("List"); // list 변수에 List 요소 할당
    // 변수명을 임시로 사용 할 때 변수명 앞에 언더바를 붙임
    if (list !== null) {
        for (let i = 0; i < writeList.length; i++) { // writeList 배열 길이 만큼 반복문 실행
            const _list = document.createElement("div"); // span 태그를 담을 div 요소 생성, 그리고 _list에 할당
            const _num = document.createElement("span"); // 고객 문의 글의 번호를 담은 span 태그 요소 생성, 변수에 할당
            const _title = document.createElement("span"); // 제목 span
            const _content = document.createElement("span"); // 내용 span
            const _nickname = document.createElement("span"); // 작성자 span
            const _date = document.createElement("span"); // 작성일 span
            const _views = document.createElement("span"); // 조회수 span
            const _view = document.createElement("span"); // 상세 페이지 들어가는 버튼 생성
            _view.onclick = () => { // 클릭 했을 때 발생되는 이벤트 작성
                sessionStorage.setItem("viewIndex", i)
                writeList[i].views++;
                localStorage.setItem("csData", JSON.stringify(writeList));
                location.href = "view.html"
            }
            _list.append(_num, _title, _content, _nickname, _date, _views, _view);
            _num.innerHTML = i + 1;
            _title.innerHTML = writeList[i].title;
            _content.innerHTML = writeList[i].content;
            _nickname.innerHTML = writeList[i].nickname;
            _date.innerHTML = writeList[i].date;
            _views.innerHTML = writeList[i].views;
            _view.innerHTML = "⭐️"
            list.append(_list)
        }
    }


    let view = document.getElementById("viewContent");
    if (view !== null) {
        const title = document.getElementById
    }
}
render();