


// 댓글 달기
document.querySelector("#bottomDiv-replyDiv-form").addEventListener('submit', (e) => {
    e.preventDefault(e);
    if (document.querySelector("#bottomDiv-replyDiv-area").value.trim() === "")
        {
            alert("내용을 입력해주세요");
            return;
        }
    const replyStore = new StoreBoard(postingNumber);
    let replyIndex = replyStore.getThisArray();
    const replyContent = new ReplyManager(new GetConetent().getPosterConetent("#bottomDiv-replyDiv-area"), userInfor.userNickname, userInfor.userId, replyIndex.length);
    replyStore.setContentArray(replyContent, postingNumber);
    location.reload();
})


// 댓글 그리기
function renderReply() {
    for(let i = 0; i < replyObj.length; i++) {
        if(replyObj[i] === null) {
            continue;
        }

        const replyTag = document.createElement('div'); // 댓글 전체 박스
        replyTag.classList.add("bottomDiv-replyDiv-contentDiv-replyBox");

        const profileDivTag = document.createElement('div'); // 프사 영역
        profileDivTag.classList.add("contentDiv-profile");

        const profileImg = document.createElement('img'); // 프사 이미지태그
        profileImg.classList.add('topDiv-profileDiv-img');

        const contentDivTag = document.createElement('div'); // 닉네임 댓글 내용 담는 박스
        contentDivTag.classList.add("contentDiv-reple");
        contentDivTag.id = (`contentDiv-reple-index${i}`);

        const nickPTag = document.createElement('p'); // 닉네임
        nickPTag.id = `nickNamePtag-${i}`;
        nickPTag.classList.add('contentDiv-reple-nickName');

        const contentPTag = document.createElement('p'); // 댓글 내용
        contentPTag.id = `contentPtag-${i}`;
        contentPTag.classList.add('contentDiv-reple-p');

        document.querySelector("#bottomDiv-replyDiv-contentDiv").append(replyTag);
        replyTag.append(profileDivTag, contentDivTag);
        profileDivTag.append(profileImg);
        contentDivTag.append(nickPTag, contentPTag);

        profileImg.src = userProfileImg.getProfileData(replyObj[i].userId);
        nickPTag.innerHTML = replyObj[i].nickName
        contentPTag.innerHTML = replyObj[i].content;

        // 아이디가 댓글 작성자랑 같으면 수정/삭제 버튼 생성
        if(replyObj[i].userId === userInfor.userId) {
            const bottomContentDiv = document.createElement('div');
            bottomContentDiv.classList.add('bottomContentDiv');

            const updateP = document.createElement('p');
            updateP.classList.add('updateP');
            updateP.id = `identfyUpdateP-${i}`

            const deleteP = document.createElement('p');
            deleteP.classList.add('deleteP');
            deleteP.id = `identfyDeleteP-${i}`

            contentDivTag.append(bottomContentDiv);
            bottomContentDiv.append(updateP, deleteP);
            updateP.innerHTML = "수정";
            deleteP.innerHTML = "삭제";

            document.querySelector(`#identfyUpdateP-${i}`).addEventListener('click', () => {
                realizeUDbtn(i);
            })
        }
    }
}


// 댓글 수정 기능
function realizeUDbtn(i) {
    // 완료버튼
    const complitebutton = document.createElement("button"); 
    complitebutton.classList.add('updateCCBtn');
    complitebutton.innerHTML = "작성";

    // 취소버튼
    const canclebutton = document.createElement("button"); // 취소버튼
    canclebutton.classList.add('updateCCBtn');
    canclebutton.innerHTML = "취소";

    const content = document.querySelector(`#contentPtag-${i}`);
    const updateBtn = document.querySelector(`#identfyUpdateP-${i}`);
    const deleteBtn = document.querySelector(`#identfyDeleteP-${i}`);

    content.style.display ="none" // 기존 댓글 내용 안보이게
    updateBtn.style.display ="none" // 수정버튼 안보이게
    deleteBtn.style.display ="none" // 삭제버튼 안보이게

    const area = document.createElement('textarea');
    area.classList.add("updateTextArea");

    if(area.style.display == "none") { 
        area.style.display == "flex"; // 텍스트에리어 안보이는 거 방지
    }
    area.value = replyObj[i].content;

    document.querySelector(`#contentDiv-reple-index${i}`).append(area, complitebutton, canclebutton);
}