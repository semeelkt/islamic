/**
 * UNIFIED DATABASE MODULE - Works with Firebase OR localStorage
 * Automatically detects which mode to use
 */

// Firebase Config
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAbdohB61du6uE627zE7suf7kRk9eIw60U",
    authDomain: "zonera-e4b13.firebaseapp.com",
    projectId: "zonera-e4b13",
    storageBucket: "zonera-e4b13.firebasestorage.app",
    messagingSenderId: "176063306389",
    appId: "1:176063306389:web:b4dfadc3f89b502eed999c"
};

// Check mode
const DB_MODE = localStorage.getItem('dbMode') || 'local';
let firebaseInitialized = false;
let db = null;

// Initialize Firebase if available
function initializeFirebase() {
    if (firebaseInitialized || DB_MODE === 'local') return;
    
    try {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded');
            return;
        }
        
        // Try to initialize
        try {
            firebase.app();
            db = firebase.firestore();
        } catch (e) {
            firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.firestore();
        }
        
        firebaseInitialized = true;
        console.log('✅ Firebase initialized for ' + FIREBASE_CONFIG.projectId);
    } catch (error) {
        console.warn('Firebase initialization skipped, using localStorage:', error.message);
        firebaseInitialized = false;
    }
}

// Initialize on load
setTimeout(() => initializeFirebase(), 100);

