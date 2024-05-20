const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 현재 접속중인 유저 아이디
const userProfileImgManager = new UserProfileManage('lUserProfile');


console.log(pageUserId);

window.onload = () => {
    const nowUserImg = userProfileImgManager.getProfileData(pageUserId);
    document.querySelector(".topDiv-imgRegion-img").src = nowUserImg;
}

// 이미지 업로드
document.querySelector("#topDiv-form-upload").addEventListener('change', (e) => {

    const file =new FileWriter();
    
    const imgFile = e.target.files[0]; // 이미지 파일 정보 가져옴
    const reader = new FileReader(); // 리더 불러오기
    reader.readAsDataURL(imgFile);
    reader.onload = (data) => {
        console.log(data.target.result);
        document.querySelector(".topDiv-imgRegion-img").src = data.target.result;
        userProfileImgManager.setProfileData(pageUserId, data.target.result);
    }
});