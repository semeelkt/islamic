# 📚 Wuroud Database System Documentation

## Overview

The **database.js** file is a complete data management system for your Wuroud Islamic Hub. It handles all data storage for articles, blogs, users, and categories using the browser's localStorage.

---

## 🎯 Key Features

✅ **Easy CRUD Operations** - Create, Read, Update, Delete any data type  
✅ **Data Persistence** - All data saved in browser storage  
✅ **Built-in Defaults** - Sample data included automatically  
✅ **Data Export/Import** - Backup and restore functionality  
✅ **Database Stats** - Get size and stats of your database  
✅ **Search Functions** - Search and filter articles  

---

## 📦 Database Collections

### 1. **Articles Collection** - `DB.articles`

Stores all articles added by admin.

#### Add Article:
```javascript
DB.articles.add({
    title: "Understanding Tawheed",
    category: "Aqeedah",
    author: "Islamic Scholar",
    content: "Full article text here..."
});
```

#### Get All Articles:
```javascript
const articles = DB.articles.get();
console.log(articles); // Array of all articles
```

#### Delete Article:
```javascript
DB.articles.delete(articleId);
```

#### Update Article:
```javascript
DB.articles.update(articleId, {
    title: "Updated Title",
    content: "Updated content..."
});
```

#### Find by ID:
```javascript
const article = DB.articles.findById(articleId);
```

#### Search Articles:
```javascript
const results = DB.articles.search("tawheed");
```

#### Filter by Category:
```javascript
const aqeedahArticles = DB.articles.filterByCategory("Aqeedah");
```

#### Get Featured (First N):
```javascript
const featured = DB.articles.getFeatured(3); // Gets first 3 articles
```

---

### 2. **Blogs Collection** - `DB.blogs`

Stores all blog posts.

#### Add Blog:
```javascript
DB.blogs.add({
    title: "My Blog Title",
    author: "Blog Author",
    content: "Blog content here..."
});
```

#### Get All Blogs:
```javascript
const blogs = DB.blogs.get();
```

#### Delete Blog:
```javascript
DB.blogs.delete(blogId);
```

#### Update Blog:
```javascript
DB.blogs.update(blogId, {
    title: "Updated Blog Title"
});
```

#### Find Blog by ID:
```javascript
const blog = DB.blogs.findById(blogId);
```

---

### 3. **Categories Collection** - `DB.categories`

Stores article categories.

#### Add Category:
```javascript
DB.categories.add({
    name: "Aqeedah",
    description: "Islamic Belief & Theology",
    icon: "book"
});
```

#### Get All Categories:
```javascript
const categories = DB.categories.get();
```

#### Delete Category:
```javascript
DB.categories.delete(categoryId);
```

**Default Categories:**
- Aqeedah - Islamic Belief & Theology
- Ibadah - Acts of Worship
- Akhlaq - Islamic Manners & Ethics
- Fiqh - Islamic Jurisprudence
- Tafsir - Qur'an Interpretation
- Sunnah - Prophetic Tradition
- General - General Islamic Topics

---

### 4. **Users Collection** - `DB.users`

Stores user information.

#### Add User:
```javascript
DB.users.add({
    username: "john_doe",
    email: "john@example.com",
    role: "user"
});
```

#### Get All Users:
```javascript
const users = DB.users.get();
```

#### Delete User:
```javascript
DB.users.delete(userId);
```

#### Find by Username:
```javascript
const user = DB.users.findByUsername("john_doe");
```

---

## 🛠️ Utility Functions

### Initialize Database:
```javascript
DB.init();
// Initializes all collections with defaults if empty
// Automatically called on page load
```

### Export Data:
```javascript
const data = DB.export();
console.log(data);
// Returns JSON with all data + export date + version
```

### Import Data:
```javascript
DB.import({
    articles: [...],
    blogs: [...],
    categories: [...],
    users: [...]
});
```

### Get Database Statistics:
```javascript
const stats = DB.getStats();
console.log(stats);
// Output:
// {
//   totalArticles: 15,
//   totalBlogs: 8,
//   totalCategories: 7,
//   totalUsers: 12,
//   dbSize: "45213 bytes",
//   lastUpdated: "11/30/2025, 2:15:33 PM"
// }
```

### Clear All Data:
```javascript
DB.clearAll();
// Warns before deleting everything
```

### Reset to Defaults:
```javascript
DB.resetToDefaults();
// Clears all data and reinitializes with sample data
```

---

## 📊 Data Structure

### Article Object:
```javascript
{
    id: 1234567890,              // Timestamp-based unique ID
    title: "Article Title",      // Article headline
    category: "Aqeedah",         // Category name
    author: "Scholar Name",      // Author name
    content: "Article text...",  // Full article content
    date: "11/30/2025",          // Creation date
    image: null,                 // Optional image URL
    views: 245,                  // View counter
    status: "published"          // Publication status
}
```

