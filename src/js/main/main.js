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
        this.prev = document.createElement("div")
        this.scroll_bar = document.createElement("div")
        this.scrollBtn = document.createElement("span")
        this.next = document.createElement("div")
        this.game_list_scroll.className = "game_list_scroll";
        this.scroll_bar.className = "scroll_bar";
        this.prev.className = "prevBtn";
        this.next.className = "nextBtn";
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
            // console.dir(this.scrollBtn)
            // console.log(e.offsetX)
            // console.log(this.scrollBarWidth - e.offsetX)
            // console.log((e.x - this.startPosX) - e.offsetX)
            this.startPosX = e.clientX - this.scrollBtn.offsetLeft;
            this.scrollBtn.classList.add('active'); 
            this.scrollBtn.style.cursor = 'grabbing'

        }
        window.addEventListener("mousemove", (e) => {
            if(this.scrollTarget){
                //this.scrollBarWidth == 400 스크롤바 크기
                //e.offsetX == span 클릭 위치
                //startPosX == 481 고정
                //e.x == 클릭한 위치 X 좌표
                const _left = (e.clientX - this.startPosX);
                if((_left <= -5) || (_left >= this.scrollBarWidth - this.scrollBtn.clientWidth +5)) return
                this.scrollBtn.style.left = `${_left}px`
                const a = (_left/(this.scrollBarWidth - this.scrollBtn.clientWidth) * 100);
                this.categoryList.scrollLeft =(this.categoryList.scrollWidth - this.categoryList.offsetWidth ) * a / 100;
            }
            
        })
        
        window.addEventListener("mouseup",() => {
            this.scrollTarget = null;
            this.scrollBtn.classList.remove('active');
            this.scrollBtn.style.cursor = 'grab'
        })
        
        // this.prev.addEventListener('click', () =>{
        //     this.category_list = document.querySelector('.category_list')
        //     this.scrollPercentage = 16.6666666;
        //     const category_list = this.category_list.offsetWidth * (this.scrollPercentage / 100);
        //     const scrollBtn_list = (this.scrollBarWidth - this.scrollBtn.clientWidth +5) * (this.scrollPercentage / 100);
        //     if(`${parseInt(this.scrollBarWidth - scrollBtn_list)}px` < '20px'){
        //         this.scrollBtn.style.left = `${parseInt(this.scrollBtn.style.left) + scrollBtn_list}px`
        //     }
        //     this.category_list.scrollLeft -= category_list;
        //     this.scrollBtn.style.left = `${parseInt(this.scrollBtn.style.left) - scrollBtn_list}px`;
        //     //this.scrollBtn.style.left 스크롤버튼의 X축 위치 px
        //     console.log(`${parseInt(this.scrollBarWidth - scrollBtn_list)}px`)
        //     console.log(scrollBtn_list)
        //     console.log(this.scrollBtn.style.left)
        // });

        this.prev.addEventListener('click', () => {
            // 필요한 요소와 변수를 초기화합니다.
            this.category_list = document.querySelector('.category_list');
            this.scrollPercentage = 16.6666666;
        
            // 카테고리 리스트의 스크롤 거리를 계산합니다.
            const category_list_scroll = this.category_list.offsetWidth * (this.scrollPercentage / 100);
        
            // 스크롤 버튼의 스크롤 거리를 계산합니다.
            const scrollBtn_scroll = (this.scrollBarWidth - this.scrollBtn.clientWidth) * (this.scrollPercentage / 100);
        
            // 스크롤 버튼의 현재 왼쪽 위치
            let currentScrollBtnLeft = parseInt(this.scrollBtn.style.left, 10) || 0;
        
            // 버튼 클릭 후 새 위치
            let newScrollBtnLeft = currentScrollBtnLeft - scrollBtn_scroll;
        
            // 새 위치가 왼쪽 경계를 넘지 않도록 합니다.
            if (newScrollBtnLeft < 0) {
                newScrollBtnLeft = 0;
            }
        
            // 스크롤 버튼 위치를 업데이트합니다.
            this.scrollBtn.style.left = `${newScrollBtnLeft}px`;
        
            // 카테고리 리스트를 왼쪽으로 스크롤합니다.
            this.category_list.scrollLeft -= category_list_scroll;
        })


