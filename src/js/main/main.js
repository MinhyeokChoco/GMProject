
//스크롤바 클라스
const rec_category = document.querySelector(".rec_category");
const categoryList = document.querySelector(".category_list");
class GameListScroll {
    constructor(root, categoryList){
        this.root = root;
        this.categoryList = categoryList;
        this.init();
        this.event();
    }

    // 스크롤바 생성
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
        // 마우스를 누를 때
        this.scrollBtn.onmousedown = (e) => {
            this.scrollTarget = e.target;
            this.startPosX = e.clientX - this.scrollBtn.offsetLeft;
            this.scrollBtn.classList.add('active'); 
            this.scrollBtn.style.cursor = 'grabbing'
        }

        //마우스가 움직일 때
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
        
        //마우스가 떨어졋을 때
        window.addEventListener("mouseup",() => {
            this.scrollTarget = null;
            this.scrollBtn.classList.remove('active');
            this.scrollBtn.style.cursor = 'grab'
        })

        //스크롤바 왼쪽 버튼
        this.prev.addEventListener('click', () => {
            // 필요한 요소와 변수를 초기화합니다.
            this.category_list = document.querySelector('.category_list');
            this.scrollPercentage = 20;
        
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

        //스크롤바 오른쪽 버튼
        this.next.addEventListener('click', () => {
    // 필요한 요소와 변수를 초기화
    this.category_list = document.querySelector('.category_list');
    this.scrollPercentage = 20;

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


//header
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
        location.reload();
    }
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
                const OnloginArray = {"userId": signupArray[i].userId,"userNickname":signupArray[i].userNickname,"userLogOn":true};
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
    onlogin.style.marginRight = "20px";
    
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
        localStorage.setItem('lUserInfor', '');
        location.reload();
    }
}

// 마이페이지 클릭시 이동
const mypageBtn = document.querySelector('#mypage')
let mypageData

try {
    // 로컬 스토리지에서 'lUserInfor' 키의 값을 가져옴
    const storedData = localStorage.getItem('lUserInfor');
    // 값이 null이 아닌 경우 JSON.parse 시도
    mypageData = storedData ? JSON.parse(storedData) : [];
} catch (error) {
    // JSON 파싱 중 오류 발생 시 빈 배열로 초기화
    mypageData = [];
}

if(mypageData.length !== 0){
    if(mypageBtn)
    mypageBtn.addEventListener('click', () => {
        window.location.href = `../userInfor/userInformation.html?user=${mypageData.userId}`
    })
}
// 모든 서비스 hover 시 나오는 창
const service = document.querySelector('.service')
const serviceWrap = document.querySelector('.service_wrap')

service.addEventListener('mouseover', () =>{
    serviceWrap.style.display = 'flex' 
    serviceWrap.style.visibility = 'visible'
    serviceWrap.style.opacity = '1'
    serviceWrap.style.transition = '0.2s'
    serviceWrap.style.transform = 'scale(1)'
});

service.addEventListener('mouseout', () =>{
        serviceWrap.style.opacity = '0'
        serviceWrap.style.visibility = 'hidden'
        serviceWrap.style.transform = 'scale(0.5)'
})

serviceWrap.addEventListener('mouseover', () =>{
    serviceWrap.style.display = 'flex'
    serviceWrap.style.visibility = 'visible'
    serviceWrap.style.opacity = '1'
    serviceWrap.style.transition = '0.2s'
    serviceWrap.style.transform = 'scale(1)'
})

serviceWrap.addEventListener('mouseout', () =>{
        serviceWrap.style.opacity = '0'
        serviceWrap.style.visibility = 'hidden'
        serviceWrap.style.transform = 'scale(0.5)'
})


// 검색 후 로컬스토리지 저장
class Search{
    constructor(searchclick,searchInput){
        this.searchclick = document.querySelector('#header_search_image')
        this.searchInput = document.querySelector('#header_search_box')
        
        this.event()
    }
    
    event(){
        const searchUser = () => {
            let resultData = [...signupArray];
            if (this.searchInput){
                resultData = resultData.filter((value) => {
                    return  value.userId.includes(this.searchInput.value) ||
                            value.userNickname.includes(this.searchInput.value);
                })
                if (resultData.length === 0) {
                    alert("검색 결과가 없습니다.");
                    return;
                }
                else if(this.searchInput === null||this.searchInput===undefined||this.searchInput.value===''){
                    alert("검색어를 입력해주세요.")
                    return;
                }
                localStorage.setItem('searchResults', JSON.stringify(resultData));
                location.href = './search.html'
                return;
            }
        }

        this.searchclick.addEventListener('click', searchUser)

        this.searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                searchUser();
            }
        });
    }
}

