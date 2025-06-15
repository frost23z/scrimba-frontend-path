import { blogPosts } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeAboutBlog();
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

function initializeAboutBlog() {
    const aboutPostsGrid = document.getElementById('about-posts-grid');
    if (!aboutPostsGrid) return;
    
    aboutPostsGrid.innerHTML = '';
    
    const recentPosts = blogPosts.slice(0, 3);
    
    recentPosts.forEach((post, index) => {
        const postElement = createPostElement(post);
        aboutPostsGrid.appendChild(postElement);
        
        setTimeout(() => {
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">
            <p class="post-date">${post.date}</p>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
        </div>
    `;
    
    article.addEventListener('click', () => navigateToBlogPost(post));
    
    return article;
}

function navigateToBlogPost(post) {
    window.location.href = `blog-post.html?id=${post.id}`;
}