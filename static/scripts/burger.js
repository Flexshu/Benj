const openButton = document.getElementById("burger");
const closeButton = document.getElementById("hiddenBurger");
const menu = document.getElementById("menu");
const shade = document.getElementById("shade");
let menuIsOpened = false;

function updateMenuPos(){
    if (!menuIsOpened){
        menu.style.top = "-" + menu.offsetHeight + "px";
    }
}

updateMenuPos();

window.addEventListener("resize", updateMenuPos);

function openMenu(){
    menu.style.visibility = "visible";
    menu.style.top = "0";
    menuIsOpened = true;
    shade.style.opacity = "0.75";
    shade.style.pointerEvents = "auto";
}

function closeMenu(){
    menu.style.top = "-" + menu.offsetHeight + "px";
    menuIsOpened = false;
    shade.style.opacity = "0";
    shade.style.pointerEvents = "none";
    setTimeout(() => {
        menu.style.visibility = "hidden";
    }, 250);
}

openButton.addEventListener('click', () => {
    openMenu();
});

closeButton.addEventListener('click', () => {
    closeMenu();
});

shade.addEventListener('click', () => {
    closeMenu();
});