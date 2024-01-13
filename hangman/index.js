window.onload = function () {
    const letters = "abcdefghijklmnopqrstuvwxyz"
    let letters_array = Array.from(letters)
    let letters_container = document.querySelector(".letters")
    letters_array.forEach(letter => {
        let span = document.createElement("span")
        let the_letter = document.createTextNode(letter)
        span.appendChild(the_letter)
        span.className = 'letter-box'
        letters_container.appendChild(span)
    });
    const word = {
        programming: ["php", "javascript", "pascal", "scala", "python", "django", "react", "sqlite"],
        movies: ["prestige", "inception", "parasite", "interstellar", "whiplash", "memento", "coco", "angels and demons"],
        people: ["albert einstein", "hitchcock", "alexander", "cleopatra", "mahatma", "robert lang"],
        countries: ["algeria", "egypt", "usa", "palestine", "yemen", "syria", "bahrain", "qatar"],
    }

    let all_keys = Object.keys(word)
    let random_property_number = Math.floor(Math.random() * all_keys.length)
    let random_property_name = all_keys[random_property_number]
    let random_property_value = word[random_property_name]
    let random_value_number = Math.floor(Math.random() * random_property_value.length)
    let random_value_value = random_property_value[random_value_number]
    document.querySelector(".game-info .category span").innerHTML = random_property_name

    let letters_guess_container = document.querySelector(".letters-guess")

    let letters_and_space = Array.from(random_value_value)
    console.log(random_value_value)
    letters_and_space.forEach(letter => {
        let empty_span = document.createElement("span")
        if (letter === ' ') {
            empty_span.className = "with-space"
        }
        letters_guess_container.appendChild(empty_span)
    });

    let guess_spans = document.querySelectorAll(".letters-guess span")
    let win = 0
    let wrong = 0
    let the_draw = document.querySelector('.hangman-draw')
    document.addEventListener("click" , function (element) {
        let status = false
        if (element.target.className === "letter-box") {
            element.target.classList.add("clicked")
            let clicked_letter = element.target.innerHTML.toLowerCase()
            let chosen_word = Array.from(random_value_value.toLowerCase())
            chosen_word.forEach((word_letter , word_index) => {
                if (win === random_value_value.length) {
                    ur_win()
                    letters_container.classList.add("finished")
                }
                if (clicked_letter == word_letter) {
                    win++
                    status = true
                    guess_spans.forEach((span , span_index) => {
                        if (word_index === span_index) {
                            span.innerHTML = clicked_letter
                        }
                    });
                }
            });
            if (status !== true) {
                wrong++
                the_draw.classList.add(`wrong-${wrong}`)
                document.getElementById("fail").play()
                if (wrong === 8) {
                    endgame()
                    letters_container.classList.add("finished")
                }
            } else{
                document.getElementById("success").play()
            }

            function endgame() {
                let div = document.createElement("div")
                let div_text = document.createTextNode(`game over , the word was ${random_value_value}`)
                div.appendChild(div_text)
                div.className = "false"
                document.body.appendChild(div)
            }

            function ur_win() {
                let div = document.createElement("div")
                let div_text = document.createTextNode(`congrats , u have ${wrong} false tries`)
                div.appendChild(div_text)
                div.className = "true"
                document.body.appendChild(div)
            }
        }
    })
}