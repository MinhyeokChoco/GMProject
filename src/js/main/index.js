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
        this.scroll_bar = document.createElement("div")
        this.scrollBtn = document.createElement("span")
        this.next = document.createElement("button")
        this.game_list_scroll.className = "game_list_scroll";
        this.scroll_bar.className = "scroll_bar";
        this.prev.innerHTML = "<";
        this.next.innerHTML = ">";
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
            this.click = e.x - this.scrollBtn.getBoundingClientRect().left;
            // console.log(click);
        }
        window.addEventListener("mousemove", (e) => {
            if(this.scrollTarget){
                const _left = (e.x - this.startPosX) - this.click ;
                if((_left <= 0) || (_left >= (this.scrollBarWidth - this.scrollBtn.clientWidth))) return
                this.scrollTarget.style.left = `${_left}px`
                const a = _left/this.scrollBarWidth *100;
                this.categoryList.scrollLeft =(this.categoryList.scrollWidth- this.categoryList.offsetWidth) * a / 100;
            }
        })
        
        window.addEventListener("mouseup",(e) => {
            this.scrollTarget = null;
        })
    }
}

const gameListScroll = new GameListScroll(rec_category,categoryList)
