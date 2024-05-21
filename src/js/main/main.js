// const gameListScrollBtn = document.querySelector(".game_list_scroll > div > span");
const rec_category = document.querySelector(".rec_category");
const categoryList = document.querySelector(".category_list");
// const scrollBar = document.querySelector(".scroll_bar");
// const scrollClick = document.querySelector(".scroll_bar");

// scrollLeft
// scrollWidth
// let scrollTarget = null;
// let startPosX = gameListScrollBtn.getBoundingClientRect().left;
// let click = null;
// let scrollBarWidth = scrollBar.clientWidth;
// // console.log(scrollBarWidth)
// gameListScrollBtn.onmousedown = function(e) {
//     scrollTarget = e.target;
//     // console.log(gameListScrollBtn.getBoundingClientRect().left);
//     click = e.x - gameListScrollBtn.getBoundingClientRect().left;
//     // console.log(click);
// }

// categoryList.onscroll = function(e) {
//     // console.log(e.target)
// }

// window.onmousemove = function(e) {
//     if(scrollTarget){
//         // console.log(e.x)
//         const _left = (e.x - startPosX) - click ;
//         // console.log(_left)
//         if((_left <= 0) || (_left >= (scrollBarWidth - gameListScrollBtn.clientWidth))) return
//         scrollTarget.style.left = `${_left}px`
//         const a = _left/scrollBarWidth *100;
//         categoryList.scrollLeft =(categoryList.scrollWidth- categoryList.offsetWidth) * a / 100;
//     }
// }

// window.onmouseup = function(e) {
//     scrollTarget = null;
// }

//스크롤바 클라스
class GameListScroll {
    constructor(root, categoryList){
        this.root = root;
        this.categoryList = categoryList;
        this.init();
        this.event();
    }

    init() {
        this.game_list_scroll = document.createElement("div")
        this.prev = document.createElement("button")
        this.prev.className = "prevBtn";
        this.scroll_bar = document.createElement("div")
        this.scrollBtn = document.createElement("span")
        this.next = document.createElement("button")
        this.next.className = "nextBtn";
        this.game_list_scroll.className = "game_list_scroll";
        this.scroll_bar.className = "scroll_bar";
        this.prev.innerHTML = "";
        this.next.innerHTML = "";

        this.scroll_bar.append(this.scrollBtn);
        this.game_list_scroll.append(this.prev,this.scroll_bar,this.next);
        this.root.append(this.game_list_scroll);

        this.scrollTarget = null;
        this.click = null;
        this.startPosX = this.scrollBtn.getBoundingClientRect().left;
        this.scrollBarWidth = this.scroll_bar.clientWidth;
    }


    event(){
        this.scrollBtn.onmousedown = (e) => {
            this.scrollTarget = e.target;
        }
        window.addEventListener("mousemove", (e) => {
            if(this.scrollTarget){
                const _left = (e.x - this.startPosX) - this.click ;
                if((_left <= 0) || (_left >= (this.scrollBarWidth - this.scrollBtn.clientWidth))) return
                this.scrollTarget.style.left = `${_left}px`
                const a = Math.round(_left/(this.scrollBarWidth - this.scrollBtn.clientWidth) * 100);
                this.categoryList.scrollLeft =(this.categoryList.scrollWidth - this.categoryList.offsetWidth ) * a / 100;
            }
        })
        
        window.addEventListener("mouseup",(e) => {
            this.scrollTarget = null;
        })
    }
}
const gameListScroll = new GameListScroll(rec_category,categoryList)

//로그인 세션 유지
let SUser = null
if(sessionStorage.getItem('SUserInfor')){
    SUser = JSON.parse(sessionStorage.getItem('SUserInfor'))
}

if(SUser !== null){
    document.querySelector('.login_box').style.display= 'none';
    loginHeader(SUser)
}


// 로그인모달 클라스
class LoginModal{
    constructor(){
        this.loginmodal = document.querySelector('.modal_page')
        this.modalOpen = document.querySelector('#login_modal_btn')
        this.modalClose = document.querySelector('.login_modal > span')

        this.event()
}

event(){
    this.modalOpen.addEventListener('click', (e) => {
        this.loginmodal.style.display = 'block';
        this.loginmodal.style.top = `${e.pageY - e.clientY}px`
        if (this.loginmodal.style.display == 'block'){
            document.body.style.overflow = 'hidden';
        }
    });

    this.modalClose.addEventListener('click', () => {
        this.loginmodal.style.display = 'none';
        if(this.loginmodal.style.display == 'none')
            document.body.style.overflow = 'auto';
    });
}
};
const loginmodal = new LoginModal();

