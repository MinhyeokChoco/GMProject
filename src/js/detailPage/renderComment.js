// 처음 실행할때

function commentRenderStart() {
    let repleObj;
    if(!replyObj) {
        repleObj = null;
    } else {
        repleObj = replyObj.length
    }
    for (let i = 0; i < repleObj; i++) {
        let checkObj = new StoreBoard().getContentArray(`${postingNumber}_${i}`);
        if(checkObj === null) {
            continue;
        }
        renderComment(i, checkObj); // i = 몇번째 댓글의 답글인지 checkObj = i번째 댓글의 내용
        if (replyObj[i].userId === userInfor.userId) {
            // editCommentStart(i, checkObj);
        }
        
    }
    newEditCommentStart();
}

// // 대댓글 그리기 시작
function renderComment(index, commentObj) {
            for(let i = 0; i < commentObj.length; i++) {
            // 답글 영역 그리기 위한 HTML 요소들
            const wholeCommentDiv = elementMaker.getElement_all("div", "wholeCommentDiv", `wholeCommentDiv-id${index}-${i}`); // 답글 영역 전체 div
            const onlyCommentDiv = elementMaker.getElement_all("div", "onlyCommentDiv", `onlyCommentDiv-id${index}-${i}`); // 답글 영역 전체 div
            const proileDiv = elementMaker.getElement_all("div", "contentDiv-profile", `proileDiv-id${index}-${i}`); // 프사 영역 div
            const proileImg = elementMaker.getElement_all("img", "topDiv-profileDiv-img", `proileImg-id${index}-${i}`); // 이미지 태그
            const letterDiv = elementMaker.getElement_all("div", "letterDiv", `letterDiv-id${index}-${i}`); // 답글 div
            const pforNickname = elementMaker.getElement_all("p", "pforNickname", `pforNickname-id${index}-${i}`); // 닉네임 p태그
            const pforletter = elementMaker.getElement_all("p", "pforletter", `pforletter-id${index}-${i}`); // 답글 p태그
            
            // 요소에 컨텐츠 채움
            pforNickname.innerHTML = commentObj[i].nickName;
            pforletter.innerHTML = commentObj[i].content;
            proileImg.src = userProfileImg.getProfileData(commentObj[i].userId);

            // 태그들 붙이기
            document.querySelector(`#wholeRepleDiv-id${index}`).append(wholeCommentDiv);
            wholeCommentDiv.append(onlyCommentDiv);
            onlyCommentDiv.append(proileDiv, letterDiv);
            proileDiv.append(proileImg);
            letterDiv.append(pforNickname, pforletter);
            }
} 
