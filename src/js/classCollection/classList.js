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
        const userinfor = localStorage.getItem("lUserInfor");
        let userObj = {};
        if(userinfor) {
                userObj = JSON.parse(userinfor);
            }
        return userObj;
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
    constructor (_content, _nickname, _userID, _i) {
        this.content = _content;
        this.nickName = _nickname;
        this.userId = _userID;
        this.repleDate = new Date().getFullYear() + "-"+ (new Date().getMonth() + 1) +"-"+ new Date().getDate();
        this.index = _i;
        this.being = true;
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

    getThisArray() {
        return this.contentArray;
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
    
    // 티어 가져오기 위한 전용 함수
    
    _getProfileLocal(desiredLocal) {
        return JSON.parse(localStorage.getItem(desiredLocal)) || [];
    }
}

// 별점을 주기 위한 클래스
class ForGrade {
    constructor () {
        this.userTierArray = JSON.parse(localStorage.getItem("lUserTier")) || [];
    }

    setTierData(id, value) {
        const currentTier = this.userTierArray.find(Obj => Obj.hasOwnProperty(id));
        if (currentTier) {
            currentTier[id].push(value);
        } else {
            const newTier = { [id]: [value] };
            this.userTierArray.push(newTier);
        }
        localStorage.setItem("lUserTier", JSON.stringify(this.userTierArray));
    }

    getUserTier(id) {
        const profileArray = this._getTierRawData(id);
        let userTier = 10;
        if(profileArray) {
            const sum = profileArray.reduce((accumulator, currentValue) => accumulator + currentValue);
            userTier = sum / profileArray.length;
        }
        if (userTier < 1.5) {
            return "타인";
        } else if (userTier < 2) {
            return "지인";
        } else if (userTier < 3) {
            return "친구";
        } else if (userTier < 4) {
            return "절친";
        } else if (userTier <= 5) {
            return "베프";
        } else {
            return "신입";
        }
    }

    _getTierRawData(id) {
        const nowTier = this.userTierArray.find(Obj => Obj.hasOwnProperty(id));
        return nowTier ? nowTier[id] : null;
    }
}


// 별점 하루에 한번 주기위한 클래스
class checkeGiveAScore {
    timeBox = [];
    constructor(id) {
        this.timeBox = this.getLastGiveTime();
    }

    setLastGiveTime(id, time) {
        const timeOfUser = {id: time};
        this.timeBox.push(timeOfUser);
    }

    getLastGiveTime() {
        return JSON.parse(localStorage.getItem("lastGiveAScoreTime")) || [];
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

// HTML 요소를 만들어 주는 클래스
class createHTMLElement {
    getElement_all(desireElement, _className, _id) {
        const HTMLElemnt = document.createElement(desireElement);
        HTMLElemnt.id = _id
        HTMLElemnt.className = _className
        return HTMLElemnt;
    }
    // id 없이 만들기
    getElement_class(desireElement, _className) {
        const HTMLElemnt = document.createElement(desireElement);
        HTMLElemnt.classList.add(_className)
        return HTMLElemnt;
    }
    // class 이름 없이 만들기
    getElement_id(desireElement, _id) {
        const HTMLElemnt = document.createElement(desireElement);
        HTMLElemnt.id = _id
        return HTMLElemnt;
    }
}