// 회원가입모달 클라스
class SignUpModal{
    constructor(){
        this.signupmodal = document.querySelector('.modal_signup_page')
        this.modalOpen = document.querySelector('#tosignup_btn')
        this.modalClose = document.querySelector('.signup_modal > span')
        this.loginmodal = document.querySelector('.modal_page')

        this.event()
}

event(){
    this.modalOpen.addEventListener('click', (e) => {
        this.signupmodal.style.display = 'block';
        this.signupmodal.style.top = `${e.pageY - e.clientY}px`
        if (this.signupmodal.style.display == 'block'){
            document.body.style.overflow = 'hidden';
            this.loginmodal.style.display = 'none';
        }
    });

    this.modalClose.addEventListener('click', () => {
        this.signupmodal.style.display = 'none';
        if(this.signupmodal.style.display == 'none')
            document.body.style.overflow = 'auto';
    });
}   
};
const signupmodal = new SignUpModal();

// 회원가입 정보
const signupArray = JSON.parse(localStorage.getItem("lUserDB")) || []; //빈 배열을 생성

class SignUp{
    constructor(userId, userPw, userNickname, userEmail){ // 회원가입시 필요한 정보들 정리
        this.userId = userId
        this.userPw = userPw
        this.userNickname = userNickname
        this.userEmail = userEmail
    }
}

//회원가입 버튼 클릭시 생성될 이벤트
document.querySelector('.signup_btn').addEventListener('click', () => {
    const userId = document.querySelector('#signupID').value;
    const userPw = document.querySelector('#signupPW').value;
    const userNickname = document.querySelector('#signupNick').value;
    const userEmail = document.querySelector('#signupemail').value;
    const IdCheck = /^[a-zA-Z0-9][a-zA-Z0-9]{3,11}$/; // 영문자로 시작하는 영문자 또는 숫자 6~20자
    const PwCheck = /(?=.*\d)(?=.*[a-zA-ZS]).{6,}/; // 문자, 숫자 1개이상 포함, 8자리 이상
    const EmailCheck = /^[A-Za-z-0-9\-\.]+@[A-Ja-z-0-9\-\.]+\.[A-Ja-z-0-9]+$/; // 영문 대문자 또는 소문자 또는 숫자로 시작하고 @포함 .포함

    if((userId === null) || (userId.trim()==='')){
        alert("아이디를 입력해주세요.")
        return;
    }else if((userPw === null) || (userPw.trim()==='')){
        alert("비밀번호를 입력해주세요.")
        return; 
    }else if(userPw !== document.querySelector('#signupPW2').value){
        alert("비밀번호를 확인해주세요.")
        return;
    }else if((userNickname === null)||(userNickname.trim()==='')){
        alert("닉네임을 입력해주세요.")
        return;
    }else if((userEmail === null)||(userEmail.trim()==='')){
        alert("이메일을 입력해주세요.")
        return;
    }

    for(i = 0; i < signupArray.length; i++){
        if(userId === signupArray[i].userId){
            alert("중복된 아이디가 존재합니다.")
            return;
        }else if(userNickname === signupArray[i].userNickname){
            alert("중복된 닉네임이 존재합니다.")
            return;
        }
    }

    if(!IdCheck.test(userId)){
        alert("아이디는 영문자로 시작하는 영문자 또는 숫자 4~12자로 입력해주세요.")
        return;
    }else if(!PwCheck.test(userPw)){
        alert("비밀번호는 문자, 숫자 1개이상 포함, 6자리 이상로 입력해주세요.")
        return;
    }else if(!EmailCheck.test(userEmail)){
        alert("이메일을 다시 확인해주세요")
        return;
    }else if((userPw === document.querySelector('#signupPW2').value) && (userId !==null) && (userPw !== null)&&(userEmail!==null)&&(userNickname!==null)){
        signupArray.push(new SignUp(userId, userPw, userNickname, userEmail));
        localStorage.setItem("lUserDB",JSON.stringify(signupArray));
        alert("회원가입이 완료되었습니다.")
        document.querySelector(".modal_signup_page").style.display = 'none';
    }
    userId.innerHTML = "";
    userPw.innerHTML = "";
    document.querySelector('#signupPW2').innerHTML="";
    userEmail.innerHTML = "";
    userNickname.innerHTML = "";
    // location.reload();
})