### Blog Object:
```javascript
{
    id: 2001,                    // Unique ID
    title: "Blog Title",         // Blog headline
    author: "Blog Author",       // Author name
    content: "Blog content...",  // Blog text
    date: "11/30/2025",          // Creation date
    category: "Personal",        // Blog category
    image: null,                 // Optional image URL
    views: 342,                  // View counter
    likes: 87,                   // Like counter
    status: "published"          // Publication status
}
```

### Category Object:
```javascript
{
    id: 3001,                    // Unique ID
    name: "Aqeedah",             // Category name
    description: "...",          // Category description
    icon: "book"                 // Font Awesome icon name
}
```

### User Object:
```javascript
{
    id: 4001,                    // Unique ID
    username: "john_doe",        // Username
    email: "john@example.com",   // Email address
    role: "user",                // Role: admin or user
    joinDate: "11/30/2025",      // Join date
    status: "active"             // Account status
}
```

---

## 💾 Storage Details

**Storage Method:** Browser localStorage (local machine storage)  
**Data Format:** JSON strings  
**Storage Keys:**
- `articles` - Articles collection
- `blogs` - Blogs collection
- `categories` - Categories collection
- `users` - Users collection

**Storage Limits:**
- Browser: ~5-10 MB typically
- Clear browser cache to delete data

---

## 🔗 Integration Points

### In admin.html:
```javascript
// Adding article
DB.articles.add(article);

// Loading articles
const articles = DB.articles.get();

// Deleting article
DB.articles.delete(articleId);
```

### In main.js:
```javascript
// Load featured articles
function loadFeaturedArticles() {
    const articles = DB.articles.get();
    // Render articles...
}

// Load blogs
function loadBlogs() {
    const blogs = DB.blogs.get();
    // Render blogs...
}
```

### In articles.html:
```javascript
// Can access via DB.articles.get()
const allArticles = DB.articles.get();
```

---

## 🧪 Testing Database

Open browser console (F12) and test:

```javascript
// Add an article
DB.articles.add({
    title: "Test Article",
    category: "Aqeedah",
    author: "Tester",
    content: "This is a test article"
});

// Get all articles
DB.articles.get();

// Get stats
DB.getStats();

// Search
DB.articles.search("test");

// Export backup
DB.export();
```

---

## 📋 Sample Usage Workflow

```javascript
// 1. Initialize (automatic on page load)
DB.init();

// 2. Add article from admin panel
DB.articles.add({
    title: "Prophet Muhammad",
    category: "Sunnah",
    author: "Islamic Scholar",
    content: "The Prophet Muhammad (peace be upon him)..."
});

// 3. Article immediately available to all pages
const articles = DB.articles.get(); // Returns all articles including the new one

// 4. Display on homepage
articles.forEach(article => {
    // Create article card...
});

// 5. Delete if needed
DB.articles.delete(articleId);

// 6. Export for backup
const backup = DB.export();
localStorage.setItem('backup_11_30_2025', JSON.stringify(backup));
```

---

## 🔒 Browser Storage Notes

**Advantages:**
✅ No server needed
✅ Works offline
✅ Instant updates
✅ Easy backup/export

**Limitations:**
⚠️ Only ~5-10MB storage
⚠️ Deleted when cache cleared
⚠️ Not synced across tabs
⚠️ Limited to current browser

**Production Upgrade Path:**
For production, consider:
1. Add Firebase (see firebase-setup.js)
2. Add backend API
3. Use cloud database (MongoDB, PostgreSQL)

---

## 🎓 What You've Learned

✅ Database design and structure  
✅ CRUD operations (Create, Read, Update, Delete)  
✅ Data persistence patterns  
✅ JSON data manipulation  
✅ localStorage API usage  
✅ Modular code organization  

---

## ❓ Common Questions

**Q: Will data be deleted?**
A: Only if browser cache is cleared or localStorage is manually cleared

**Q: Can I backup my data?**
A: Yes! Use `DB.export()` and save the JSON

**Q: Can I import data?**
A: Yes! Use `DB.import(jsonData)` to restore from backup

**Q: Can multiple people edit at same time?**
A: No, localStorage is per-browser. Use Firebase for multi-user editing

**Q: How do I migrate to Firebase?**
A: Follow steps in `firebase-setup.js`

---

## 🚀 Next Steps

1. **Test the system** - Add/edit/delete articles and see them sync
2. **Backup your data** - Export and save `DB.export()`
3. **Scale up** - Add more articles, blogs, categories
4. **Optimize** - Consider Firebase for production
5. **Extend** - Add comments, ratings, search

---

**Database Module Ready!** 📚✅

Your data is now safely organized and easily accessible across your entire platform!

