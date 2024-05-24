const writeList = JSON.parse(localStorage.getItem("csData")) || []; // csData 키에 저장되어 있는 값을 parse 해서 writeList 배열에 할당, 값이 없으면 빈 배열 할당
const viewIndex = sessionStorage.getItem("viewIndex"); // 세션스토리지에 있는 viewIndex 키의 값을 viewIndex 변수에 할당
const csWriteBtn = document.getElementById("_csWriteBtn"); // 문의 글 작성 버튼
const searchInput = document.getElementById("searchInput"); // 검색창
const searchArr = []; // 검색 했을 때 검색된 게시글을 담을 배열
const itemsPerPage = 10; // 한 페이지당 몇개의 글을 보여줄 것인지 결정
let currentPage = 1; // 현재 페이지 설정

csWriteBtn.onclick = () => { // 문의 글 작성 버튼 클릭 했을 때 발생되는 이벤트 작성
    location.href = "write.html"; // 작성 페이지로 이동
}

function displayItems(page, arr) { // 게시판 글들을 보여주는 함수
    const start = (page - 1) * itemsPerPage; // 보여주는 첫 게시글
    const end = start + itemsPerPage; // 보여주는 마지막 게시글
    const itemsToShow = arr.slice(start, end); // start 부터 end 개를 보여준다.

    const list = document.getElementById("List"); // list 변수에 List 요소 할당
    list.innerHTML = ''; // list를 초기화
    if (list !== null) { // list 안에 값이 있으면
        for (let i = 0; i < itemsToShow.length; i++) { // itemsToShow 배열 길이 만큼 반복문 실행
            const _list = document.createElement("div"); // span 태그를 담을 div 요소 생성

            _list.innerHTML = `
            <span>${i + 1}</span>
            <span>${itemsToShow[i].title}</span>
            <span>${itemsToShow[i].content}</span>
            <span>${itemsToShow[i].name}</span>
            <span>${itemsToShow[i].date}</span>
            <span>${itemsToShow[i].views}</span>
            <span data-index="${i}">⭐️</span>
            `
            // 작성한 글의 번호, 제목, 내용, 작성자, 작성일, 조회수, 보기 버튼을 _list에 입력

            _list.lastElementChild.onclick = (e) => { // _list의 마지막 자식요소를 클릭 했을 때 발생되는 이벤트 작성
                sessionStorage.setItem("viewIndex", e.target.dataset.index) // 세션스토리지에 viewIndex 라는 키 안에 이벤트가 발생되는 데이터셋의 값을 저장한다.
                for (let j = 0; j < writeList.length; j++) { // writeList 배열의 길이만큼 반복한다.
                    const element = writeList[j].number; // writeList 배열의 i번째의 넘버를 element에 할당
                    if (element == itemsToShow[i].number) { // element가 itemsToShow 배열의 i번째의 넘버와 동일하다면
                        writeList[j].views++ // // writeList 배열의 j번째 요소의 views 속성을 1씩 증가 시킵니다. (조회수)
                    }
                }
                localStorage.setItem("csData", JSON.stringify(writeList)); // writeList 배열을 JSON 문자형으로 변환해서 로컬스토리지에 csData라는 키 안에 값으로 저장 합니다.
                location.href = `view.html?index=${viewIndex}` // 상세 페이지로 이동
            }

            list.append(_list) // span을 담은 div를 list에 담는다.

        }
    }
}

function setupPagination(arr) { // 페이지네이션 설정 함수
    const totalPages = Math.ceil(arr.length / itemsPerPage); // arr 배열의 길이를 보여주고자 하는 게시글 수로 나누고 소수점은 올림한다.
    // (13개를 3개씩 나눴을 때 나머지 1개가 남아도 버리지 않고 보여줘야 하기 때문에 올림해서 페이지 번호를 하나 더 추가한다.)
    const paginationUl = document.getElementById("pagination"); // pagination Ul
    paginationUl.innerHTML = ''; // 페이지네이션 초기화

    for (let i = 1; i <= totalPages; i++) { // 게시글을 보여줄 페이지 번호 수 만큼 반복
        const li = document.createElement("li"); // paginationUl 안에 들어갈 li 요소 생성
        li.innerText = i; // li 요소에 i 입력
        li.addEventListener("click", () => { // li를 클릭 했을 때의 이벤트 작성
            currentPage = i; // 현재 페이지는 i
            displayItems(currentPage, arr); // 함수에 현재 페이지와 slice로 잘라서 넣은 배열을 인자로 준다.
            updateActivePage(); // updateActivePage 함수 실행
        });
        paginationUl.appendChild(li); // paginationUl에 li 요소 추가
    }
}

function updateActivePage() { // 현재 활성 페이지를 업데이트 하는 함수
    const paginationUl = document.getElementById("pagination"); // 페이지네이션 ul
    Array.from(paginationUl.children).forEach((li, index) => { // ul의 요소의 자식 요소들을 배열로 변환하여 순회
        if (index + 1 === currentPage) { // li의 인덱스가 현재 페이지와 맞으면
            li.style.fontWeight = "bold"; // 굵게
        } else {
            li.style.fontWeight = "normal"; // 아니면 그냥 일반 표시
        }
    });
}

