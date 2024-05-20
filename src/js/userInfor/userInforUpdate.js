const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 현재 접속중인 유저 아이디
const userProfileImgManager = new UserProfileManage('lUserProfile');
console.log(userProfileImgManager);

console.log(pageUserId);


// 이미지 업로드 함수
document.querySelector("#topDiv-form-upload").addEventListener('change', (e) => {
    const imgFile = e.target.files[0]; // 이미지 파일 정보 가져옴
    const imgTag = document.createElement('img');
    imgTag.src = URL.createObjectURL(imgFile); // 이미지 주소에 링크 추가
    imgTag.classList.add('topDiv-imgRegion-img');
    
    document.querySelector(".topDiv-imgRegion-img").remove(); // 기존 이미지 제거
    document.querySelector('#topDiv-imgRegion').append(imgTag);

    userProfileImgManager.setProfileData(pageUserId, imgTag.src);
});

