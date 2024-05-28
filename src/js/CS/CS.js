let postList = [];
if (localStorage.getItem("postList") === null) {
    localStorage.setItem("postList", JSON.stringify(postList))
} else {
    postList = JSON.parse(localStorage.getItem("postList"));
}

function rander() {
    let list = document.querySelector(".list")
    console.log(list);
    if (list !== null) {
        for (let i = 0; i < postList.length; i++) {
            const ul = document.createElement("ul");
            const li1 = document.createElement("li");
            const li2 = document.createElement("li");
            const li3 = document.createElement("li");
            const li4 = document.createElement("li");
            const li5 = document.createElement("li");
            const li6 = document.createElement("li");
            ul.onclick = () => {
                sessionStorage.setItem("detailIndex", i)
                window.location.href = "./detail.html"
            }
            ul.append(li1, li2, li3, li4, li5, li6);
            li1.innerHTML = i + 1
            li2.innerHTML = postList[i].title;
            li3.innerHTML = postList[i].content;
            li4.innerHTML = postList[i].name;
            li5.innerHTML = postList[i].date;
            li6.innerHTML = "X"
            list.append(ul);
        }
    }
    let detail = document.querySelector("#detail");
    if (detail !== null) {
        const writer = document.querySelector(".writer");
        const title = document.querySelector(".title");
        const content = document.querySelector(".content");

        const index = parseInt(sessionStorage.getItem("detailIndex"));
        if (index == null) return;
        writer.innerHTML = postList[index].name
        title.innerHTML = postList[index].title
        content.innerHTML = postList[index].content
    }
}
rander();