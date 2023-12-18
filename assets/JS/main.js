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
    const signUp = selectElement('#sign-up')
    const topBar = selectElement('#top-bar')
    searchBar.classList.toggle('activated')
    logo.classList.toggle('hidden')
    signUp.classList.toggle('hidden')
    topBar.classList.toggle('center-search')
    searchToggleIcon.classList.toggle('activated')
}

searchToggleIcon.addEventListener('click', toggleBar);

window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        const searchBar = selectElement('#search-bar')
        const logo = selectElement('#logo')
        const signUp = selectElement('#sign-up')
        const topBar = selectElement('#top-bar')
        searchBar.classList.remove('activated')
        logo.classList.remove('hidden')
        signUp.classList.remove('hidden')
        topBar.classList.remove('center-search')
        searchToggleIcon.classList.remove('activated')
    }
    }
)