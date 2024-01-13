window.onload = function () {
    let my_letters = [..."abcdefghijklmnopqrstuvwxyz"]
    let my_numbers = [..."0123456789"]
    let my_char = [..."+*/-=)àç_è-('é&`~#{[|^@]}µ£¨§?!:;,%¹¶ô"]

    let password = document.querySelector(".container .password")
    let letters = document.querySelector(".parameters .letters")
    let numbers = document.querySelector(".parameters .numbers")
    let char = document.querySelector(".parameters .char")
    let generate = document.querySelector(".parameters .done")
    let numero = document.querySelector(".numero .number")
    let up = document.querySelector(".numero .buttons  .up")
    let down = document.querySelector(".numero .buttons  .down")

    letters.onclick = () => {
        letters.classList.toggle("is")
    }

    numbers.onclick = () => {
        numbers.classList.toggle("is")
    }

    char.onclick = () => {
        char.classList.toggle("is")
    }

    up.onclick = () => {
        numero.innerHTML = parseInt(numero.innerHTML) + 1
    }

    down.onclick = () => {
        if (parseInt(numero.innerHTML) > 1) {
            numero.innerHTML = parseInt(numero.innerHTML) - 1
        }
    }

    generate.addEventListener('click', () => {
        let my_array = []
        let is = [...document.querySelectorAll(".is")]
        is.forEach(element => {
            switch(element) {
                case letters:
                    my_array.push(...my_letters)
                    break
                case numbers:
                    my_array.push(...my_numbers)
                    break
                case char:
                    my_array.push(...my_char)
                    break
                default:
                    break
            }
        });
        if (my_array.length == 0) {
            my_array = " "
        }
        password.innerHTML = random_password(my_array,parseInt(numero.innerHTML))
    })

    function random_password (the_array , number ) {
        let _password = ""
        for (let i = 0 ; i < number ; i++) {
            _password += the_array[Math.floor(Math.random() * the_array.length)]
        }
        return _password
    }
}