// 유저 로그인 유무를 가져오는 클래스
class UserLoginStatus {
    // 로그인 유무 세션 저장
    storeUserStatus(binary) {
        sessionStorage.setItem('sLoginStatus', binary);
    }

    // 세션에서 로그인 유무 불러오기
    getUserStatus() {
        sessionStorage.getItem('sLoginStatus');
    }

    // 로그아웃시 세션 삭제
    removeUserStatus() {
        sessionStorage.removeItem('sLoginStatus');
    }
}


// 유저 정보 (아이디, 닉네임 로컬에 저장)
class UserLoginManager {
    userInforBox = {};

    // 유저 정보 로컬스토리지에 저장
    setUserInforBox(obj) {
        this.userInforBox = obj;
        localStorage.setItem("lUserInfor", JSON.stringify(this.userInforBox));
    }

    // 로컬 스토리지에서 유저 정보 가져오기
    getUserInforBox() {
        return JSON.parse(localStorage.getItem("lUserInfor"));
    }
    
    // 로그아웃시 유저 정보 삭제
    removeUserInforBox() {
        localStorage.removeItem('lUserInfor');
    }
}

// 작성한 글을 객체로 만드는 클래스
class MateBoardManager {
    constructor(_title, _content, _nickname) {
        this.postTitle = _title; // 제목
        this.postContent = _content; // 내용 (본문)
        this.userNicknameInfor = _nickname; // 닉네임
        this.postView = 0; // 조회수
        this.postDate = () => {
            return new Date().getFullYear() + "-"+ (new Date().getMonth() + 1) +"-"+ new Date().getDate()
        }
    }
}

// 작성한 글을 배열에 넣고 로컬저장소에 넣거나 가져오는 클래스
class storeBoard {
    contentArray = [];

    setContentArray(contentObj) {
        this.contentArray.push(contentObj);
        localStorage.setItem('lContentObj', JSON.stringify(this.contentArray));
    }

    getContentArray() {
        return JSON.parse(localStorage.getItem('lContentObj'));
    }
}