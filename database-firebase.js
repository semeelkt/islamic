/**
 * FIREBASE DATABASE MODULE - Cloud Database for Wuroud Islamic Hub
 * Syncs data across all users and devices in real-time
 * 
 * Setup Instructions:
 * 1. Go to https://firebase.google.com
 * 2. Create new project
 * 3. Enable Firestore database
 * 4. Copy your config below
 * 5. Uncomment Firebase code
 * 
 * Usage: Same as localStorage version - all calls work the same!
 * - DB.articles.add(article)
 * - DB.articles.get()
 * - DB.articles.delete(id)
 */

// ===== FIREBASE CONFIG (UPDATE THIS WITH YOUR FIREBASE CREDENTIALS) =====
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAbdohB61du6uE627zE7suf7kRk9eIw60U",
    authDomain: "zonera-e4b13.firebaseapp.com",
    projectId: "zonera-e4b13",
    storageBucket: "zonera-e4b13.firebasestorage.app",
    messagingSenderId: "176063306389",
    appId: "1:176063306389:web:b4dfadc3f89b502eed999c"
};

// ===== MODE SELECTION =====
// Set to 'firebase' for cloud sync, or 'local' for browser storage
const DB_MODE = localStorage.getItem('dbMode') || 'local';

let firebaseInitialized = false;
let db = null;

