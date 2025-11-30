/**
 * WUROUD ISLAMIC HUB - FIREBASE INTEGRATION GUIDE
 * 
 * Currently, the app uses localStorage (browser storage) for data.
 * To integrate Firebase (cloud database), follow these steps:
 */

/**
 * ============================================
 * STEP 1: Firebase Setup Instructions
 * ============================================
 * 
 * 1. Go to https://firebase.google.com
 * 2. Create a new project
 * 3. Go to "Project Settings" and copy your config
 * 4. Create a file named "firebase-config.js" with this structure:
 * 
 *    const firebaseConfig = {
 *      apiKey: "YOUR_API_KEY",
 *      authDomain: "your-project.firebaseapp.com",
 *      projectId: "your-project-id",
 *      storageBucket: "your-project.appspot.com",
 *      messagingSenderId: "YOUR_SENDER_ID",
 *      appId: "YOUR_APP_ID"
 *    };
 * 
 * 5. Enable Firestore Database in Firebase Console
 * 6. Set Security Rules (allow read/write for now, secure later)
 */

/**
 * ============================================
 * STEP 2: Include Firebase in Your HTML
 * ============================================
 * 
 * Add these scripts to your HTML <head> section:
 * 
 *    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
 *    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
 *    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>
 *    <script src="firebase-config.js"></script>
 */

/**
 * ============================================
 * STEP 3: Firebase vs localStorage Comparison
 * ============================================
 * 
 * CURRENT SETUP (localStorage):
 * - Data stored in browser only
 * - No internet required
 * - Data lost if browser cache cleared
 * - Limited to ~5-10MB per domain
 * - No multi-device sync
 * - Perfect for: Testing, offline apps, small projects
 * 
 * FIREBASE SETUP:
 * - Cloud database (data on servers)
 * - Requires internet
 * - Data persists indefinitely
 * - Unlimited storage
 * - Real-time sync across devices
 * - Authentication built-in
 * - Perfect for: Production apps, multi-user, real-time updates
 */

/**
 * ============================================
 * STEP 4: Firebase Firestore Collections Structure
 * ============================================
 * 
 * Collection: "articles"
 * Document fields:
 * - id: (auto-generated)
 * - title: "Article Title"
 * - category: "Qur'an"
 * - author: "Author Name"
 * - content: "Article content..."
 * - date: "2025-11-30"
 * - createdAt: (timestamp)
 * 
 * Collection: "blogs"
 * Document fields:
 * - id: (auto-generated)
 * - title: "Blog Title"
 * - author: "Author Name"
 * - content: "Blog content..."
 * - date: "2025-11-30"
 * - createdAt: (timestamp)
 * 
 * Collection: "users"
 * Document fields:
 * - username: "username"
 * - role: "Admin" or "User"
 * - joinDate: "2025-11-30"
 * - email: "user@example.com"
 * 
 * Collection: "categories"
 * Document fields:
 * - name: "Category Name"
 * - description: "Category description"
 */

/**
 * ============================================
 * STEP 5: Firebase Implementation Example
 * ============================================
 */

// EXAMPLE: Initialize Firebase (uncomment and use when Firebase is set up)
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add Article to Firestore
async function addArticleToFirebase(article) {
    try {
        const docRef = await addDoc(collection(db, "articles"), {
            title: article.title,
            category: article.category,
            author: article.author,
            content: article.content,
            date: article.date,
            createdAt: new Date()
        });
        console.log("Article added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding article: ", error);
    }
}

// Get All Articles from Firestore
async function getArticlesFromFirebase() {
    const articles = [];
    try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        querySnapshot.forEach((doc) => {
            articles.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return articles;
    } catch (error) {
        console.error("Error getting articles: ", error);
        return [];
    }
}

// Delete Article from Firestore
async function deleteArticleFromFirebase(articleId) {
    try {
        await deleteDoc(doc(db, "articles", articleId));
        console.log("Article deleted successfully");
    } catch (error) {
        console.error("Error deleting article: ", error);
    }
}

// Add Blog to Firestore
async function addBlogToFirebase(blog) {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: blog.title,
            author: blog.author,
            content: blog.content,
            date: blog.date,
            createdAt: new Date()
        });
        console.log("Blog added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding blog: ", error);
    }
}

// Get All Blogs from Firestore
async function getBlogsFromFirebase() {
    const blogs = [];
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            blogs.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return blogs;
    } catch (error) {
        console.error("Error getting blogs: ", error);
        return [];
    }
}
*/

/**
 * ============================================
 * CURRENT IMPLEMENTATION (localStorage)
 * ============================================
 * 
 * The app currently uses localStorage for all data storage.
 * Data persists in the browser's local storage.
 * 
 * To migrate to Firebase, update the functions in main.js and admin.html
 * to use Firebase methods instead of localStorage.
 * 
 * Example migration:
 * 
 * // BEFORE (localStorage):
 * const articles = JSON.parse(localStorage.getItem('articles')) || [];
 * 
 * // AFTER (Firebase):
 * const articles = await getArticlesFromFirebase();
 */

/**
 * ============================================
 * SECURITY RULES FOR FIRESTORE
 * ============================================
 * 
 * Copy these rules to Firebase Console > Firestore > Rules
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Only authenticated users can read/write
 *     match /{document=**} {
 *       allow read, write: if request.auth != null;
 *     }
 *     
 *     // Articles - Anyone can read, only admins can write
 *     match /articles/{document=**} {
 *       allow read: if true;
 *       allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
 *     }
 *     
 *     // Blogs - Anyone can read, only admins can write
 *     match /blogs/{document=**} {
 *       allow read: if true;
 *       allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
 *     }
 *   }
 * }
 */

console.log('Firebase Integration Guide loaded. See code comments for implementation details.');
