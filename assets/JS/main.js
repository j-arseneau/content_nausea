const selectElement = selector => {
    const element = document.querySelector(selector)
    if (element) return element;
    throw new Error(`Something went wrong, make sure that ${selector} exists or is typed correctly.`)
};

const searchToggleIcon = selectElement('#search-button')

const toggleBar = () => {
    const searchBar = selectElement('#search-bar')
    selectElement('#search-input').focus()
    const logo = selectElement('#logo')
    const topBar = selectElement('#top-bar')
    searchBar.classList.toggle('activated')
    logo.classList.toggle('hidden')
    topBar.classList.toggle('center-search')
    searchToggleIcon.classList.toggle('activated')
}

searchToggleIcon.addEventListener('click', toggleBar);

window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        const searchBar = selectElement('#search-bar')
        const logo = selectElement('#logo')
        const topBar = selectElement('#top-bar')
        searchBar.classList.remove('activated')
        logo.classList.remove('hidden')
        topBar.classList.remove('center-search')
        searchToggleIcon.classList.remove('activated')
    }
    }
)

const searchGoButton = selectElement('#go-button')

const search = () => {
    const searchInput = selectElement('#search-input')
    window.location = './search.html?query=' + searchInput.value;
}

window.addEventListener('keyup', event => {
    const searchBar = selectElement('#search-bar')
    if (event.key === 'Enter' && searchBar.classList.contains('activated')) {
        search()
    }
})

searchGoButton.addEventListener('click', search)


newPostButton = document.querySelector('#new-posts')
articlesButton = document.querySelector('#articles')
reviewsButton = document.querySelector('#reviews')
filmButton = document.querySelector('#film')
musicButton = document.querySelector('#music')
othersButton = document.querySelector('#others')

newPostButton.addEventListener('click', function(e)
{
    // prevent default action
    e.preventDefault();

    // set cookie
    document.cookie = "filter=new-posts"

    // now go to link's location
    document.location.href = newPostButton.href;
});

articlesButton.addEventListener('click', function(e)
{
    // prevent default action
    e.preventDefault();

    // set cookie
    document.cookie = "filter=articles"

    // now go to link's location
    document.location.href = articlesButton.href;
});

reviewsButton.addEventListener('click', function(e)
{
    // prevent default action
    e.preventDefault();

    // set cookie
    document.cookie = "filter=reviews"

    // now go to link's location
    document.location.href = reviewsButton.href;
});

filmButton.addEventListener('click', function(e)
{
    // prevent default action
    e.preventDefault();

    // set cookie
    document.cookie = "filter=film"

    // now go to link's location
    document.location.href = filmButton.href;
});

musicButton.addEventListener('click', function(e)
{
    // prevent default action
    e.preventDefault();

    // set cookie
    document.cookie = "filter=music"

    // now go to link's location
    document.location.href = musicButton.href;
});

othersButton.addEventListener('click', function(e)
{
    // prevent default action
    e.preventDefault();

    // set cookie
    document.cookie = "filter=others"

    // now go to link's location
    document.location.href = othersButton.href;
});