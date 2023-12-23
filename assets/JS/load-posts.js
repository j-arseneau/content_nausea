const filter_posts = getCookie('filter')

const filterSatisfied = (postData) => {
    if (filter_posts === 'reviews') {return postData['post-type'] === 'Review'}
    else if (filter_posts === 'articles') {return postData['post-type'] === 'Article'}
    else if (filter_posts === 'film') {return postData['post-tag'] === 'Film'}
    else if (filter_posts === 'music') {return postData['post-tag'] === 'Music'}
    else if (filter_posts === 'others') {return postData['post-tag'] !== 'Music' && postData['post-tag'] !== 'Film'}
    else {return true}
}


function getCookie(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2]
    }
}



fetch('/assets/post-headers.json')
    .then((response) => response.json())
    .then((json) => json.sort(function (a, b) {
        let date_a = Date.parse(a['publish-date'])
        let date_b = Date.parse(b['publish-date'])
        if (date_a > date_b) {
            return -1;
        } else if (date_a < date_b) {
            return 1;
        }
        return 0;
    }))
    .then((sorted) => makeHTMLFromJson(sorted));

const makeHTMLFromJson = (json) =>  {
    for (let i = 0; i < json.length; i++) {
        if (i < json.length) {
            if (filterSatisfied(json[i])) {
                makePost(json[i])
            }
        }
    }
}

const makePost = (postData) => {
    const featuredContainer = document.querySelector("#post-container")
    const articleContainer = document.createElement("div")
    articleContainer.classList.add('post-container')
    const postContent = document.createElement("div")
    postContent.classList.add('post-content')
    const link = document.createElement("a")
    link.setAttribute("href", postData['post-ref'])
    const postImage = document.createElement('img')
    postImage.setAttribute("src", postData['img-ref'])
    postImage.setAttribute("alt", postData['img-alt'])
    const articleText = document.createElement("div")
    const articleInfo = document.createElement("div")
    const date = document.createElement("span")
    date.textContent = postData['publish-date']
    const type = document.createElement("span")
    type.classList.add("post-type")
    type.textContent = postData['post-type']
    const tag = document.createElement("span")
    tag.classList.add("post-tag")
    tag.textContent = postData['post-tag']
    articleInfo.appendChild(date)
    articleInfo.appendChild(type)
    articleInfo.appendChild(tag)
    const articleCaptions = document.createElement("div")
    const title = document.createElement("h3")
    title.classList.add("post-title")
    title.textContent = postData['post-title']
    const subtitle = document.createElement("span")
    subtitle.textContent = postData['post-subtitle']
    if (postData['post-type'] === 'Article') {
        articleContainer.classList.add('article-post-container')
        articleText.classList.add('article-text')
        articleInfo.classList.add('article-data')
        articleCaptions.classList.add("article-captions")
        postImage.classList.add('article-pic')
    } else {
        articleContainer.classList.add('review-post-container')
        articleText.classList.add('review-text')
        articleInfo.classList.add('review-data')
        articleCaptions.classList.add("review-captions")
        postImage.classList.add('review-pic')
        link.classList.add('review-link')
    }
    articleCaptions.appendChild(title)
    articleCaptions.appendChild(subtitle)
    articleText.appendChild(articleInfo)
    articleText.appendChild(articleCaptions)
    link.appendChild(postImage)
    link.appendChild(articleText)
    postContent.appendChild(link)
    articleContainer.appendChild(postContent)
    featuredContainer.appendChild(articleContainer)
}

const pageTitle = document.querySelector('#page-title')

if (filter_posts === 'reviews') {pageTitle.innerText = 'Reviews'}
else if (filter_posts === 'articles') {pageTitle.innerText = 'Articles'}
else if (filter_posts === 'film') {pageTitle.innerText = 'Film'}
else if (filter_posts === 'music') {pageTitle.innerText = 'Music'}
else if (filter_posts === 'others') {pageTitle.innerText = 'Others'}
else {pageTitle.innerText = 'New Posts'}