//         this.next.addEventListener('click', () =>{
//             this.category_list = document.querySelector('.category_list')
//             this.scrollPercentage = 16.6;
//             const category_list = this.category_list.offsetWidth * (this.scrollPercentage / 100); // 카테고리리스트의 16.6퍼
//             const scrollBtn_list = (this.scrollBarWidth - this.scrollBtn.clientWidth +5) * (this.scrollPercentage / 100); // 스크롤길이의 16.6퍼
//             this.category_list.scrollLeft += category_list; // 카테고리리스트의 16.6퍼씩 증가
//             this.scrollBtn.style.left = `${parseInt(this.scrollBtn.style.left) + scrollBtn_list}px`;
//             if(this.scrollBtn.style.left >= this.scrollBarWidth - this.scrollBtn.clientWidth +5); return
//         })
//     }
// }

// this.next.addEventListener('click', () => {
//     // 필요한 요소와 변수를 초기화합니다.
//     this.category_list = document.querySelector('.category_list');
//     this.scrollPercentage = 16.6666666;

//     // 카테고리 리스트의 스크롤 거리를 계산합니다.
//     const category_list_scroll = this.category_list.offsetWidth * (this.scrollPercentage / 100);

//     // 스크롤 버튼의 스크롤 거리를 계산합니다.
//     const scrollBtn_scroll = (this.scrollBarWidth - this.scrollBtn.clientWidth) * (this.scrollPercentage / 100);

//     // 스크롤 버튼의 현재 왼쪽 위치
//     let currentScrollBtnLeft = parseInt(this.scrollBtn.style.left, 10) || 0;

//     // 버튼 클릭 후 새 위치
//     let newScrollBtnLeft = currentScrollBtnLeft + scrollBtn_scroll;

//     // 새 위치가 오른쪽 경계를 넘지 않도록 합니다.
//     if (newScrollBtnLeft < this.scrollBarWidth - this.scrollBtn.clientWidth) {
//         newScrollBtnLeft = this.scrollBarWidth - this.scrollBtn.clientWidth;
//     }

//     // 스크롤 버튼 위치를 업데이트합니다.
//     this.scrollBtn.style.left = `${newScrollBtnLeft}px`;

//     // 카테고리 리스트를 오른쪽으로 스크롤합니다.
//     this.category_list.scrollLeft += category_list_scroll;
// })

this.next.addEventListener('click', () => {
    // 필요한 요소와 변수를 초기화
    this.category_list = document.querySelector('.category_list');
    this.scrollPercentage = 16.6666666;

    // 카테고리 리스트의 스크롤 거리 계산
    const category_list_scroll = this.category_list.offsetWidth * (this.scrollPercentage / 100);

    // 스크롤 버튼의 스크롤 거리 계산
    const scrollBtn_scroll = (this.scrollBarWidth - this.scrollBtn.clientWidth) * (this.scrollPercentage / 100);

    // 현재 스크롤 버튼의 왼쪽 위치
    let currentScrollBtnLeft = parseInt(this.scrollBtn.style.left, 10) || 0; // 교수님께 뭔지 물어볼것 10? 0?

    // 버튼 클릭 후의 새로운 위치
    let newScrollBtnLeft = currentScrollBtnLeft + scrollBtn_scroll;

    // 새로운 위치가 오른쪽 경계를 넘지 않도록 조정
    if (newScrollBtnLeft > (this.scrollBarWidth - this.scrollBtn.clientWidth)) {
        newScrollBtnLeft = this.scrollBarWidth - this.scrollBtn.clientWidth;
    }

    // 스크롤 버튼 위치 업데이트
    this.scrollBtn.style.left = `${newScrollBtnLeft}px`;

    // 카테고리 리스트를 오른쪽으로 스크롤
    this.category_list.scrollLeft += category_list_scroll;
    });
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