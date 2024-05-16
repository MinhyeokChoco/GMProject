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

// window.addEventListener('DOMContentLoaded', function() {
//     const scrollBtn = document.querySelector('nextBtn');
//     console.log(scrollBtn);

//     // 버튼 클릭 이벤트 핸들러
//     scrollBtn.addEventListener('click', function() {
//         // 현재 스크롤 위치
//         var currentScroll = window.scrollX;

//         // 뷰포트의 높이
//         var viewportWidth = this.game_list_scroll.innerWidth;

//         // 문서의 전체 높이
//         var documentWidth = document.body.clientWidth;

//         // 스크롤할 양을 계산 (문서 높이의 16%)
//         var scrollAmount = documentWidth * 0.16;

//         // 스크롤 위치를 현재 위치 + 16%로 이동
//         window.scrollTo(currentScroll + scrollAmount,0);
//         console.log(currentScroll)
//     });
// });
const scrollBtn = document.querySelector('nextBtn');

scrollBtn.onclick = (e) => {
    const gamelistscroll = this.game_list_scroll.innerWidth;
    const scrollAmount = this.scrollBarWidth * 0.16;
}