// ===== DATABASE OBJECT =====
const DB = {
    mode: DB_MODE,
    
    setMode(newMode) {
        localStorage.setItem('dbMode', newMode);
        location.reload();
    },
    
    init() {
        initializeFirebase();
    },

    // ===== ARTICLES =====
    articles: {
        getDefault() {
            return [
                {
                    id: 1,
                    title: 'Understanding Surah Al-Fatiha',
                    category: 'Qur\'an',
                    author: 'Sheikh Abdullah',
                    content: 'Explore the deep meanings and lessons from the opening chapter of the Holy Qur\'an...',
                    date: new Date().toLocaleDateString(),
                    image: null,
                    views: 0,
                    status: 'published'
                },
                {
                    id: 2,
                    title: 'The Importance of Good Character',
                    category: 'Hadith',
                    author: 'Dr. Ahmad',
                    content: 'Learn about the emphasis Islam places on good character through authentic hadith...',
                    date: new Date().toLocaleDateString(),
                    image: null,
                    views: 0,
                    status: 'published'
                },
                {
                    id: 3,
                    title: 'Understanding Prayer Times',
                    category: 'Fiqh',
                    author: 'Ustadh Ibrahim',
                    content: 'A comprehensive guide to understanding and calculating Islamic prayer times...',
                    date: new Date().toLocaleDateString(),
                    image: null,
                    views: 0,
                    status: 'published'
                }
            ];
        },

        get() {
            // For articles page - use sync localStorage first
            const stored = localStorage.getItem('articles');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    return this.getDefault();
                }
            }
            return this.getDefault();
        },

        add(article) {
            try {
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
                    timestamp: new Date().getTime(),
                    image: article.image || null,
                    views: 0,
                    status: 'published'
                };
                
                // Save to localStorage first (for immediate display)
                let articles = this.get();
                articles.unshift(newArticle);
                localStorage.setItem('articles', JSON.stringify(articles));
                
                // Also save to Firebase if enabled
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('articles').doc(String(newArticle.id)).set(newArticle);
                        console.log('✅ Article synced to Firebase');
                    } catch (e) {
                        console.warn('Firebase sync failed:', e.message);
                    }
                }
                
                return newArticle;
            } catch (error) {
                console.error('Error adding article:', error);
                return null;
            }
        },

        delete(id) {
            try {
                let articles = this.get();
                articles = articles.filter(a => a.id !== id);
                localStorage.setItem('articles', JSON.stringify(articles));
                
                // Also delete from Firebase if enabled
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('articles').doc(String(id)).delete();
                    } catch (e) {
                        console.warn('Firebase delete failed:', e.message);
                    }
                }
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        },

        update(id, updates) {
            try {
                let articles = this.get();
                articles = articles.map(a => a.id === id ? { ...a, ...updates } : a);
                localStorage.setItem('articles', JSON.stringify(articles));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('articles').doc(String(id)).update(updates);
                    } catch (e) {
                        console.warn('Firebase update failed:', e.message);
                    }
                }
            } catch (error) {
                console.error('Error updating article:', error);
            }
        },

        search(term) {
            return this.get().filter(a => 
                a.title.toLowerCase().includes(term.toLowerCase()) ||
                a.content.toLowerCase().includes(term.toLowerCase()) ||
                a.author.toLowerCase().includes(term.toLowerCase())
            );
        },

        filterByCategory(category) {
            return this.get().filter(a => a.category === category);
        }
    },

    // ===== BLOGS =====
    blogs: {
        getDefault() {
            return [];
        },

        get() {
            const stored = localStorage.getItem('blogs');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    return this.getDefault();
                }
            }
            return this.getDefault();
        },

        add(blog) {
            try {
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
                    timestamp: new Date().getTime(),
                    views: 0,
                    status: 'published'
                };
                
                let blogs = this.get();
                blogs.unshift(newBlog);
                localStorage.setItem('blogs', JSON.stringify(blogs));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('blogs').doc(String(newBlog.id)).set(newBlog);
                    } catch (e) {
                        console.warn('Firebase sync failed:', e.message);
                    }
                }
                
                return newBlog;
            } catch (error) {
                console.error('Error adding blog:', error);
                return null;
            }
        },

        delete(id) {
            try {
                let blogs = this.get();
                blogs = blogs.filter(b => b.id !== id);
                localStorage.setItem('blogs', JSON.stringify(blogs));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('blogs').doc(String(id)).delete();
                    } catch (e) {
                        console.warn('Firebase delete failed:', e.message);
                    }
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    },

    // ===== CATEGORIES =====
    categories: {
        getDefault() {
            return [
                { id: 1001, name: 'Qur\'an', description: 'Quranic studies and tafsir' },
                { id: 1002, name: 'Hadith', description: 'Hadith collections and analysis' },
                { id: 1003, name: 'Fiqh', description: 'Islamic jurisprudence' },
                { id: 1004, name: 'Islamic History', description: 'History of Islam' }
            ];
        },

        get() {
            const stored = localStorage.getItem('categories');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    return this.getDefault();
                }
            }
            return this.getDefault();
        },

        add(category) {
            try {
                const newCategory = {
                    id: Date.now(),
                    name: category.name || '',
                    description: category.description || ''
                };
                
                let categories = this.get();
                categories.push(newCategory);
                localStorage.setItem('categories', JSON.stringify(categories));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('categories').doc(String(newCategory.id)).set(newCategory);
                    } catch (e) {
                        console.warn('Firebase sync failed:', e.message);
                    }
                }
                
                return newCategory;
            } catch (error) {
                console.error('Error adding category:', error);
                return null;
            }
        },

        delete(id) {
            try {
                let categories = this.get();
                categories = categories.filter(c => c.id !== id);
                localStorage.setItem('categories', JSON.stringify(categories));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('categories').doc(String(id)).delete();
                    } catch (e) {
                        console.warn('Firebase delete failed:', e.message);
                    }
                }
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    },

    // ===== USERS =====
    users: {
        getDefault() {
            return [
                { id: 1, username: 'SEMEELKT', role: 'Admin', email: 'admin@wuroud.com', joinDate: '2025-01-01' }
            ];
        },

        get() {
            const stored = localStorage.getItem('users');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    return this.getDefault();
                }
            }
            return this.getDefault();
        },

        add(user) {
            try {
                const newUser = {
                    id: Date.now(),
                    username: user.username || '',
                    role: user.role || 'User',
                    email: user.email || '',
                    joinDate: new Date().toLocaleDateString()
                };
                
                let users = this.get();
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('users').doc(String(newUser.id)).set(newUser);
                    } catch (e) {
                        console.warn('Firebase sync failed:', e.message);
                    }
                }
                
                return newUser;
            } catch (error) {
                console.error('Error adding user:', error);
                return null;
            }
        },

        delete(id) {
            try {
                let users = this.get();
                users = users.filter(u => u.id !== id);
                localStorage.setItem('users', JSON.stringify(users));
                
                if (DB_MODE === 'firebase' && firebaseInitialized && db) {
                    try {
                        db.collection('users').doc(String(id)).delete();
                    } catch (e) {
                        console.warn('Firebase delete failed:', e.message);
                    }
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    }
};

console.log('✅ Database Module Loaded!');
console.log('Current Mode: ' + DB_MODE);
