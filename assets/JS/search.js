const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const query = urlParams.get('query');

const searchTitle = document.querySelector('#search-text')
searchTitle.textContent += query + "\""

fetch('./assets/post-headers.json')
    .then((response) => response.json())
    .then((json) => runSearch(query, json));

function runSearch (q, json) {
    let numPosts = 0;
    let qList = q.trim().split(' ')
    for (let i = 0; i < qList.length; i++) {
        for (let j = 0; j < json.length; j++) {
            if (Object.entries(json[j]).some(([key, value]) => {
                return value.toLowerCase().split(' ').some((s) => {
                    return s.includes(qList[i].toLowerCase())
            })})) {
                makePost(json[j])
                numPosts += 1;
            }
        }
    }
    if (numPosts === 0) {
        const featuredContainer = document.querySelector("#post-container")
        const noResults = document.createElement("span")
        noResults.classList.add('no-results')
        noResults.textContent = "No results were found for that query."
        featuredContainer.appendChild(noResults)

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