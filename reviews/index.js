window.onload = () => {
    let image = document.querySelector(".box .photo")
    let name = document.querySelector(".box h3")
    let job = document.querySelector(".box span")
    let paragraph = document.querySelector(".box p")
    let left = document.querySelector(".box .buttons .left")
    let right = document.querySelector(".box .buttons .right")
    let _random = document.querySelector(".box .random")

    let mine = new XMLHttpRequest()
    let current = 0

    mine.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            let object = JSON.parse(this.responseText)
            right.onclick = () => {
                current === object.length -1 ? current = 0 : current++
                image.style.backgroundImage = `url("${object[current].image}")`
                name.innerHTML = object[current].name
                job.innerHTML = object[current].job
            }
            left.onclick = () => {
                current === 0 ? current = object.length - 1 : current--
                image.style.backgroundImage = `url("${object[current].image}")`
                name.innerHTML = object[current].name
                job.innerHTML = object[current].job
            }
            _random.onclick = () => {
                let change = Math.floor(Math.random() * object.length)
                image.style.backgroundImage = `url("${object[change].image}")`
                name.innerHTML = object[change].name
                job.innerHTML = object[change].job
            }
        }
    }
    mine.open("GET" , "index.json" , true)
    mine.send()
}