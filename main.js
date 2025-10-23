// Main JavaScript file for Wuroud Islamic Hub

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeThemeToggle();
    initializeSearch();
    initializeNewsletter();
    loadFeaturedArticles();
});

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        // Create search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-container">
                <input type="text" placeholder="Search articles..." class="search-input">
                <button class="close-search"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        document.body.appendChild(searchOverlay);
        
        // Focus search input
        const searchInput = searchOverlay.querySelector('.search-input');
        searchInput.focus();
        
        // Close search on button click
        const closeBtn = searchOverlay.querySelector('.close-search');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(searchOverlay);
        });
        
        // Close search on overlay click
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                document.body.removeChild(searchOverlay);
            }
        });
        
        // Handle search input
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    });
}

// Newsletter Subscription
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.textContent = 'Thank you for subscribing!';
            
            newsletterForm.innerHTML = '';
            newsletterForm.appendChild(successMessage);
            
            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', email);
        });
    }
}

// Load Featured Articles
function loadFeaturedArticles() {
    const articlesContainer = document.querySelector('.article-grid');
    if (!articlesContainer) return;

    // Sample featured articles data
    const featuredArticles = [
        {
            title: 'Understanding the Basics of Tawheed',
            category: 'Aqeedah',
            excerpt: 'Explore the fundamental concept of Islamic monotheism...',
            image: 'assets/article1.jpg'
        },
        {
            title: 'The Importance of Seeking Knowledge',
            category: 'Education',
            excerpt: 'Learn about the significance of education in Islam...',
            image: 'assets/article2.jpg'
        },
        {
            title: 'Prophetic Guidance in Daily Life',
            category: 'Hadith',
            excerpt: 'Practical lessons from the Sunnah for modern times...',
            image: 'assets/article3.jpg'
        }
    ];

    // Render featured articles
    featuredArticles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.className = 'article-card';
        articleElement.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
                <span class="category">${article.category}</span>
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
        articlesContainer.appendChild(articleElement);
    });
}
