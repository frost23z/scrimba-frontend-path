import { blogPosts } from "./data.js"

let currentPostIndex = 0
const postsPerPage = 3

document.addEventListener("DOMContentLoaded", () => {
	initializeBlog()

	const hamburger = document.getElementById("hamburger")
	const navMenu = document.getElementById("nav-menu")

	if (hamburger && navMenu) {
		hamburger.addEventListener("click", () => {
			hamburger.classList.toggle("active")
			navMenu.classList.toggle("active")
		})

		navMenu.addEventListener("click", e => {
			if (e.target.classList.contains("nav-link")) {
				hamburger.classList.remove("active")
				navMenu.classList.remove("active")
			}
		})
	}

	const viewMoreBtn = document.getElementById("view-more-btn")
	if (viewMoreBtn) {
		viewMoreBtn.addEventListener("click", loadMorePosts)
	}
})

function initializeBlog() {
	const postsGrid = document.getElementById("posts-grid")
	if (!postsGrid) return

	postsGrid.innerHTML = ""

	loadMorePosts()
}

function loadMorePosts() {
	const postsGrid = document.getElementById("posts-grid")
	const viewMoreBtn = document.getElementById("view-more-btn")

	if (!postsGrid) return

	const endIndex = Math.min(currentPostIndex + postsPerPage, blogPosts.length)

	for (let i = currentPostIndex; i < endIndex; i++) {
		const post = blogPosts[i]
		const postElement = createPostElement(post)
		postsGrid.appendChild(postElement)

		setTimeout(
			() => {
				postElement.style.opacity = "1"
				postElement.style.transform = "translateY(0)"
			},
			(i - currentPostIndex) * 100
		)
	}

	currentPostIndex = endIndex

	if (currentPostIndex >= blogPosts.length) {
		if (viewMoreBtn) {
			viewMoreBtn.style.display = "none"
		}
	}
}

function createPostElement(post) {
	const article = document.createElement("article")
	article.className = "post-card"
	article.style.opacity = "0"
	article.style.transform = "translateY(20px)"
	article.style.transition = "opacity 0.5s ease, transform 0.5s ease"

	article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">
            <p class="post-date">${post.date}</p>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
        </div>
    `

	article.addEventListener("click", () => navigateToBlogPost(post))

	return article
}

function navigateToBlogPost(post) {
	window.location.href = `blog-post.html?id=${post.id}`
}
