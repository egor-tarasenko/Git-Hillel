const config = {
    giphy: {
        api_key: 'O0WPlsebm26FrZQELgaSjvxRcP5cbQvf',
        url: 'https://api.giphy.com/v1/gifs',
    }
}

function fetchTraiding(gifCount) {
    document.getElementById('box-gallery').innerHTML = ''
    fetch(`${config.giphy.url}/trending?api_key=${config.giphy.api_key}&limit=${gifCount}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                craeteHtml(item)
            })
        })
}

function fetchSearch(query, gifCount) {
    document.getElementById('box-gallery').innerHTML = ''
    fetch(`${config.giphy.url}/search?q=${encodeURIComponent(query)}&api_key=${config.giphy.api_key}&limit=${gifCount}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                craeteHtml(item)
            })
        })
}

function handleImageClick(item) {
    window.location.href = 'https://giphy.com/gifs/storyful-trump-george-santos-brendan-gutenschwager-via-storyful-deIQBpFIcEVgpdi45J'
}

function craeteHtml(item) {
    let div = document.createElement('div')
    div.id = `gallery-item-${item.id}`
    div.classList.add('col-auto', 'my-2', 'img-thumbnail')
    div.innerHTML = `<img src='${item.images.fixed_height.url}' alt='${item.title}' loading='lazy'>`
    div.addEventListener('click', function () {
        handleImageClick(item)
    })
    document.getElementById('box-gallery').append(div)
}

document.getElementById('search').addEventListener('blur', function (event) {
    const query = event.target.value
    const gifCount = document.getElementById('gifCountSelect').value
    fetchSearch(query, gifCount)
})
document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const query = event.target.value
        const gifCount = document.getElementById('gifCountSelect').value
        fetchSearch(query, gifCount)
    }
})

document.getElementById('gifCountSelect').addEventListener('change', function () {
    const query = document.getElementById('search').value
    const gifCount = document.getElementById('gifCountSelect').value
    if (query === '') {
        fetchTraiding(gifCount)
    } else {
        fetchSearch(query, gifCount)
    }
});

window.addEventListener('load', function (event) {
    const initialGifCount = document.getElementById('gifCountSelect').value
    fetchTraiding(initialGifCount)
})
