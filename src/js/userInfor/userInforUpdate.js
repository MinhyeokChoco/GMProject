// localStorage.setItem('lUserDB', JSON.stringify([{userId: "id", userNickname: "testNcik"}, {userId: "test", userNickname:"computer"}]))
//테스트코드

const nowAddress = location.search;
const pageUserId = nowAddress.split("=")[1]; // 현재 접속중인 유저 아이디
const userProfileImgManager = new UserProfileManage('lUserProfile');
const userlikeGame = new UserProfileManage('lUserFavoriteGame');
const userMessage = new UserProfileManage('lUserMessage');
const userLoginManager = new UserLoginManager(); // 유저 정보 가져옴
const imgRegionHTML = document.querySelector(".topDiv-imgRegion-img"); // 이미지영역 div 클래스
const nicknameInputHTML = document.querySelector("#topDiv-nicknameRegion-input"); // 닉네임창 input 클래스
const textArea = document.querySelector("#bottomDiv-messageRegion-textarea"); // 텍스트에리어
const userFavoritGame = document.querySelector('#midDiv-favoritRegion-select'); // 셀렉트창
let imgURLdata = userProfileImgManager.getProfileData(pageUserId);

console.log(pageUserId);

window.onload = () => {
    const nowUserImg = userProfileImgManager.getProfileData(pageUserId);
    imgRegionHTML.src = nowUserImg;
    nicknameInputHTML.value = userLoginManager.getUserInforBox().userNickname;
    textArea.value = userMessage.getProfileData(pageUserId);
    const defaultSelect = userlikeGame.getProfileData(pageUserId);
    userFavoritGame.value = defaultSelect;
    
}


document.querySelector("#topDiv-nicknameRegion-form").onsubmit = (e) => {
    e.preventDefault();
}

document.querySelector("#topDiv-nicknameRegion-input").onkeyup = (e) => {
    if(e.keyCode === 13) {
        textArea.focus();
    }
}
  
// 이미지 업로드
document.querySelector("#topDiv-form-upload").addEventListener('change', (e) => {
    const imgFile = e.target.files[0]; // 이미지 파일 정보 가져옴
    const reader = new FileReader(); // 리더 불러오기
    imgRegionHTML.src = URL.createObjectURL(imgFile);
    reader.readAsDataURL(imgFile);
    reader.onload = (data) => {
        imgURLdata = data.target.result;
    }
});

document.querySelector("#addtionalBottmDiv-update").addEventListener('click', () => {
    if(nicknameInputHTML.value.trim() == "") {
        alert("닉네임을 입력해주세요");
        return;
    }
    if(pageUserId !== new UserLoginManager().getUserInforBox().userId){
        alert("잘못된 접근입니다");
        /* ↓ 테스트용 수정 필수 */
        window.location.href = "https://www.naver.com";
        /* ↑ 테스트용 수정 필수*/
    }
    const userFavoritGameIndex = userFavoritGame.options[userFavoritGame.selectedIndex].value; // 선호 게임 가져오기
    const userDB = JSON.parse(localStorage.getItem('lUserDB')); // 전체 DB 가져옴
    const userDBManager = new UserDBManager('lUserDB'); // 회원 인덱스를 가져온다..
    const userDBIndex = userDBManager.getWantedUserDBIndex(pageUserId);
    userDB[userDBIndex].userNickname = nicknameInputHTML.value; // 닉네임 변경
    userDBManager.setUserDB('lUserDB', userDB); // DB에 유저 닉네임 저장
    const nowUserInfor = userLoginManager.getUserInforBox();
    nowUserInfor.userNickname = nicknameInputHTML.value;
    userLoginManager.setUserInforBox(nowUserInfor); // 현재 접속중인 유저 정보 로컬에 저장
    userMessage.setProfileData(pageUserId, textArea.value); // 상메 저장
    userlikeGame.setProfileData(pageUserId, userFavoritGameIndex); // 좋아하는 게임 저장
    userProfileImgManager.setProfileData(pageUserId, imgURLdata); // 이미지 URL 저장

    window.location.href = `./userInformation.html?user=${pageUserId}`;


});

// 취소버튼 뒤로가기
document.querySelector("#addtionalBottmDiv-cancle").addEventListener('click', () => {
    window.location.href = document.referrer;  
})