// 대댓글 시작 - 답글 버튼 누르면 문서 실행

function implementCommnet(i) {
    const selectedReplyIndex = `${postingNumber}_${i}`; //ex) starrail2_0
    const commentStore = new StoreBoard(selectedReplyIndex); // 카테고리명에 해당하는 배열 생성
    createCommentBox(i); /// div 생성
    realizeCommentBtn(i); //텍스트에리어 생성
    toggleBtn(i); // 수정 삭제 답글 버튼 안보이게
    createUCBtn(i, commentStore, selectedReplyIndex); // 답글작성, 취소 버튼 만들고 실행까지
}



// 답글 영역 감쌀 div 생성
function createCommentBox(i) {
    const commentBox = document.createElement('div');
    commentBox.classList.add('commentBox');
    commentBox.id = `commentBox-Id${i}`;
    document.querySelector(`#wholeRepleDiv-id${i}`).append(commentBox)
}


// 텍스트 에리어 생성
function realizeCommentBtn(i) {
    if(document.querySelector(`#commentTextArea-Id${i}`)) {
        document.querySelector(`#commentTextArea-Id${i}`).style.display = "flex";
        document.querySelector(`#commentTextArea-Id${i}`).value = "";
        return; // 이미 에리어가 존재하면 보여주고 리턴
    }
    const commentArea = document.createElement('textarea'); // 텍스트에리어 생성
    commentArea.classList.add('commentTextArea');
    commentArea.id = `commentTextArea-Id${i}`

    document.querySelector(`#commentBox-Id${i}`).append(commentArea);
}

// 텍스트 에리어 안보이게
function removeCommentAear(i) {
    document.querySelector(`#commentTextArea-Id${i}`).style.display = "none";

}

// 수정 취소 답글 토글
function toggleBtn(i) {
    if(replyObj[i].userId !== userInfor.userId && replyObj[i].being) {
        return;
    }
    let updateDisplay = document.querySelector(`#identfyUpdateP-${i}`)
    let deleteDisplay = document.querySelector(`#identfyDeleteP-${i}`)
    let commentDisplay = document.querySelector(`#commentP-${i}`)
    
   if (updateDisplay.style.display === "" || updateDisplay.style.display === "flex") {
    updateDisplay.style.display = "none";
    deleteDisplay.style.display = "none";
    commentDisplay.style.display = "none";
   } else {
    updateDisplay.style.display = "flex";
    deleteDisplay.style.display = "flex";
    commentDisplay.style.display = "flex";
   }
}


// 작성 취소 버튼 생성
function createUCBtn(i, _commentStore, _selectedReplyIndex) {
    const commentBtnDiv = document.createElement('div'); // 버튼들 담을 박스
    commentBtnDiv.classList.add('commentBtnDiv');
    commentBtnDiv.id = `commentBtnDiv-id${i}`;

    const completebutton = document.createElement("button"); // 완료버튼
    completebutton.classList.add('updateCCBtn');
    completebutton.id = (`commentUpdateBtn${i}`);
    completebutton.innerHTML = "작성";

    const canclebutton = document.createElement("button"); // 취소버튼
    canclebutton.classList.add('updateCCBtn');
    canclebutton.id = (`commentCancelBtn${i}`);
    canclebutton.innerHTML = "취소";

    commentBtnDiv.append(completebutton, canclebutton);
    document.querySelector(`#commentBox-Id${i}`).append(commentBtnDiv);

    // 작성 버튼 누를때
    completebutton.addEventListener('click', () => {
        storeCommentContent(i, _commentStore, _selectedReplyIndex);
    })

    // 취소버튼 누를 때
    canclebutton.addEventListener('click', () => {
        toggleBtn(i);
        removeCommentAear(i);
        completebutton.style.display = "none";
        canclebutton.style.display = "none";
        commentBtnDiv.style.display = "none";
    })

}

// 답글 저장
function storeCommentContent(i, commentStore, selectedReplyIndex) {
    const textareaValue = document.querySelector(`#commentTextArea-Id${i}`)
    if (!textareaValue.value.trim()) {
        alert("내용을 입력하세요");
        return;
    }
    let commentIndex = commentStore.getThisArray();
    const commentContent = new ReplyManager(new GetConetent().getPosterConetent(`#commentTextArea-Id${i}`), userInfor.userNickname, userInfor.userId, commentIndex.length);
    commentStore.setContentArray(commentContent, selectedReplyIndex);
    location.reload();
}