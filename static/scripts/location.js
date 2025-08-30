let windowContainer = document.getElementById("windowContainer");
let title = document.getElementById("name");
let mainShade = document.getElementById("mainShade");

function showWindow(){
    windowContainer.style.opacity = 1;
    windowContainer.style.pointerEvents = "all";
    mainShade.style.opacity = 0.75;
    mainShade.style.pointerEvents = "all";
}

function closeWindow(){
    windowContainer.style.opacity = 0;
    windowContainer.style.pointerEvents = "none";
    mainShade.style.opacity = 0;
    mainShade.style.pointerEvents = "none";
}