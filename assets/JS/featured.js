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
    .then((sorted) => makeFirstFeatured(sorted))
    .then((sorted) => makeSmallFeatured(sorted));

const makeFirstFeatured = (json) => {
    let firstArticle = true;
    for (let i = 0; i < json.length; i++) {
        if (i < json.length) {
            if (json[i]['post-type'] === 'Article' && firstArticle) {
                makeFeatured(json[i])
                firstArticle = false;
                break;
            }
        }
    }
    return json;
}

const makeSmallFeatured = (json) => {
    for (let i = 0; i < 4; i++) {
        if (i < json.length) {
            makeSmallPost(json[i])
        } else {
            makeEmptySmallPost()
        }
    }
}

const makeFeatured = (postData) => {
    const featuredSection = document.querySelector("#first-featured-section")
    const featuredContainer = document.createElement("div")
    featuredContainer.classList.add('featured-container')
    const firstFeaturedContainer = document.createElement("div")
    firstFeaturedContainer.classList.add('first-featured-container')
    const link = document.createElement("a")
    link.setAttribute("href", postData['post-ref'])
    const featuredContent = document.createElement("div")
    featuredContent.classList.add("first-featured-content")
    const postImage = document.createElement('img')
    postImage.setAttribute("src", postData['img-ref'])
    postImage.setAttribute("alt", postData['img-alt'])
    postImage.classList.add("first-featured-img")
    const featuredCaptions = document.createElement("div")
    featuredCaptions.classList.add("first-featured-captions")
    const title = document.createElement("h3")
    title.classList.add("post-title")
    title.textContent = postData['post-title']
    const subtitle = document.createElement("span")
    subtitle.textContent = postData['post-subtitle']
    featuredCaptions.appendChild(title)
    featuredCaptions.appendChild(subtitle)
    featuredContent.appendChild(postImage)
    featuredContent.appendChild(featuredCaptions)
    link.appendChild(featuredContent)
    firstFeaturedContainer.appendChild(link)
    featuredContainer.appendChild(firstFeaturedContainer)
    featuredSection.appendChild(featuredContainer)
};

const makeSmallPost = (postData) => {
    const newPostContainer = document.querySelector("#new-posts-container")
    const smallFeaturedContainer = document.createElement("div")
    smallFeaturedContainer.classList.add('small-featured-container')
    smallFeaturedContainer.classList.add('real-container')
    const link = document.createElement("a")
    link.classList.add('small-featured-link')
    const featuredText = document.createElement("div")
    featuredText.classList.add("small-featured-text")
    const title = document.createElement("h3")
    title.classList.add("post-title")
    const subtitle = document.createElement("span")
    let postImage = document.createElement('img')
    postImage.setAttribute("src", postData['img-ref'])
    postImage.setAttribute("alt", postData['img-alt'])
    if (postData['post-type'] === 'Article') {
        postImage.classList.add("small-featured-article-img")
    } else {
        postImage.classList.add("small-featured-review-img")
    }
    subtitle.textContent = postData['post-subtitle']
    title.textContent = postData['post-title']
    link.setAttribute("href", postData['post-ref'])
    featuredText.appendChild(title)
    featuredText.appendChild(subtitle)
    link.appendChild(postImage)
    link.appendChild(featuredText)
    smallFeaturedContainer.appendChild(link)
    newPostContainer.appendChild(smallFeaturedContainer)
}

const makeEmptySmallPost = () => {
    const newPostContainer = document.querySelector("#new-posts-container")
    const smallFeaturedContainer = document.createElement("div")
    smallFeaturedContainer.classList.add('small-featured-container')
    const link = document.createElement("a")
    const featuredText = document.createElement("div")
    featuredText.classList.add("small-featured-text")
    const title = document.createElement("h3")
    title.classList.add("post-title")
    const subtitle = document.createElement("span")
    let postImage = document.createElement('div')
    postImage.classList.add("blank-featured-img")
    postImage.classList.add("small-featured-img")
    featuredText.appendChild(title)
    featuredText.appendChild(subtitle)
    link.appendChild(postImage)
    link.appendChild(featuredText)
    smallFeaturedContainer.appendChild(link)
    newPostContainer.appendChild(smallFeaturedContainer)
}