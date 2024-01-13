window.onload = function () {
    let timer = document.querySelector(".timer")
    let hour = document.querySelector(".container .hour span")
    let hour_up = document.querySelector(".container .hour .up")
    let hour_down = document.querySelector(".container .hour .down")
    let minute = document.querySelector(".container .minute span")
    let minute_up = document.querySelector(".container .minute .up")
    let minute_down = document.querySelector(".container .minute .down")
    let second = document.querySelector(".container .second span")
    let second_up = document.querySelector(".container .second .up")
    let second_down = document.querySelector(".container .second .down")
    let generate = document.querySelector(".generate")
    let stop = document.querySelector(".stop")
    let reset = document.querySelector(".reset")
    let the_interval
    let _hour
    let _minute
    let _second

    reset.onclick = () => {
        hour.innerHTML = "00"
        minute.innerHTML = "00"
        second.innerHTML = "00"
        timer.innerHTML = '00:00:00'
        timer.style.opacity = "0.5"
    }

    stop.onclick = () => {
        clearInterval(the_interval)
        timer.style.opacity = "0.5"
    }

    generate.addEventListener('click' , () => {
        timer.style.opacity = "1"
        _second = parseInt(second.innerHTML)
        _minute = parseInt(minute.innerHTML)
        _hour = parseInt(hour.innerHTML)
        the_interval = setInterval(() => {
            if (parseInt(_second) == 0) {
                if (parseInt(_minute) == 0) {
                    if (parseInt(_hour) == 0) {
                        timer.style.opacity = "0.5"
                    } else {
                        _hour = parseInt(_hour) - 1
                        _minute = '59'
                        _second = '59'
                    }
                } else {
                    _minute = parseInt(_minute) - 1
                    _second = '59'
                }
            } else {
                _second = parseInt(_second) - 1
            }
            _hour = to_check(_hour)
            _minute = to_check(_minute)
            _second = to_check(_second)
            timer.innerHTML = `${_hour}:${_minute}:${_second}`
        }, 1000)
    })

    hour_up.onclick = () => {
        hour.innerHTML = parseInt(hour.innerHTML) + 1
        hour.innerHTML = to_check(hour.innerHTML)
    }

    minute_up.onclick = () => {
        minute.innerHTML = parseInt(minute.innerHTML) + 1
        minute.innerHTML = to_check(minute.innerHTML)
    }

    second_up.onclick = () => {
        second.innerHTML = parseInt(second.innerHTML) + 1
        second.innerHTML = to_check(second.innerHTML)
    }

    hour_down.onclick = () => {
        if (parseInt(hour.innerHTML) > 0) {
            hour.innerHTML = parseInt(hour.innerHTML) - 1
            hour.innerHTML = to_check(hour.innerHTML)
        }
    }

    minute_down.onclick = () => {
        if (parseInt(minute.innerHTML) > 0) {
            minute.innerHTML = parseInt(minute.innerHTML) - 1
            minute.innerHTML = to_check(minute.innerHTML)
        }
    }

    second_down.onclick = () => {
        if (parseInt(second.innerHTML) > 0) {
            second.innerHTML = parseInt(second.innerHTML) - 1
            second.innerHTML = to_check(second.innerHTML)
        }
    }

    function to_check(element) {
        if (parseInt(element) < 10 && element.toString().length == 1) {
            element = `0${element}`
        }
        return element
    }
}