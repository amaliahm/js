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
        checkInput()
    }
}

function AddItem() {
    console.log('add')
    checkInput()
}

function DeleteItem() {
    console.log('delete')
    checkInput()
}

function ShowItems() {
    console.log('show')
    checkInput()
}

function checkInput() {
    results.innerHTML = "Input can't be empty"
}
