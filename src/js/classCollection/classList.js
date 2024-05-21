/* 유저 로그인 유무를 가져오는 클래스 */
class UserLoginStatus {
    // 로그인 유무 세션 저장
    setUserStatus(binary) {
        sessionStorage.setItem('lLoginStatus', binary);
    }

    // 세션에서 로그인 유무 불러오기
    getUserStatus() {
        return sessionStorage.getItem('lLoginStatus');
    }

    // 로그아웃시 로컬 삭제
    removeUserStatus() {
        sessionStorage.removeItem('lLoginStatus');
    }
}


/* 유저 정보 (아이디, 닉네임, 프로필사진, 상태메세지 로컬에 저장) */
class UserLoginManager {
    userInforBox = {}; // 

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


/* 작성한 글을 객체로 만드는 클래스*/
class MateBoardManager {
    constructor(_title, _content, _nickname, _userID) {
        this.postTitle = _title; // 제목
        this.postContent = _content; // 내용 (본문)
        this.userNicknameInfor = _nickname; // 닉네임
        this.userId = _userID; // 아이디
        this.postView = 0; // 조회수
        this.postDate = new Date().getFullYear() + "-"+ (new Date().getMonth() + 1) +"-"+ new Date().getDate() // 날짜 (yyyy-mm-dd)
    }
}

/* 댓글을 객체로 만드는 클래스 */
class ReplyManager {
    constructor (_content, _nickname, _userID) {
        this.content = _content;
        this.nickname = _nickname;
        this.userId = _userID;
        this.repleDate = new Date().getFullYear() + "-"+ (new Date().getMonth() + 1) +"-"+ new Date().getDate()
    }
}


/* 작성한 글을 배열에 넣고 로컬저장소에 넣거나 가져오는 클래스 */
class StoreBoard {
    contentArray = []; // 작성글을 임시로 넣을 배열
    
    constructor (kategorieName){
        if (this.getContentArray(kategorieName) == null) {
            this.contentArray = [];
        }else{
            this.contentArray = this.getContentArray(kategorieName);
        }
    }

    // 작성글을 로컬스토리지에 저장하는 함수
    setContentArray(contentObj, kategorieName) {
        this.contentArray.push(contentObj); 
        localStorage.setItem(kategorieName, JSON.stringify(this.contentArray));
    }

    // 로컬스토리지에서 작성글을 불러오는 함수
    getContentArray(kategorieName) {
        return JSON.parse(localStorage.getItem(kategorieName)); // 스토리지에 있는 글을 가져옴
    }
}

/* 카테고리명 세션에 저장하는 클래스 */
class MemorizeKategorie {
    setSession(globalGameName) {
        sessionStorage.setItem('sGameName', globalGameName);
    }
    getSession() {
        return sessionStorage.getItem('sGameName');
    }
}

/* HTML 문서 내 컨텐츠 가져오는 클래스 */
class GetConetent {
    getTitleContent(HTMLid) {
        return document.querySelector(HTMLid).value;
    }
    getPosterConetent(HTMLid) {
        return document.querySelector(HTMLid).value;
    }
} // 굳이 두개??


/* 프사, 상메, 티어 관리, 클래스 */
class UserProfileManage {
    userProfileArray = [];
    locateStorage = "";

    // constructor에 변수명을 넣으면 해당하는 이름의 로컬스토리지가 생긴다.
    constructor(desiredLocal) {
        if (this._getProfileLocal(desiredLocal) === null) {
            this.userProfileArray = [];
            this.locateStorage = desiredLocal;
        } else {
            this.userProfileArray = this._getProfileLocal(desiredLocal);
            this.locateStorage = desiredLocal;
        }
    }

    setProfileData(id, value) {
        if (this.userProfileArray !== null && this.userProfileArray.some(obj => obj.hasOwnProperty(id) === true)) { // 중복 저장 방지
           const localUserIndex = this.userProfileArray.findIndex(key => key.hasOwnProperty(id)); // 현재 유저 인덱스 찾음
           this.userProfileArray.splice(localUserIndex, 1); 
           const userProfileInfor = { [id]: value };
           this.userProfileArray.push(userProfileInfor);
           localStorage.setItem(this.locateStorage, JSON.stringify(this.userProfileArray));
           
        } else {
            const userProfileInfor = { [id]: value };
            this.userProfileArray.push(userProfileInfor);
            localStorage.setItem(this.locateStorage, JSON.stringify(this.userProfileArray));
        }
    }

    getProfileData(id) {
        const profileArray = this._getProfileLocal(this.locateStorage);
        if (this.locateStorage === "lUserProfile") {
            const userProfile = profileArray.find(key => key.hasOwnProperty(id));
            if (userProfile) {
                return userProfile[id] ? userProfile[id] : "../../../img/anonymous icon.png";
            } else {
                return "../../../img/anonymous icon.png";
            }
        }
        else {
            const userProfile = profileArray.find(key => key.hasOwnProperty(id));
            return userProfile ? userProfile[id] : null;
        }
    }

    _getProfileLocal(desiredLocal) {
        return JSON.parse(localStorage.getItem(desiredLocal));
    }
}


// DB에서 유저 정보가 있는 인덱스 번호를 가져오는 클래스 (쓸데가 있나...?)
class UserDBManager {
    wholeUserDBbox = [];
    
    constructor(wantedLocalStorage) {
        this.wholeUserDBbox = JSON.parse(localStorage.getItem(wantedLocalStorage));
    }
    
    getWantedUserDBIndex(id) {
        const userDBboxIndex = this.wholeUserDBbox.findIndex(key => key.userId === id);
        return userDBboxIndex;
    }
    
    // 다시 저장하자...
    setUserDB(wantedLocalStorage, DBarray) {
        localStorage.setItem(wantedLocalStorage, JSON.stringify(DBarray));
    }
}