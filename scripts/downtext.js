/* Set width of all animated text to match container */
let parent = document.querySelectorAll(".coffine-animate-text");
for (let i = 0; i < parent.length; i++) {
  parent[i].style.width = parent[i].children[0].clientWidth + "px";
}
