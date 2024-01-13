window.onload = () => {
    let list = document.querySelector(".show")
    console.log()

    let menu = new XMLHttpRequest()

    menu.onreadystatechange = () => {
        if (menu.readyState == 4 && menu.status == 200) {
            let food = JSON.parse(menu.responseText)

            add(food)
            let buttons = document.querySelectorAll(".conditions button")
            let button = [...buttons]

            for (let i = 0 ; i < button.length ; i++) {
                button[i].addEventListener('click' , () => {
                    for (let j = 0 ; j < button.length ; j++) {
                        button[j].classList.remove("is")
                    }
                    button[i].classList.toggle("is")
                    switch (button[i].innerHTML) {
                        case 'break fast':
                            to_help('break-fast')
                            break
                        case 'food':
                            to_help('food')
                            break
                        case 'drink':
                            to_help('drink')
                            break
                    }
                })
            }

            function to_help (kind) {
                let table = []
                for (let i = 0 ; i < food.length ; i++) {
                    list.childNodes.forEach(element => {
                        element.remove()
                    });
                    if (food[i].kind === kind) {
                        table.push(food[i])
                        console.log(food[i].img)
                    }
                }
                add(table)
            }

            function add(object) {
                for (let i = 0 ; i < object.length ; i++) {
                    let card = document.createElement("li")
                    card.className = 'is'
                    let img = document.createElement("div")
                    img.className = 'photo'
                    img.style.backgroundImage = `url(${object[i].img})`
                    let info = document.createElement("div")
                    info.className = 'info'
                    let one = document.createElement("div")
                    one.className = 'one'
                    let name = document.createElement("span")
                    name.className = "name"
                    name.innerHTML = object[i].name
                    let price = document.createElement("span")
                    price.className = "price"
                    price.innerHTML = object[i].price
                    let hr = document.createElement('hr')
                    let description = document.createElement("span")
                    description.className = 'description'
                    description.innerHTML = object[i].description
    
                    card.appendChild(img)
                    one.appendChild(name)
                    one.append(price)
                    info.appendChild(one)
                    info.appendChild(hr)
                    info.appendChild(description)
                    card.appendChild(info)
                    list.appendChild(card)
                }
            }
        }
    }

    menu.open('GET' , "index.json" , true)
    menu.send()

}