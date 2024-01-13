window.onload = function () {
    let count_span = document.querySelector(".quiz-info .count span")
    let bullets_span_container = document.querySelector(".bullets .spans")
    let quiz_area = document.querySelector(".quiz-area")
    let answers_area = document.querySelector(".answers-area")
    let submit_button = document.querySelector(".submit-button")
    let bullets = document.querySelector(".bullets")
    let results_container = document.querySelector(".results")
    let countdown_element = document.querySelector(".countdown")

    let current_index = 0
    let right_answers = 0
    let countdown_interval

    function get_questions() {
        let my_request = new XMLHttpRequest()
        my_request.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                let question_object = JSON.parse(this.responseText)
                let q_count = question_object.length
                create_bullets(q_count)
                add_question_data(question_object[current_index] , q_count)
                countDown(5 , q_count)
                submit_button.onclick = () => {
                    let the_right_answer = question_object[current_index].right_answer
                    current_index++
                    check_answer(the_right_answer , q_count)
                    quiz_area.innerHTML = ""
                    answers_area.innerHTML = ""
                    add_question_data(question_object[current_index] , q_count)
                    handle_bullets()
                    clearInterval(countdown_interval)
                    countDown(5 , q_count)
                    show_results(q_count)
                }
            }
        }
        my_request.open("GET" , "index.json" , true)
        my_request.send()
    }

    function create_bullets(number) {
        count_span.innerHTML = number
        for ( let i = 0 ; i < number ; i++ ) {
            let the_bullet = document.createElement("span")
            bullets_span_container.appendChild(the_bullet)
            if (i === current_index) {
                the_bullet.className = "on"
            }
        }
    }

    function add_question_data(object , count) {
        if (current_index < count) {
            let question_title = document.createElement("h2")
            let question_text = document.createTextNode(object.title)
            question_title.appendChild(question_text)
            quiz_area.appendChild(question_title)
            for (let i = 1 ; i <= 4 ; i++) {
                let main_div = document.createElement("div")
                main_div.className = "answer"
                let radio_input = document.createElement("input")
                radio_input.name = "questions"
                radio_input.type = "radio"
                radio_input.id = `answer_${i}`
                radio_input.dataset.answer = object[`answer_${i}`]
                if (i === 1) {
                    radio_input.checked = true
                }
                let the_label = document.createElement("label")
                the_label.htmlFor = `answer_${i}`
                let the_label_text = document.createTextNode(object[`answer_${i}`])
                the_label.appendChild(the_label_text)
                main_div.appendChild(radio_input)
                main_div.appendChild(the_label)
                answers_area.appendChild(main_div)
            }
        } else {
            submit_button.classList.add("no-more")
        }
    }

    function check_answer (answer , count) {
        let answers = document.getElementsByName("questions")
        let the_chosen_answer
        for (let i= 0 ; i < answers.length ; i++) {
            if (answers[i].checked) {
                the_chosen_answer = answers[i].dataset.answer
                if(answer === the_chosen_answer) {
                    right_answers++
                }
            }
        }
    }

    function handle_bullets() {
        let bullets_span = document.querySelectorAll(".bullets .spans span")
        let array_of_span = Array.from(bullets_span)
        array_of_span.forEach((span , index) => {
            if (current_index === index) {
                span.className = "on"
            }
        });
    }

    function show_results(count) {
        let the_result
        if (current_index === count) {
            quiz_area.remove()
            answers_area.remove()
            submit_button.remove()
            bullets.remove()
            if (right_answers > (count / 2) && right_answers < count) {
                the_result = `<span class="good">good</span> u answered ${right_answers} from ${count}`
            } else if (right_answers === count) {
                the_result = `<span class="perfect">perfect</span> all the answers are right`
            } else {
                the_result = `<span class="bad">bad</span> u answered only ${right_answers} from ${count}`
            }
            results_container.innerHTML = the_result
            results_container.style.padding = "10px"
            results_container.style.backgroundColor = "white"
            results_container.style.marginTop = "10px"
            results_container.style.textAlign = "center"
        }
    }

    function countDown(duration , count) {
        if (current_index < count) {
            let minutes
            let seconds
            countdown_interval = setInterval(function () {
                minutes = parseInt(duration / 60)
                minutes = minutes < 10 ? `0${minutes}` : minutes
                seconds = parseInt(duration % 60)
                seconds = seconds < 10 ? `0${seconds}` : seconds
                countdown_element.innerHTML = `${minutes} : ${seconds}`
                if (--duration < 0) {
                    clearInterval(countdown_interval)
                    submit_button.click()
                }
            }, 1000)
        }
    }

    get_questions()


}