// 수정 및 삭제버튼 생성 함수
function addUDbtn() {
    const pTag = document.createElement("p"); // 수정버튼
    const pTag02 = document.createElement("p"); // 삭제버튼
    pTag.id = "midbottomDiv-updateBtn";
    pTag02.id = "midbottomDiv-deleteBtn";

    document.querySelector("#midbottomDiv").prepend(pTag, pTag02);
    pTag.innerHTML = "수정"
    pTag02.innerHTML = "삭제"

    // 수정 버튼 클릭
    pTag.addEventListener('click', () => {
        window.location.href = `../MwritePage/kategorieUpdate.html?index=${nowIndex}`
    })
    
    // 삭제 버튼 클릭
    document.querySelector("#midbottomDiv-deleteBtn").addEventListener('click', () => {
        if (confirm("정말로 글을 삭제하시겠습니까?")) {
            fnImplementation();
        }
    })
}

// 삭제 구현
function fnImplementation() {
    localConetArray[nowIndex] = null; // 로컬스토리지에서 해당 인덱스 부분 삭제
    localStorage.setItem(nowKategorie, JSON.stringify(localConetArray)); // 다시 저장
    
    switch (nowKategorie) {
        case "LOL":
            window.location.href = "../kategoriePage/LoLPage.html";
            break;
        case "StarRail":
            window.location.href = "../kategoriePage/StarRail.html"
            break;
        case "PUBG":
            window.location.href = "../kategoriePage/PUBG.html";
            break;
        case "eternalreturn":
            window.location.href = "../kategoriePage/eternalreturn.html";
            break;
        case "valorant":
            window.location.href = "../kategoriePage/valorant.html"
        default:
            alert("잘못된 접근입니다.");
            /* ↓ 임시 코드입니다 수정 필요 ↓*/
            window.location.href = "https://www.naver.com"
        /* ↑ 임시 코드입니다 수정필요 ↑*/
    }
}