const searching = new Search();

// 메인페이지 게시글 기능
const lolContent = JSON.parse(localStorage.getItem('LOL')) || [];
const pubgContent = JSON.parse(localStorage.getItem('PUBG')) || [];
const overwatchContent = JSON.parse(localStorage.getItem('overwatch')) || [];
const starrailContent = JSON.parse(localStorage.getItem('StarRail')) || [];

const contents = [lolContent, pubgContent, overwatchContent, starrailContent];

const nextBtn = document.querySelectorAll('.post_next_btn')
const prevBtn = document.querySelectorAll('.post_prev_btn')
const gamePost = document.querySelectorAll('.game_postlist')

const gamePostList = document.querySelectorAll('.game_postlist > ul');

// 메인페이지 게임 게시글 생성
for (let j = 0; j < gamePostList.length; j++) {
    const contentList = contents[j];
    const index = Math.min(contentList.length, 6);
    let globalGameName = "";
    switch (j) {
        case 0 :
            globalGameName = "LOL"
            break;
        case 1 : 
            globalGameName = "PUBG"
            break;
        case 2 :
            globalGameName = "overwatch"
            break;
        case 3 :
            globalGameName = "StarRail"
            break;
    }
    for (let i = contentList.length - 1; i >= (contentList.length - index); i--) {
        const _li = document.createElement('li');
        const titleP = document.createElement('p');
        const nicknameP = document.createElement('p');
        const contentP = document.createElement('p');
        const commentP = document.createElement('p');
        _li.append(titleP, nicknameP, contentP, commentP);
        gamePostList[j].append(_li);
        if (contentList[i] === null) {
            contentP.innerHTML = "삭제된 게시물입니다.";
            continue;
        }

        titleP.innerHTML = contentList[i].postTitle;
        nicknameP.innerHTML = contentList[i].userNicknameInfor;
        contentP.innerHTML = contentList[i].postContent;
        commentP.innerHTML = '댓글수 0';


        _li.addEventListener('click', () =>{
            sessionStorage.setItem('sGameName', globalGameName);
            window.location.href = `../detailPage/detailPage.html?index=${i}`
        })
    }



    // 게임 게시글 오른쪽 버튼 클릭
    if(contents[j].length >= 4){
            for(let i = 0; i < nextBtn.length; i++){
                nextBtn[j].style.display = 'flex';
                nextBtn[i].addEventListener('click',() =>{
                        const category_list_scroll = gamePost[i].offsetWidth
                        gamePost[i].scrollLeft += category_list_scroll + 3
                        nextBtn[i].style.display = 'none';
                        prevBtn[i].style.display = 'flex';
                })
            }
        }
        
    // 게임 게시글 왼쪽 버튼 클릭
        for(let i = 0; i < prevBtn.length; i++){
            prevBtn[i].addEventListener('click',() =>{
                const category_list_scroll = gamePost[i].offsetWidth
                gamePost[i].scrollLeft -= category_list_scroll +3
                prevBtn[i].style.display = 'none';
                nextBtn[i].style.display = 'flex';
            })
        }
        
}