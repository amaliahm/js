window.onload = function() {
    var slider_images = Array.from(document.querySelectorAll('.slider-container img'))
    var slides_count = slider_images.length
    var current_slide = 1
    var slide_number_element = document.getElementById("slide-number")
    var next_button = document.getElementById("next")
    var prev_button = document.getElementById("prev")

    next_button.onclick = next_slide
    prev_button.onclick = prev_slide

    var pagination_element = document.createElement("ul")
    pagination_element.setAttribute("id" , "pagination-ul")

    for (var i = 1 ; i <= slides_count ; i++) {
        var pagination_item = document.createElement("li")
        pagination_item.setAttribute("data-index" , i)
        pagination_item.appendChild(document.createTextNode(i))
        pagination_element.appendChild(pagination_item)
    }
    document.getElementById("indicators").appendChild(pagination_element)

    var pagination_created_ul = document.getElementById('pagination-ul')
    var pagination_bullets = Array.from(document.querySelectorAll("#pagination-ul li"))
    for (var i = 0 ; i < pagination_bullets.length ; i++) {
        pagination_bullets[i].onclick = function () {
            current_slide = parseInt(this.getAttribute('data-index'))
            checker()
        }
    }
    checker()




    function next_slide () {
        if (!next_button.classList.contains("disabled")) {
            current_slide ++
            checker()
        }
    }

    function prev_slide () {
        if (!prev_button.classList.contains("disabled")) {
            current_slide--
            checker()
        }
    }

    function checker () {
        slide_number_element.textContent = "slide #" + (current_slide) + ' of ' + (slides_count)
        remove_all_active()
        slider_images[current_slide - 1].classList.add("active")
        pagination_created_ul.children[current_slide-1].classList.add('active')
        if (current_slide === 1) {
            prev_button.classList.add("disabled")
        } else {
            prev_button.classList.remove("disabled")
        }
        if (current_slide === slides_count) {
            next_button.classList.add("disabled")
        } else {
            next_button.classList.remove("disabled")
        }
    }

    function remove_all_active () {
        slider_images.forEach(function (element) {
            element.classList.remove('active')
        });
    pagination_bullets.forEach(function (element) {
        element.classList.remove('active')
    });
    }

}