// Initialize Firebase (when mode is set to 'firebase')
function initializeFirebase() {
    if (firebaseInitialized) return;
    
    try {
        // Check if firebase config is set
        if (FIREBASE_CONFIG.projectId === "YOUR_PROJECT_ID") {
            console.warn('⚠️ Firebase config not set. Using localStorage instead.');
            return;
        }
        
        // Initialize Firebase
        firebase.initializeApp(FIREBASE_CONFIG);
        db = firebase.firestore();
        firebaseInitialized = true;
        console.log('✅ Firebase initialized successfully!');
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
}

// ===== DATABASE MODULE =====

const DB = {
    // ===== ARTICLES COLLECTION =====
    articles: {
        // Get all articles
        async get() {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const snapshot = await db.collection('articles').orderBy('date', 'desc').get();
                    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch (error) {
                    console.error('Error fetching articles:', error);
                    return this.getDefault();
                }
            } else {
                // Fallback to localStorage
                const data = localStorage.getItem('articles');
                return data ? JSON.parse(data) : this.getDefault();
            }
        },
        
        // Add new article
        async add(article) {
            const newArticle = {
                title: article.title || '',
                category: article.category || 'General',
                author: article.author || 'Anonymous',
                content: article.content || '',
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                }),
                timestamp: new Date().getTime(),
                image: article.image || null,
                views: 0,
                status: 'published'
            };
            
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const docRef = await db.collection('articles').add(newArticle);
                    console.log('✅ Article added to Firebase:', newArticle.title);
                    return { id: docRef.id, ...newArticle };
                } catch (error) {
                    console.error('Error adding article:', error);
                    return null;
                }
            } else {
                // Fallback to localStorage
                const articles = this.get();
                newArticle.id = Date.now();
                articles.push(newArticle);
                localStorage.setItem('articles', JSON.stringify(articles));
                console.log('✅ Article added to localStorage:', newArticle.title);
                return newArticle;
            }
        },
        
        // Delete article
        async delete(id) {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    await db.collection('articles').doc(id).delete();
                    console.log('🗑️ Article deleted from Firebase:', id);
                } catch (error) {
                    console.error('Error deleting article:', error);
                }
            } else {
                // Fallback to localStorage
                const articles = this.get();
                const filtered = articles.filter(a => a.id !== id);
                localStorage.setItem('articles', JSON.stringify(filtered));
                console.log('🗑️ Article deleted from localStorage:', id);
            }
        },
        
        // Update article
        async update(id, updatedData) {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    await db.collection('articles').doc(id).update(updatedData);
                    console.log('✏️ Article updated in Firebase:', id);
                    return { id, ...updatedData };
                } catch (error) {
                    console.error('Error updating article:', error);
                    return null;
                }
            } else {
                // Fallback to localStorage
                const articles = this.get();
                const index = articles.findIndex(a => a.id === id);
                if (index !== -1) {
                    articles[index] = { ...articles[index], ...updatedData };
                    localStorage.setItem('articles', JSON.stringify(articles));
                    console.log('✏️ Article updated in localStorage:', id);
                    return articles[index];
                }
                return null;
            }
        },
        
        // Search articles
        async search(keyword) {
            const articles = await this.get();
            return articles.filter(a => 
                a.title.toLowerCase().includes(keyword.toLowerCase()) ||
                a.content.toLowerCase().includes(keyword.toLowerCase()) ||
                a.author.toLowerCase().includes(keyword.toLowerCase())
            );
        },
        
        // Filter by category
        async filterByCategory(category) {
            const articles = await this.get();
            return articles.filter(a => a.category === category);
        },
        
        // Get featured
        async getFeatured(count = 3) {
            const articles = await this.get();
            return articles.slice(0, count);
        },
        
        // Default articles
        getDefault() {
            return [
                {
                    id: 1001,
                    title: "Understanding Tawheed",
                    category: "Aqeedah",
                    author: "Islamic Scholar",
                    content: "Tawheed is the foundation of Islamic belief. It means the absolute oneness of Allah and rejecting all forms of polytheism.",
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
                    content: "The Five Pillars are the foundation of Islamic practice. They include Shahada, Salah, Zakat, Sawm, and Hajj.",
                    date: "11/20/2025",
                    image: null,
                    views: 189,
                    status: "published"
                }
            ];
        }
    },
    
    // ===== BLOGS COLLECTION =====
    blogs: {
        // Get all blogs
        async get() {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const snapshot = await db.collection('blogs').orderBy('date', 'desc').get();
                    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                    return this.getDefault();
                }
            } else {
                const data = localStorage.getItem('blogs');
                return data ? JSON.parse(data) : this.getDefault();
            }
        },
        
        // Add blog
        async add(blog) {
            const newBlog = {
                title: blog.title || '',
                author: blog.author || 'Anonymous',
                content: blog.content || '',
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                }),
                timestamp: new Date().getTime(),
                category: blog.category || 'General',
                image: blog.image || null,
                views: 0,
                likes: 0,
                status: 'published'
            };
            
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const docRef = await db.collection('blogs').add(newBlog);
                    console.log('✅ Blog added to Firebase:', newBlog.title);
                    return { id: docRef.id, ...newBlog };
                } catch (error) {
                    console.error('Error adding blog:', error);
                    return null;
                }
            } else {
                const blogs = this.get();
                newBlog.id = Date.now();
                blogs.push(newBlog);
                localStorage.setItem('blogs', JSON.stringify(blogs));
                console.log('✅ Blog added to localStorage:', newBlog.title);
                return newBlog;
            }
        },
        
        // Delete blog
        async delete(id) {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    await db.collection('blogs').doc(id).delete();
                    console.log('🗑️ Blog deleted from Firebase:', id);
                } catch (error) {
                    console.error('Error deleting blog:', error);
                }
            } else {
                const blogs = this.get();
                const filtered = blogs.filter(b => b.id !== id);
                localStorage.setItem('blogs', JSON.stringify(filtered));
                console.log('🗑️ Blog deleted from localStorage:', id);
            }
        },
        
        // Update blog
        async update(id, updatedData) {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    await db.collection('blogs').doc(id).update(updatedData);
                    console.log('✏️ Blog updated in Firebase:', id);
                    return { id, ...updatedData };
                } catch (error) {
                    console.error('Error updating blog:', error);
                    return null;
                }
            } else {
                const blogs = this.get();
                const index = blogs.findIndex(b => b.id === id);
                if (index !== -1) {
                    blogs[index] = { ...blogs[index], ...updatedData };
                    localStorage.setItem('blogs', JSON.stringify(blogs));
                    console.log('✏️ Blog updated in localStorage:', id);
                    return blogs[index];
                }
                return null;
            }
        },
        
        // Default blogs
        getDefault() {
            return [
                {
                    id: 2001,
                    title: "My Journey to Islam",
                    author: "Ahmed Hassan",
                    content: "Alhamdulillah, I embraced Islam last year. This is my personal journey.",
                    date: "11/10/2025",
                    category: "Personal",
                    image: null,
                    views: 342,
                    likes: 87,
                    status: "published"
                }
            ];
        }
    },
    
    // ===== CATEGORIES COLLECTION =====
    categories: {
        async get() {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const snapshot = await db.collection('categories').get();
                    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    return this.getDefault();
                }
            } else {
                const data = localStorage.getItem('categories');
                return data ? JSON.parse(data) : this.getDefault();
            }
        },
        
        async add(category) {
            const newCategory = {
                name: category.name || '',
                description: category.description || '',
                icon: category.icon || 'book'
            };
            
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const docRef = await db.collection('categories').add(newCategory);
                    console.log('✅ Category added to Firebase:', newCategory.name);
                    return { id: docRef.id, ...newCategory };
                } catch (error) {
                    console.error('Error adding category:', error);
                    return null;
                }
            } else {
                const categories = this.get();
                newCategory.id = Date.now();
                categories.push(newCategory);
                localStorage.setItem('categories', JSON.stringify(categories));
                console.log('✅ Category added to localStorage:', newCategory.name);
                return newCategory;
            }
        },
        
        async delete(id) {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    await db.collection('categories').doc(id).delete();
                    console.log('🗑️ Category deleted from Firebase:', id);
                } catch (error) {
                    console.error('Error deleting category:', error);
                }
            } else {
                const categories = this.get();
                const filtered = categories.filter(c => c.id !== id);
                localStorage.setItem('categories', JSON.stringify(filtered));
                console.log('🗑️ Category deleted from localStorage:', id);
            }
        },
        
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
        }
    },
    
    // ===== USERS COLLECTION =====
    users: {
        async get() {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const snapshot = await db.collection('users').get();
                    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } catch (error) {
                    console.error('Error fetching users:', error);
                    return this.getDefault();
                }
            } else {
                const data = localStorage.getItem('users');
                return data ? JSON.parse(data) : this.getDefault();
            }
        },
        
        async add(user) {
            const newUser = {
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
            
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    const docRef = await db.collection('users').add(newUser);
                    console.log('✅ User added to Firebase:', newUser.username);
                    return { id: docRef.id, ...newUser };
                } catch (error) {
                    console.error('Error adding user:', error);
                    return null;
                }
            } else {
                const users = this.get();
                newUser.id = Date.now();
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                console.log('✅ User added to localStorage:', newUser.username);
                return newUser;
            }
        },
        
        async delete(id) {
            if (DB_MODE === 'firebase' && firebaseInitialized) {
                try {
                    await db.collection('users').doc(id).delete();
                    console.log('🗑️ User deleted from Firebase:', id);
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            } else {
                const users = this.get();
                const filtered = users.filter(u => u.id !== id);
                localStorage.setItem('users', JSON.stringify(filtered));
                console.log('🗑️ User deleted from localStorage:', id);
            }
        },
        
        getDefault() {
            return [
                { id: 4001, username: 'SEMEELKT', email: 'admin@wuroud.com', role: 'admin', joinDate: '11/01/2025', status: 'active' }
            ];
        }
    },
    
    // ===== UTILITIES =====
    
    async init() {
        console.log('📦 Initializing Database...');
        
        if (DB_MODE === 'firebase') {
            initializeFirebase();
            if (firebaseInitialized) {
                console.log('✅ Using Firebase (Cloud Database)');
            } else {
                console.log('⚠️ Firebase not available, falling back to localStorage');
            }
        } else {
            console.log('✅ Using localStorage (Browser Storage)');
        }
        
        // Initialize collections
        await this.articles.get();
        await this.blogs.get();
        await this.categories.get();
        await this.users.get();
        
        console.log('✅ Database Ready!');
    },
    
    // Export all data
    async export() {
        return {
            articles: await this.articles.get(),
            blogs: await this.blogs.get(),
            categories: await this.categories.get(),
            users: await this.users.get(),
            exportDate: new Date().toLocaleString(),
            mode: DB_MODE
        };
    },
    
    // Get stats
    async getStats() {
        return {
            totalArticles: (await this.articles.get()).length,
            totalBlogs: (await this.blogs.get()).length,
            totalCategories: (await this.categories.get()).length,
            totalUsers: (await this.users.get()).length,
            databaseMode: DB_MODE,
            lastUpdated: new Date().toLocaleString()
        };
    },
    
    // Switch database mode
    setMode(mode) {
        if (mode === 'firebase' || mode === 'local') {
            localStorage.setItem('dbMode', mode);
            location.reload();
        }
    }
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
});

console.log('📚 Wuroud Database Module Loaded!');
console.log('Current Mode:', DB_MODE);
