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
        this.modalOpen = document.querySelector('#signup_btn')
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

