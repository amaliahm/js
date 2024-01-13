window.onload = function () {
    let _div = document.querySelector(".memory-game-blocks")
    let letters = "abcdefghijklmnopqrstuvwxyz"
    let array_letters = Array.from(letters)

    array_letters.forEach(letter => {
        for (let i = 0 ; i < 2 ; i++ ) {
            let one = document.createElement('div')
            one.className = "game-block"
            one.setAttribute("data" , letter)
            let div = document.createElement("div")
            div.className = "face front"
            one.appendChild(div)
            div = document.createElement("div")
            div.className = "face back"
            let span = document.createElement("span")
            span.appendChild(document.createTextNode(letter))
            div.appendChild(span)
            one.appendChild(div)
            _div.appendChild(one)
        }
    });

    let duration = 2000
    let blocks_container = document.querySelector(".memory-game-blocks")
    let blocks = Array.from(blocks_container.children)
    let order_range = [...Array(blocks.length).keys()]
    shuffle(order_range)

    document.querySelector(".control-buttons span").onclick = function() {
        let ur_name = prompt("what's ur name!")
        if (ur_name == null || ur_name == "") {
            ur_name = "unknown"
        }
        document.querySelector(".name span").innerHTML = ur_name
        document.querySelector('.control-buttons').remove()
        blocks.forEach(block => {
            block.classList.add("is-flipped")
        });
        setTimeout(() => {
            blocks.forEach(block => {
                block.classList.remove("is-flipped")
            });
        }, duration)

    }

    blocks.forEach((block , index) => {
        block.style.order = order_range[index]
        block.addEventListener('click' , function () {
            flip_block(block)
        })
    });

    function shuffle (array) {
        let current = array.length
        let temp
        let random
        while (current > 0) {
            random = Math.floor(Math.random() * current)
            current --
            temp = array[current]
            array[current] = array[random]
            array[random] = temp
        }
        return array
    }

    function flip_block (selected_block) {
        selected_block.classList.add("is-flipped")
        let all_flipped_blocks = blocks.filter(flipped_block => flipped_block.classList.contains('is-flipped'))
        if (all_flipped_blocks.length === 2) {
            stop_clicking()
            check_matched_blocks(...all_flipped_blocks)
        }
    }

    function stop_clicking () {
        blocks_container.classList.add("no_clicking")
        setTimeout(() => {
            blocks_container.classList.remove("no_clicking")
        }, duration)
    }

    function check_matched_blocks (first_block , second_block) {
        let tries_element = document.querySelector(".tries span")
        if (second_block.attributes.data.value == first_block.attributes.data.value) {
            first_block.classList.remove("is-flipped")
            second_block.classList.remove("is-flipped")
            first_block.classList.add("has-match")
            second_block.classList.add("has-match")
        } else {
            tries_element.innerHTML = parseInt(tries_element.innerHTML) + 1
            setTimeout(() => {
                first_block.classList.remove("is-flipped")
                second_block.classList.remove("is-flipped")
            }, duration)
        }
    }
}