const width = window.screen.width
const height = window.screen.height
const glavni = document.querySelector(".glavna")
const body = document.querySelector(".main")
const poruka = document.querySelector("h1")

document.addEventListener("mousemove", function (e) {
    let x = e.clientX
    let y = e.clientY
    glavni.style.left = x + "px"
    glavni.style.top = y + "px"
})

let intervalId = setInterval(generirajDiv, 125)


function generirajDiv() {
    let div = document.createElement("div")
    document.body.appendChild(div)
    div.classList.add("tocka", "test1")
    let brojBoje = Math.floor(Math.random() * 5)

    switch (brojBoje) {
        case 0:
            div.classList.add("roza")
            break
        case 1:
            div.classList.add("zuta")
            break
        case 2:
            div.classList.add("zelena")
            break
        case 3:
            div.classList.add("plava")
            break
        case 4:
            div.classList.add("nar")
            break
        }
    let glavni = document.querySelector(".glavna")

    let sirinaGlavni = getComputedStyle(glavni).width
    let siringaGlavni2 = sirinaGlavni.replace("px", "")
    let maxSirina = siringaGlavni2 * 5
    let minSirina = siringaGlavni2 - 10
    let sirina = Math.floor(Math.random() * maxSirina) + minSirina

    div.style.width = sirina + "px"

    let position = Math.floor(Math.random() * 4)
    let x, y, targetX, targetY
    switch (position) {
        case 0:
            x = 0
            y = Math.random() * window.innerHeight
            targetX = window.innerWidth
            targetY = Math.random() * window.innerHeight
            break
        case 1:
            x = Math.random() * window.innerWidth
            y = 0
            targetX = Math.random() * window.innerWidth
            targetY = window.innerHeight
            break
        case 2:
            x = window.innerWidth
            y = Math.random() * window.innerHeight
            targetX = 0
            targetY = Math.random() * window.innerHeight
            break
        case 3:
            x = Math.random() * window.innerWidth
            y = window.innerHeight
            targetX = Math.random() * window.innerWidth
            targetY = 0
            break
        }
    div.style.left = x + "px"
    div.style.top = y + "px"

    const speed = 4

    let intervalId = setInterval(function () {
        let dx = targetX - x
        let dy = targetY - y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= speed) {
            div.style.left = targetX + "px"
            div.style.top = targetY + "px"
            clearInterval(intervalId)
            div.remove()
        } 
        else {
            x += (dx / distance) * speed
            y += (dy / distance) * speed
            div.style.left = x + "px"
            div.style.top = y + "px"
        }

        let rect1 = div.getBoundingClientRect()
        let rect2 = glavni.getBoundingClientRect()

        if (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top) {
            let sirinaDiv = getComputedStyle(div).width
            let siringaDiv2 = sirinaDiv.replace("px", "")

            let sirinaGlavni = getComputedStyle(glavni).width
            let siringaGlavni2 = sirinaGlavni.replace("px", "")
            if (sirinaDiv < sirinaGlavni) {
                let novaSirina = -1 * siringaGlavni2 * -1.1 + "px"
                glavni.style.width = novaSirina
                div.remove()
            } 
            else {
                glavni.style.display = "none"
                glavni.style.width = "0px"
                poruka.style.display = "inline"
            }
        }
    }, 12)
}
document.addEventListener("mousedown", function (event) {
    if (event.button === 0) {
        clearInterval(intervalId)
        const divs = document.querySelectorAll(".test1")
        divs.forEach((div) => div.remove())
        intervalId = setInterval(generirajDiv, 150)
        glavni.style.width = "20px"
        glavni.style.display = "inline"
        poruka.style.display = "none"
    }
})
