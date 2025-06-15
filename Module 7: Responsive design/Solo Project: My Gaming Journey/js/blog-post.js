import { blogPosts } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (postId) {
        loadBlogPost(postId);
    } else {
        window.location.href = 'index.html';
    }
    
    loadRelatedPosts(postId);
    
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

function loadBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('page-title').textContent = `${post.title} - My Gaming Journey`;
    
    document.getElementById('blog-date').textContent = post.date;
    document.getElementById('blog-title').textContent = post.title;
    document.getElementById('blog-content').innerHTML = post.content;
}

function loadRelatedPosts(currentPostId) {
    const relatedPostsGrid = document.getElementById('related-posts-grid');
    if (!relatedPostsGrid) return;
    
    const relatedPosts = blogPosts
        .filter(post => post.id !== currentPostId)
        .slice(0, 3);
    
    relatedPostsGrid.innerHTML = '';
    
    relatedPosts.forEach(post => {
        const postElement = createPostElement(post);
        relatedPostsGrid.appendChild(postElement);
        
        setTimeout(() => {
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, 100);
    });
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    article.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">
            <p class="post-date">${post.date}</p>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
        </div>
    `;
    
    article.addEventListener('click', function() {
        window.location.href = `blog-post.html?id=${post.id}`;
    });
    
    return article;
}
