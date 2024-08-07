let theInput = document.querySelector('.get-repos input')
let getButton = document.querySelector('.get-button')
let reposData = document.querySelector('.show-data')

getButton.onclick = function () {
    getRepos()
}

function getRepos () {
    if (theInput.value == '') {
        reposData.innerHTML= '<span> please write the github usename </span>'
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((repos) => {
            reposData.innerHTML = ''
            repos.forEach(repo => {
                let mainDiv = document.createElement('div')
                let reposName = document.createTextNode(repo.name)
                mainDiv.appendChild(reposName)

                let theUrl = document.createElement('a')
                let theUrlText = document.createTextNode('visit')
                theUrl.appendChild(theUrlText)
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`
                theUrl.setAttribute('target', '_blank')
                mainDiv.appendChild(theUrl)

                let startsSpan = document.createElement('span')
                let starsText = document.createTextNode(`Stars: ${repo.stargazers_count}`)
                startsSpan.appendChild(starsText)
                mainDiv.appendChild(startsSpan)

                mainDiv.className = 'repo-box'

                reposData.appendChild(mainDiv)
            });
        })
    }
}