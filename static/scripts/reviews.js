let reviews = document.querySelectorAll(".card p");
let moreButtons = document.querySelectorAll(".card h3");

let texts = [];
reviews.forEach(p => {
    texts.push(p.textContent);
});

let words = [];
texts.forEach(t => {
    words.push(t.split(" "));
});

function cutPs() {
    for (let i = 0; i < reviews.length; i++) {
        let heightChecker = false;
        reviews[i].textContent = "A";
        let lineHeight = window.getComputedStyle(reviews[i]).height.replace("px", "");
        reviews[i].textContent = "";
        for (let j = 0; j < words[i].length; j++) {
            reviews[i].textContent += words[i][j] + " ";
            let height = window.getComputedStyle(reviews[i]).height.replace("px", "");
            if (height > lineHeight * 3) {
                reviews[i].textContent = reviews[i].textContent.replace(" " + words[i][j - 1] + " " + words[i][j], "...");
                heightChecker = true;
                break;
            }
        }
        if (heightChecker) {
            reviews[i].style.marginBottom = "0";
            moreButtons[i].style.display = "block";
        }
        else {
            reviews[i].style.marginBottom = "auto";
            moreButtons[i].style.display = "none";
        }
        moreButtons[i].classList.remove("less");
        moreButtons[i].textContent = "Більше";
    }
}

window.addEventListener("load", cutPs);
window.addEventListener("resize", cutPs);

function cutP(i) {
    let heightChecker = false;
    reviews[i].textContent = "A";
    let lineHeight = window.getComputedStyle(reviews[i]).height.replace("px", "");
    reviews[i].textContent = "";
    for (let j = 0; j < words[i].length; j++) {
        reviews[i].textContent += words[i][j] + " ";
        let height = window.getComputedStyle(reviews[i]).height.replace("px", "");
        if (height > lineHeight * 3) {
            reviews[i].textContent = reviews[i].textContent.replace(" " + words[i][j - 1] + " " + words[i][j], "...");
            heightChecker = true;
            break;
        }
    }
    if (heightChecker) {
        reviews[i].style.marginBottom = "0";
        moreButtons[i].style.display = "block";
    }
    else {
        reviews[i].style.marginBottom = "auto";
        moreButtons[i].style.display = "none";
    }
}

moreButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("less")) {
            cutP(i);
            moreButtons[i].textContent = "Більше";
            moreButtons[i].classList.remove("less");
        }
        else{
            reviews[i].textContent = texts[i];
            moreButtons[i].textContent = "Згорнути";
            moreButtons[i].classList.add("less");
        }
    });
});