//로그인 실행 이벤트
function login() {
    const loginID = document.querySelector('#loginID').value;
    const loginPW = document.querySelector('#loginPW').value;
    let i = 0;
    if(signupArray.length == 0){
        alert("아이디가 존재하지 않습니다.")
        return; 
    }

    let islogin = false
    for (i = 0; i < signupArray.length; i++) {
        if (loginID === signupArray[i].userId) {
            if (loginPW === signupArray[i].userPw) {
                islogin = true
                const OnloginArray = {"userId": signupArray[i].userId,"userPw":signupArray[i].userPw,"userNickname":signupArray[i].usernickname};
                localStorage.setItem('lUserInfor', JSON.stringify(OnloginArray));
                window.sessionStorage.setItem("SUserInfor", JSON.stringify(signupArray[i]));
                document.querySelector('#login_modal_btn').style.display = 'none';
                loginHeader(signupArray[i]); // 로그인 후 보여질 헤더 화면
                break;
            }
        }
    }
    
    if(islogin){
        alert("로그인에 성공하였습니다.")
        document.querySelector(".modal_page").style.display= 'none';
    }else{
        alert("로그인 정보가 일치하지 않습니다.")
        document.querySelector("#loginID").value = "";
        document.querySelector("#loginPW").value = "";
    }
}

// 로그인 버튼 클릭
document.querySelector('.login_btn').addEventListener('click', (e) => {
    e.preventDefault();
    login();

})


// 로그인 이후에 나올 div
function loginHeader(el){
    const onlogindiv = document.createElement("div")
    onlogindiv.classList.add('after_login')
    document.querySelector(".header").append(onlogindiv);
    const onlogin = document.createElement("p")
    const onbtn = document.createElement('button')
    onbtn.id = 'mypage';
    onbtn.innerHTML = "내 정보";
    onbtn.addEventListener('click',() => {
        mypage();
    })
    const onbtn2 = document.createElement('button')
    onbtn2.id = 'logout';
    onbtn2.addEventListener('click',() => {
        logout();
    });
    onbtn2.innerHTML = "로그아웃";
    onlogindiv.append(onlogin);
    onlogindiv.append(onbtn);
    onlogindiv.append(onbtn2);
    onlogin.innerHTML =  el.userNickname + "님 환영합니다."
    // 로그인했을때 내용 수정 필요
    
    document.querySelector('.login_box').style.display= 'none';
    document.body.style.overflow = 'auto';
    onlogindiv.style.display = 'flex';
}


// 로그아웃 클릭시 로그아웃
const logout = ()=>{
    const afterLogin = document.querySelector('.after_login');
    const loginBox = document.querySelector('.login_box');

    if(confirm("로그아웃을 하시겠습니까?")){
        alert("로그아웃 되었습니다.")
        afterLogin.remove();
        loginBox.style.display = 'flex';
        window.sessionStorage.setItem('SUserInfor', '');
        location.reload();
    }
}


// 마이페이지 클릭시 이동
const mypage = () => {
        location.href = "http://www.naver.com";
    }


const allService = document.querySelector(".service")
const serviceDiv = document.createElement("div")
allService.addEventListener('mouseover',() =>{
    const headerBox = document.querySelector(".header")
    const categoryBox = document.createElement("a")
    const categoryImg = document.createElement("img")
    const categoryText = document.createElement("div")
    
    serviceDiv.classList.add('service_wrap')
    categoryBox.classList.add('service_category')
    categoryImg.classList.add('service_img')
    categoryText.classList.add('category_text')

    categoryBox.append(categoryImg , categoryText);
    serviceDiv.append(categoryBox);
    headerBox.append(serviceDiv);
    serviceDiv.style.display = 'block'

    
})
serviceDiv.addEventListener('mouseover', () => {
    serviceDiv.classList.add('is-active')});

serviceDiv.addEventListener('mouseover',() =>{
    serviceDiv.style.display= 'block';
})

allService.addEventListener('mouseout',() =>{
    serviceDiv.remove();
})