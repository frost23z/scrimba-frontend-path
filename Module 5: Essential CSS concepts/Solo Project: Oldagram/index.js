const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        liked: false
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        liked: false
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        liked: false
    }
]

const postsContainer = document.getElementById("posts-container");

function renderPosts() {

    postsContainer.innerHTML = "";
    
    posts.forEach((post, index) => {
        const postHTML = `
            <section class="post" id="post-${index}">
                <div class="post-header">
                    <img class="post-avatar" src="${post.avatar}" alt="${post.name}'s avatar">
                    <div class="post-user-info">
                        <h2 class="post-user-name">${post.name}</h2>
                        <p class="post-location">${post.location}</p>
                    </div>
                </div>
                <div class="post-img-container">
                    <img class="post-img" src="${post.post}" alt="${post.name}'s post" data-index="${index}">
                </div>
                <div class="post-actions">
                    <div class="icon-row">
                        <img class="icon heart-icon" src="images/icon-heart.png" alt="Like" data-index="${index}">
                        <img class="icon" src="images/icon-comment.png" alt="Comment">
                        <img class="icon" src="images/icon-dm.png" alt="Direct message">
                    </div>
                    <p class="post-likes">${post.likes.toLocaleString()} likes</p>
                    <p class="post-caption"><span class="username">${post.username}</span> ${post.comment}</p>
                </div>
            </section>
        `;
        postsContainer.innerHTML += postHTML;
    });
    
    setupEventListeners();
}

function setupEventListeners() {
    const heartIcons = document.querySelectorAll(".heart-icon");
    heartIcons.forEach(icon => {
        icon.addEventListener("click", function() {
            const index = this.dataset.index;
            toggleLike(index);
        });
    });
    
    const postImages = document.querySelectorAll(".post-img");
    postImages.forEach(img => {
        img.addEventListener("dblclick", function() {
            const index = this.dataset.index;
            toggleLike(index);
        });
    });
}

function toggleLike(index) {
    const post = posts[index];
    if (!post.liked) {
        post.likes++;
        post.liked = true;
    } else {
        post.likes--;
        post.liked = false;
    }
    
    const likesElement = document.querySelector(`#post-${index} .post-likes`);
    likesElement.textContent = `${post.likes.toLocaleString()} likes`;
}

renderPosts();

