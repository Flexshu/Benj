function scrollToContainer(event){
    event.preventDefault()
    let select = document.querySelector("select")
    let value = select.value
    let element = document.getElementById(value)
    let elementTop = element.getBoundingClientRect().top + window.pageYOffset

    let header = document.querySelector("header")
    let headerHeight = header.getBoundingClientRect().height

    window.scrollTo({
        behavior: "smooth",
        top: elementTop - headerHeight
    })
}

function scrollUp(event){
    event.preventDefault()
    window.scrollTo({
        behavior: "smooth",
        top: 0
    })
}

window.addEventListener("scroll", () => {
    const button = document.getElementById("scrollUp")

    if (window.scrollY > 50){
        button.style.opacity = 1
        button.style.pointerEvents = "all"
    }
    else{
        button.style.opacity = 0
        button.style.pointerEvents = "none"
    }
})