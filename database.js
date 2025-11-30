/**
 * DATABASE MODULE - Handles all data persistence
 * Saves articles, blogs, users, categories to localStorage with JSON structure
 * 
 * Usage:
 * - DB.articles.add(article) - Add new article
 * - DB.articles.get() - Get all articles
 * - DB.articles.delete(id) - Delete article by ID
 * - DB.articles.update(id, article) - Update article
 * 
 * - DB.blogs.add(blog) - Add new blog
 * - DB.blogs.get() - Get all blogs
 * - DB.blogs.delete(id) - Delete blog by ID
 * 
 * - DB.categories.get() - Get all categories
 * - DB.users.get() - Get all users
 */

const DB = {
    // ===== DATABASE COLLECTIONS =====
    
    // ARTICLES Collection
    articles: {
        // Get all articles
        get() {
            const data = localStorage.getItem('articles');
            return data ? JSON.parse(data) : this.getDefault();
        },
        
        // Add new article
        add(article) {
            const articles = this.get();
            const newArticle = {
                id: Date.now(),
                title: article.title || '',
                category: article.category || 'General',
                author: article.author || 'Anonymous',
                content: article.content || '',
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                }),
                image: article.image || null,
                views: 0,
                status: 'published'
            };
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));
            console.log('✅ Article added:', newArticle.title);
            return newArticle;
        },
        
        // Delete article by ID
        delete(id) {
            const articles = this.get();
            const filtered = articles.filter(a => a.id !== id);
            localStorage.setItem('articles', JSON.stringify(filtered));
            console.log('🗑️ Article deleted:', id);
        },
        
        // Update article by ID
        update(id, updatedData) {
            const articles = this.get();
            const index = articles.findIndex(a => a.id === id);
            if (index !== -1) {
                articles[index] = { ...articles[index], ...updatedData };
                localStorage.setItem('articles', JSON.stringify(articles));
                console.log('✏️ Article updated:', id);
                return articles[index];
            }
            return null;
        },
        
        // Find article by ID
        findById(id) {
            return this.get().find(a => a.id === id);
        },
        
        // Search articles by keyword
        search(keyword) {
            return this.get().filter(a => 
                a.title.toLowerCase().includes(keyword.toLowerCase()) ||
                a.content.toLowerCase().includes(keyword.toLowerCase()) ||
                a.author.toLowerCase().includes(keyword.toLowerCase())
            );
        },
        
        // Filter by category
        filterByCategory(category) {
            return this.get().filter(a => a.category === category);
        },
        
        // Get featured articles (first N)
        getFeatured(count = 3) {
            return this.get().slice(0, count);
        },
        
        // Default sample articles
        getDefault() {
            return [
                {
                    id: 1001,
                    title: "Understanding Tawheed",
                    category: "Aqeedah",
                    author: "Islamic Scholar",
                    content: "Tawheed is the foundation of Islamic belief. It means the absolute oneness of Allah and rejecting all forms of polytheism. This article explores the importance of Tawheed in Islamic theology.",
                    date: "11/15/2025",
                    image: null,
                    views: 245,
                    status: "published"
                },
                {
                    id: 1002,
                    title: "The Five Pillars of Islam",
                    category: "Ibadah",
                    author: "Islamic Educator",
                    content: "The Five Pillars are the foundation of Islamic practice. They include Shahada (declaration of faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage). Each pillar holds great significance in a Muslim's life.",
                    date: "11/20/2025",
                    image: null,
                    views: 189,
                    status: "published"
                },
                {
                    id: 1003,
                    title: "Noble Manners in Islam",
                    category: "Akhlaq",
                    author: "Hadith Expert",
                    content: "Islamic teachings emphasize the importance of good manners and noble character. The Prophet Muhammad (peace be upon him) said, 'The best of you are those with the best manners.' This article discusses Islamic etiquette and virtues.",
                    date: "11/25/2025",
                    image: null,
                    views: 156,
                    status: "published"
                }
            ];
        },
        
        // Clear all articles
        clear() {
            localStorage.removeItem('articles');
            console.log('🗑️ All articles cleared');
        }
    },
    
    // BLOGS Collection
    blogs: {
        // Get all blogs
        get() {
            const data = localStorage.getItem('blogs');
            return data ? JSON.parse(data) : this.getDefault();
        },
        
        // Add new blog
        add(blog) {
            const blogs = this.get();
            const newBlog = {
                id: Date.now(),
                title: blog.title || '',
                author: blog.author || 'Anonymous',
                content: blog.content || '',
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                }),
                category: blog.category || 'General',
                image: blog.image || null,
                views: 0,
                likes: 0,
                status: 'published'
            };
            blogs.push(newBlog);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            console.log('✅ Blog added:', newBlog.title);
            return newBlog;
        },
        
        // Delete blog by ID
        delete(id) {
            const blogs = this.get();
            const filtered = blogs.filter(b => b.id !== id);
            localStorage.setItem('blogs', JSON.stringify(filtered));
            console.log('🗑️ Blog deleted:', id);
        },
        
        // Update blog by ID
        update(id, updatedData) {
            const blogs = this.get();
            const index = blogs.findIndex(b => b.id === id);
            if (index !== -1) {
                blogs[index] = { ...blogs[index], ...updatedData };
                localStorage.setItem('blogs', JSON.stringify(blogs));
                console.log('✏️ Blog updated:', id);
                return blogs[index];
            }
            return null;
        },
        
        // Find blog by ID
        findById(id) {
            return this.get().find(b => b.id === id);
        },
        
        // Default sample blogs
        getDefault() {
            return [
                {
                    id: 2001,
                    title: "My Journey to Islam",
                    author: "Ahmed Hassan",
                    content: "Alhamdulillah, I embraced Islam last year. This is my personal journey and how it changed my life for the better. Learning about Islamic teachings has been transformative.",
                    date: "11/10/2025",
                    category: "Personal",
                    image: null,
                    views: 342,
                    likes: 87,
                    status: "published"
                }
            ];
        },
        
        // Clear all blogs
        clear() {
            localStorage.removeItem('blogs');
            console.log('🗑️ All blogs cleared');
        }
    },
    
    // CATEGORIES Collection
    categories: {
        // Get all categories
        get() {
            const data = localStorage.getItem('categories');
            return data ? JSON.parse(data) : this.getDefault();
        },
        
        // Add new category
        add(category) {
            const categories = this.get();
            const newCategory = {
                id: Date.now(),
                name: category.name || '',
                description: category.description || '',
                icon: category.icon || 'book'
            };
            categories.push(newCategory);
            localStorage.setItem('categories', JSON.stringify(categories));
            console.log('✅ Category added:', newCategory.name);
            return newCategory;
        },
        
        // Delete category by ID
        delete(id) {
            const categories = this.get();
            const filtered = categories.filter(c => c.id !== id);
            localStorage.setItem('categories', JSON.stringify(filtered));
            console.log('🗑️ Category deleted:', id);
        },
        
        // Default categories
        getDefault() {
            return [
                { id: 3001, name: 'Aqeedah', description: 'Islamic Belief & Theology', icon: 'book' },
                { id: 3002, name: 'Ibadah', description: 'Acts of Worship', icon: 'pray' },
                { id: 3003, name: 'Akhlaq', description: 'Islamic Manners & Ethics', icon: 'heart' },
                { id: 3004, name: 'Fiqh', description: 'Islamic Jurisprudence', icon: 'scale' },
                { id: 3005, name: 'Tafsir', description: 'Qur\'an Interpretation', icon: 'book-quran' },
                { id: 3006, name: 'Sunnah', description: 'Prophetic Tradition', icon: 'scroll' },
                { id: 3007, name: 'General', description: 'General Islamic Topics', icon: 'star' }
            ];
        },
        
        // Clear all categories
        clear() {
            localStorage.removeItem('categories');
            console.log('🗑️ All categories cleared');
        }
    },
    
    // USERS Collection
    users: {
        // Get all users
        get() {
            const data = localStorage.getItem('users');
            return data ? JSON.parse(data) : this.getDefault();
        },
        
        // Add new user
        add(user) {
            const users = this.get();
            const newUser = {
                id: Date.now(),
                username: user.username || '',
                email: user.email || '',
                role: user.role || 'user',
                joinDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                }),
                status: 'active'
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('✅ User added:', newUser.username);
            return newUser;
        },
        
        // Delete user by ID
        delete(id) {
            const users = this.get();
            const filtered = users.filter(u => u.id !== id);
            localStorage.setItem('users', JSON.stringify(filtered));
            console.log('🗑️ User deleted:', id);
        },
        
        // Find user by username
        findByUsername(username) {
            return this.get().find(u => u.username === username);
        },
        
        // Default users
        getDefault() {
            return [
                { id: 4001, username: 'SEMEELKT', email: 'admin@wuroud.com', role: 'admin', joinDate: '11/01/2025', status: 'active' }
            ];
        },
        
        // Clear all users
        clear() {
            localStorage.removeItem('users');
            console.log('🗑️ All users cleared');
        }
    },
    
    // ===== DATABASE UTILITIES =====
    
    // Initialize database with default data
    init() {
        console.log('📦 Initializing Wuroud Database...');
        
        // Initialize each collection if empty
        if (!localStorage.getItem('articles')) {
            localStorage.setItem('articles', JSON.stringify(this.articles.getDefault()));
            console.log('✅ Articles initialized');
        }
        
        if (!localStorage.getItem('blogs')) {
            localStorage.setItem('blogs', JSON.stringify(this.blogs.getDefault()));
            console.log('✅ Blogs initialized');
        }
        
        if (!localStorage.getItem('categories')) {
            localStorage.setItem('categories', JSON.stringify(this.categories.getDefault()));
            console.log('✅ Categories initialized');
        }
        
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(this.users.getDefault()));
            console.log('✅ Users initialized');
        }
        
        console.log('✅ Database Ready!');
    },
    
    // Export all data as JSON
    export() {
        return {
            articles: this.articles.get(),
            blogs: this.blogs.get(),
            categories: this.categories.get(),
            users: this.users.get(),
            exportDate: new Date().toLocaleString(),
            version: '1.0'
        };
    },
    
    // Import data from JSON
    import(data) {
        if (data.articles) localStorage.setItem('articles', JSON.stringify(data.articles));
        if (data.blogs) localStorage.setItem('blogs', JSON.stringify(data.blogs));
        if (data.categories) localStorage.setItem('categories', JSON.stringify(data.categories));
        if (data.users) localStorage.setItem('users', JSON.stringify(data.users));
        console.log('✅ Data imported successfully');
    },
    
    // Get database statistics
    getStats() {
        return {
            totalArticles: this.articles.get().length,
            totalBlogs: this.blogs.get().length,
            totalCategories: this.categories.get().length,
            totalUsers: this.users.get().length,
            dbSize: JSON.stringify(this.export()).length + ' bytes',
            lastUpdated: new Date().toLocaleString()
        };
    },
    
    // Clear entire database
    clearAll() {
        if (confirm('⚠️ This will delete ALL data! Are you sure?')) {
            this.articles.clear();
            this.blogs.clear();
            this.categories.clear();
            this.users.clear();
            console.log('🗑️ DATABASE CLEARED');
        }
    },
    
    // Reset to defaults
    resetToDefaults() {
        if (confirm('⚠️ This will reset all data to defaults! Are you sure?')) {
            localStorage.removeItem('articles');
            localStorage.removeItem('blogs');
            localStorage.removeItem('categories');
            localStorage.removeItem('users');
            this.init();
            console.log('🔄 Database reset to defaults');
        }
    }
};

// Auto-initialize database when script loads
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
});

console.log('📚 Wuroud Database Module Loaded Successfully!');
