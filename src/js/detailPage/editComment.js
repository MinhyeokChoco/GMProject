// 답글 수정 삭제 버튼 만들자

function newEditCommentStart() {
    let repleyLength;
    if(!replyObj) {
        repleyLength = null;
    } else {
        repleyLength = replyObj.length
    }
    for (let i = 0; i < repleyLength; i++) {
        const wantedCommentLocal = `${postingNumber}_${i}`;
        const commentList = new StoreBoard().getContentArray(wantedCommentLocal);
        if(commentList === null) {
            continue;
        }
        newEditComment(i, commentList)
    }
}

// 버튼 그리기
function newEditComment(index, commentList) {
    // 버튼 요소들을 만들자
    for(let i = 0; i < commentList.length; i++) {
        console.log(commentList[i])
        if (commentList[i].userId !== userInfor.userId || commentList[i].being === false) {
            continue;
        }
        const commentBtnDiv = elementMaker.getElement_all('div', 'commentBtnDiv', `commentBtnDiv-id${index}-${i}`);
        const commentUpdatePtag = elementMaker.getElement_all('p', 'commentUpdateBtn', `commentUpdateBtn-id${index}-${i}`);
        commentUpdatePtag.innerHTML = "수정";
        const commentDeletePtag = elementMaker.getElement_all('p', 'commentDeleteBtn', `commentDeleteBtn-id${index}-${i}`);
        commentDeletePtag.innerHTML = "삭제";

        // 버튼 요소를 HTML에 붙이자
        document.querySelector(`#wholeCommentDiv-id${index}-${i}`).append(commentBtnDiv);
        commentBtnDiv.append(commentUpdatePtag, commentDeletePtag);

        commentUpdatePtag.addEventListener('click', () => {
            // 수정 버튼 눌렀을 때
            implementUpdate(index, i, commentList);  
        })
        commentDeletePtag.addEventListener('click', () => {
            // 삭제 버튼
            implementDelete(index, i, commentList);
        })
    }
}

// 수정 버튼
function implementUpdate(index, i, commentList) {
    toggleUpdateDeleteBtn(index, i); // 기존 수정 삭제 버튼 가리기
    createCommentEditer(index, i, commentList);  // 기존 댓글 가리고 텍스트 에리어 보여주기
    createCompletionBtn(index, i);  // 작성, 취소 버튼 만들기
}

// 텍스트 에리어 생성
function createCommentEditer(index, i, commentList) {
    if(document.querySelector(`#commentUpdateTextarea-id${index}-${i}`)) {
        document.querySelector(`#commentUpdateTextarea-id${index}-${i}`).style.display = "flex";
        return;
    }
        const commentUpdateTextarea = elementMaker.getElement_all("textarea", "commentUpdateTextarea", `commentUpdateTextarea-id${index}-${i}`);
        commentUpdateTextarea.value = commentList[i].content;
        document.querySelector(`#letterDiv-id${index}-${i}`).append(commentUpdateTextarea);
}


// 원래 답글에 있는 수정, 삭제 버튼 보였다 안보였다.
function toggleUpdateDeleteBtn(index, i) {
    const nowCommentUpdateBtn = document.querySelector(`#commentUpdateBtn-id${index}-${i}`);
    const nowDeleDeleteBtn = document.querySelector(`#commentDeleteBtn-id${index}-${i}`);
    const nowText = document.querySelector(`#pforletter-id${index}-${i}`);

    if(nowCommentUpdateBtn.style.display === "" || nowCommentUpdateBtn.style.display === "flex") {
        nowCommentUpdateBtn.style.display = "none";
        nowDeleDeleteBtn.style.display = "none";
        nowText.style.display = "none"
    } else {
        nowCommentUpdateBtn.style.display = "flex"
        nowDeleDeleteBtn.style.display = "flex";
        nowText.style.display = "flex";
    }
}


// 답글 수정 할 때 작성, 취소 버튼 만들기
function createCompletionBtn(index, i) {
    if (document.querySelector(`#commentTextareaBtnDiv-id${index}-${i}`)) {
        document.querySelector(`#commentTextareaBtnDiv-id${index}-${i}`).style.display = "flex";
        return;
    }
    const commentTextareaBtnDiv = elementMaker.getElement_all('div', "commentTextareaBtnDiv", `commentTextareaBtnDiv-id${index}-${i}`);
    const commentTextareaUpdate = elementMaker.getElement_all('button', "updateCCBtn", `commentTextareaUpdate-id${index}-${i}`);
    commentTextareaUpdate.innerHTML = "수정";
    const commentTextareaCancle = elementMaker.getElement_all('button', "updateCCBtn", `commentTextareaCancle-id${index}-${i}`);
    commentTextareaCancle.innerHTML = "취소";

    document.querySelector(`#letterDiv-id${index}-${i}`).append(commentTextareaBtnDiv);
    commentTextareaBtnDiv.append(commentTextareaUpdate, commentTextareaCancle);

    commentTextareaUpdate.addEventListener('click', () => {
        commentEditCarryOutEvent(index, i);
    })

    commentTextareaCancle.addEventListener('click', () => {
        commentEditCancleEvent(index, i);
    })
}

// 답글 수정하는 거 취소
function commentEditCancleEvent(index, i) {
    toggleUpdateDeleteBtn(index, i);
    document.querySelector(`#commentUpdateTextarea-id${index}-${i}`).style.display = "none"; // 텍스트에리어 안보이게
    document.querySelector(`#commentTextareaBtnDiv-id${index}-${i}`).remove(); // 수정, 취소 버튼 
}


// 수정한 댓글 저장
function commentEditCarryOutEvent(index, i) {
    console.log("index= ", index,"i: ", i)
    const wantedCommentLocal = `${postingNumber}_${index}`;
    const existingComment = new StoreBoard().getContentArray(wantedCommentLocal);
    console.log("원하는로컬: ", new StoreBoard().getContentArray(`${postingNumber}_${index}`));
    console.log(existingComment[i]);
    existingComment[i].content = document.querySelector(`#commentUpdateTextarea-id${index}-${i}`).value;
    console.log(existingComment);
    localStorage.setItem(wantedCommentLocal, JSON.stringify(existingComment));
    location.reload();
}


// 삭제 기능
function implementDelete(index, i, commentList) {
    if(!confirm("정말로 삭제하시겠습니까?")){
        return;
    }
    commentList[i].content = "삭제된 댓글입니다."
    commentList[i].being = false;
    const wantedCommentLocal = `${postingNumber}_${index}`;
    localStorage.setItem(wantedCommentLocal, JSON.stringify(commentList))
    location.reload();
}