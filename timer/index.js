window.onload = function () {
    let up_clock = document.querySelector(".up .clock")
    let reset_one = document.querySelector(".up .parameters .reset_one")
    let up_stop = document.querySelector(".up .parameters .stop_one")
    let up_start = document.querySelector(".up .parameters .generate_one")
    let timer = document.querySelector(".timer")
    let hour = document.querySelector(".container .hour span")
    let hour_up = document.querySelector(".container .hour .up_")
    let hour_down = document.querySelector(".container .hour .down")
    let minute = document.querySelector(".container .minute span")
    let minute_up = document.querySelector(".container .minute .up_")
    let minute_down = document.querySelector(".container .minute .down")
    let second = document.querySelector(".container .second span")
    let second_up = document.querySelector(".container .second .up_")
    let second_down = document.querySelector(".container .second .down")
    let generate = document.querySelector(".generate")
    let stop = document.querySelector(".stop")
    let reset = document.querySelector(".reset")
    let the_interval
    let _hour
    let _minute
    let _second
    let hour_up_up = 0
    let minute_up_up = 0
    let second_up_up = 0
    let variable_up

    reset_one.onclick = () => {
        up_clock.innerHTML = '00:00:00'
        clearInterval(variable_up)
        up_clock.style.opacity = '0.5'
    }

    up_start.onclick = () => {
        up_clock.style.opacity = '1'
        variable_up = setInterval(() => {
            second_up_up = parseInt(second_up_up) + 1
            if (parseInt(second_up_up) < 10) {
                second_up_up = `0${parseInt(second_up_up)}`
            }
            if (parseInt(second_up_up) > 59) {
                minute_up_up = parseInt(minute_up_up) + 1
                second_up_up = '00'
            }
            if (parseInt(minute_up_up) < 10) {
                minute_up_up = `0${parseInt(minute_up_up)}`
            }
            if (parseInt(minute_up_up) > 59) {
                hour_up_up = parseInt(hour_up_up) + 1
                minute_up_up = '00'
            }
            if (parseInt(hour_up_up) < 10) {
                hour_up_up = `0${parseInt(hour_up_up)}`
            }
            up_clock.innerHTML = `${hour_up_up}:${minute_up_up}:${second_up_up}`
        }, 1000)
    }

    up_stop.addEventListener('click' ,() => {
        clearInterval(variable_up)
        up_clock.style.opacity = '0.5'
    })

    reset.onclick = () => {
        hour.innerHTML = "00"
        minute.innerHTML = "00"
        second.innerHTML = "00"
        timer.innerHTML = '00:00:00'
        timer.style.opacity = "0.5"
        clearInterval(variable_up)
    }

    stop.onclick = () => {
        clearInterval(the_interval)
        timer.style.opacity = "0.5"
    }

    generate.addEventListener('click' , () => {
        if (timer.innerHTML !== "00:00:00") {
            _second = timer.innerHTML.split(":")[2]
            _minute = timer.innerHTML.split(":")[1]
            _hour = timer.innerHTML.split(":")[0]
            to_help()
        } else {
            _second = parseInt(second.innerHTML)
            _minute = parseInt(minute.innerHTML)
            _hour = parseInt(hour.innerHTML)
            to_help()
        }
        timer.style.opacity = "1"
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

    function to_help () {
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
    }
}