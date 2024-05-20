const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 현재 접속중인 유저 아이디
const userProfileImgManager = new UserProfileManage('lUserProfile');
const reader = new FileReader(); // 리더 불러오기


console.log(pageUserId);

window.onload = () => {
    const nowUserImg = userProfileImgManager.getProfileData(pageUserId);
    document.querySelector(".topDiv-imgRegion-img").src = nowUserImg;
    document.querySelector("#topDiv-nicknameRegion-input").placeholder = pageUserId;
}

// 이미지 업로드
document.querySelector("#topDiv-form-upload").addEventListener('change', (e) => {
    const imgFile = e.target.files[0]; // 이미지 파일 정보 가져옴
    reader.readAsDataURL(imgFile);
    document.querySelector(".topDiv-imgRegion-img").src = URL.createObjectURL(imgFile);
});

document.querySelector("#addtionalBottmDiv-update").addEventListener('click', () => {
    userProfileImgManager.setProfileData(pageUserId, data.target.result);
    reader.onload = (data) => {
        duserProfileImgManager.setProfileData(pageUserId, data);
    }
});

// 취소버튼 뒤로가기
document.querySelector("#addtionalBottmDiv-cancle").addEventListener('click', () => {
    window.location.href = document.referrer;  
})