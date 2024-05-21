// 댓글 달기
document.querySelector("#bottomDiv-replyDiv-form").addEventListener('submit', (e) => {
    e.preventDefault(e);
    if (document.querySelector("#bottomDiv-replyDiv-area").value.trim() === "")
        {
            alert("내용을 입력해주세요");
            return;
        }
    const replyContent = new ReplyManager(new GetConetent().getPosterConetent("#bottomDiv-replyDiv-area"), userInfor.userNickname, userInfor.userId)
    const replyStore = new StoreBoard(postingNumber);
    replyStore.setContentArray(replyContent, postingNumber);
    location.reload();
})


// 댓글 그리기
function lenderReply() {
    console.dir(replyObj);
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

        const nickPTag = document.createElement('p'); // 닉네임
        nickPTag.id = "nickNamePtag";
        nickPTag.classList.add('contentDiv-reple-nickName');

        const contentPTag = document.createElement('p'); // 댓글 내용
        contentPTag.id = "contentPtag";
        contentPTag.classList.add('contentDiv-reple-p');

        document.querySelector("#bottomDiv-replyDiv-contentDiv").append(replyTag);
        replyTag.append(profileDivTag, contentDivTag);
        profileDivTag.append(profileImg);
        contentDivTag.append(nickPTag, contentPTag);

        profileImg.src = userProfileImg.getProfileData(replyObj[i].userId);
        nickPTag.innerHTML = replyObj[i].nickname
        contentPTag.innerHTML = replyObj[i].content;

    }
}