displayItems(currentPage, writeList); // 현재 페이지에 해당하는 게시글 표시
setupPagination(writeList); // 전체 게시글에 대해 페이지네이션 설정
updateActivePage(); // 현재 페이지를 강조하는 스타일 업데이트

document.addEventListener("keydown", function (e) { // 검색할 입력값을 입력하고 엔터를 눌렀을 때 이벤트 작성
    if (e.keyCode == 13) { // 키코드 엔터
        if (!searchInput.value) { // 입력값이 없으면
            displayItems(currentPage, writeList); // 현재 페이지에 해당하는 게시글을 표시
            setupPagination(writeList); // 전체 게시글에 대해 페이지네이션 설정
            updateActivePage(); // 현재 페이지를 강조하는 스타일 업데이트
            return;
        }
        const filter = searchInput.value.toUpperCase(); // 이 함수 안에 값을 전부 대문자로 바꿔서 filter에 할당
        searchArr.length = 0; // searchArr을 0으로 설정 (초기화)
        for (let i = 0; i < writeList.length; i++) { // writeList 배열의 길이만큼 반복문 실행
            if (writeList[i].title.toUpperCase().indexOf(filter) > - 1) { // writeList 배열의 인덱스에 해당하는 제목을 대문자로 변환 후 입력 받은 filter에 포함 되어 있는지 확인합니다.
                searchArr.push(writeList[i]); // searchArr 배열에 writeList[i]에 해당하는 값을 추가
            }
        }
        displayItems(currentPage, searchArr); // 현재페이지와 검색해서 나온 값을 인자로 전달
        setupPagination(searchArr); // 검색결과와 같은 게시글에 대해 페이지네이션 설정
        updateActivePage(); // 현재 페이지를 강조하는 스타일 업데이트
    }
})

// function render() { // render 함수 선언
//     const list = document.getElementById("List"); // list 변수에 List 요소 할당
//     // 변수명을 임시로 사용 할 때 변수명 앞에 언더바를 붙임
//     if (list !== null) { // list 안에 값이 있으면
//         for (let i = 0; i < writeList.length; i++) { // writeList 배열 길이 만큼 반복문 실행
//             const _list = document.createElement("div"); // span 태그를 담을 div 요소 생성, 그리고 _list에 할당

//             _list.innerHTML = `
//             <span>${i + 1}</span>
//             <span>${writeList[i].title}</span>
//             <span>${writeList[i].content}</span>
//             <span>${writeList[i].name}</span>
//             <span>${writeList[i].date}</span>
//             <span>${writeList[i].views}</span>
//             <span data-index="${i}">⭐️</span>
//             `
//             // 작성한 글의 번호, 제목, 내용, 작성자, 작성일, 조회수, 보기 버튼을 _list에 입력



//             _list.lastElementChild.onclick = (e) => { // _list의 마지막 자식요소를 클릭 했을 때 발생되는 이벤트 작성
//                 sessionStorage.setItem("viewIndex", e.target.dataset.index) // 세션스토리지에 viewIndex 라는 키 안에 이벤트가 발생되는 데이터셋의 값을 저장한다.
//                 writeList[i].views++; // writeList 배열의 i번째 요소의 views 속성을 1씩 증가 시킵니다. (조회수)
//                 localStorage.setItem("csData", JSON.stringify(writeList)); // writeList 배열을 JSON 문자형으로 변환해서 로컬스토리지에 csData라는 키 안에 값으로 저장 합니다.
//                 location.href = `view.html?index=${viewIndex}` // 상세 페이지로 이동
//             }

//             list.append(_list) // span을 담은 div를 list에 담는다.

//         }
//     }
// }

// searchInput.addEventListener("input", function () { // 검색창에 입력값이 생길 때 마다 발생되는 이벤트 작성
//     const filter = this.value.toUpperCase(); // 이 함수 안에 값을 전부 대문자로 바꿔서 filter에 할당
//     const list = document.getElementById("List"); // list 페이지에 작성된 게시글에 접근
//     const items = list.children; // 작성된 게시글의 요소에 접근
//     console.log(items);

//     writeList.forEach(function (item) { // 게시글의 요소를 배열로 반환해서 배열의 각 요소에 순차적으로 접근 합니다.
//         const text = item.firstElementChild.nextElementSibling.innerHTML; // item의 첫번째 자식요소의 다음요소의 HTML을 가져옵니다.
//         if (text.toUpperCase().indexOf(filter) > -1) { // 가져온 데이터를 대문자로 변환 후 입력 받은 filter에 포함 되어 있는지 확인합니다.
//             item.style.display = ""; // 있다면 해당 item을 표시합니다.
//         } else {
//             item.style.display = "none"; // 포함 되어 있지 않다면 숨깁니다.
//         }
//     });
// });