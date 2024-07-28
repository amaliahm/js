let allSpans = document.querySelectorAll(".buttons span")
let results = document.querySelector(".results > span")
let theInput = document.getElementById("the-input")

allSpans.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.classList.contains("check-item")) {
            CheckItem()
        } else if (e.target.classList.contains("add-item")) {
            AddItem()
        } else if (e.target.classList.contains("delete-item")) {
            DeleteItem()
        } else if (e.target.classList.contains("show-items")) {
            ShowItems()
        }
    })
})

function CheckItem() {
    if (theInput.value !== '') {
        if (localStorage.getItem(theInput.value)) {
            results.innerHTML = `Found local item called <span>${theInput.value}</span>`
        } else {
            results.innerHTML = `No local item with teh name <span>${theInput.value}</span>`
        }
    } else {
        ShowMassage()
    }
}

function AddItem() {
    if (theInput.value !== '') {
        localStorage.setItem(theInput.value, 'try')
        results.innerHTML = `Local storage item <span>${theInput.value}</span> added`
        theInput.value = ''
    } else {
        ShowMassage()
    }
}

function DeleteItem() {
    if (theInput.value !== '') {
        if (localStorage.getItem(theInput.value)) {
            localStorage.removeItem(theInput.value)
            results.innerHTML = `Local item called <span>${theInput.value}</span> deleted`
            theInput.value = ''
        } else {
            results.innerHTML = `No local item with teh name <span>${theInput.value}</span>`
        }
    } else {
        ShowMassage()
    }
}

function ShowItems() {
    if (localStorage.length) {
        results.innerHTML = ''
        for (let [key, value] of Object.entries(localStorage)) {
            results.innerHTML += `<span class='keys'>${key}</span> `
        }
    } else {
        results.innerHTML = `Local storage is empty`
    }
}

function ShowMassage() {
    results.innerHTML = "Input can't be empty"
}
