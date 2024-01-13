window.onload = function () {
    const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
    const colors = ["green" , "cyan" , "red" , "rgba(133,122,200)" , "#f15025"]
    const btn = document.getElementById("btn")
    const color = document.querySelector(".color")
    const hex_button = document.querySelector(".nav-center .nav-links .hex")
    const auto_button = document.querySelector(".nav-center .nav-links .auto")
    const title_button = document.querySelector(".nav-center .title")
    let interval

    btn.addEventListener('click' , function () {
        let is = document.querySelector(".is")
        switch(is.innerHTML) {
            case "color flipper":
                const random_number = Math.floor(Math.random() * colors.length)
                document.body.style.backgroundColor = colors[random_number]
                color.textContent = colors[random_number]
                break;
            case "hex" :
                let chosen_color = auto_one()
                document.body.style.backgroundColor = chosen_color
                color.textContent = chosen_color
                break;
            case "auto" :
                interval = setInterval(() => {
                    let chosen_color = auto_one()
                    document.body.style.backgroundColor = chosen_color
                    color.textContent = chosen_color
                },1000)
                break;
            default :
            break
        }
    })

    title_button.addEventListener('click' , () => {
        clearInterval(interval)
        document.querySelector(".is").classList.remove("is")
        title_button.classList.add("is")
    })

    hex_button.addEventListener('click' , () => {
        clearInterval(interval)
        document.querySelector(".is").classList.remove("is")
        hex_button.classList.add("is")
    })

    auto_button.addEventListener('click' , () => {
        document.querySelector(".is").classList.remove("is")
        auto_button.classList.add("is")
    })

    function auto_one() {
        let hex_color = '#'
        for (let i = 0 ; i < 6 ; i++) {
            hex_color += hex[Math.floor(Math.random() * hex.length)]
        }
        return hex_color
    }
}