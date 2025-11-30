# 🗄️ Database System - Quick Reference

## What Is This?

**database.js** is a complete data management system that stores all your Islamic Hub data in browser storage. Everything you add (articles, blogs, users, categories) is automatically saved and available everywhere.

---

## 🚀 How It Works

```
You add article in Admin Panel
        ↓
Saved to database.js
        ↓
Automatically appears on articles.html
        ↓
Also shows on homepage featured section
        ↓
All pages can access the same data
```

**No server needed. No setup required. Works immediately!**

---

## 📚 All HTML Pages Include database.js

✅ index.html  
✅ articles.html  
✅ blog.html  
✅ admin.html  
✅ categories.html  
✅ about.html  
✅ contact.html  
✅ login.html  
✅ privacy.html  
✅ disclaimer.html  

---

## 💡 Key Improvements Over Previous System

**Before:**
- Used raw localStorage calls everywhere
- Repetitive code in multiple files
- Harder to modify data structure
- No built-in search or filtering

**Now (with database.js):**
✅ All data access through `DB` object  
✅ Clean, consistent API  
✅ Easy search, filter, sort functions  
✅ Sample data included automatically  
✅ Built-in export/import for backups  
✅ Better error handling  
✅ One place to maintain all database logic  

---

## 📖 Simple Usage Examples

### Add Article (in admin.html):
```javascript
DB.articles.add({
    title: "My Article",
    category: "Aqeedah",
    author: "Scholar Name",
    content: "Article content..."
});
```

### Get All Articles (in main.js):
```javascript
const articles = DB.articles.get();
```

### Delete Article:
```javascript
DB.articles.delete(articleId);
```

### Search Articles:
```javascript
const results = DB.articles.search("tawheed");
```

### Get Database Stats:
```javascript
const stats = DB.getStats();
console.log(stats.totalArticles); // Show number of articles
```

---

## 🎯 What Gets Saved

### Articles
- Title, Category, Author, Content, Date, Image (optional)
- Searchable and filterable
- Can view all on articles.html

### Blogs
- Title, Author, Content, Date, Category
- Displays on blog.html
- Track likes and views

### Users
- Username, Email, Role, Join Date, Status
- For user management in admin panel

### Categories
- Name, Description, Icon
- Used to organize articles
- 7 default categories included

---

## ✨ Automatic Features

✅ **Auto-initialization** - Runs automatically on page load  
✅ **Sample data** - Includes default articles and blogs  
✅ **Timestamps** - All dates added automatically  
✅ **Unique IDs** - Each item gets unique identifier  
✅ **Console logging** - See what's happening in browser console  

---

## 🧪 Test It Now

1. **Open browser console** (F12)
2. **Type these commands:**

```javascript
// See database stats
DB.getStats()

// Add test article
DB.articles.add({title: "Test", category: "General", author: "Tester", content: "Test content"})

// Get all articles
DB.articles.get()

// Search
DB.articles.search("test")
```

3. **Go to articles.html**
4. **Your test article appears!** ✅

---

## 📁 File Structure

```
database.js (428 lines)
├── DB.articles
│   ├── get() - Get all articles
│   ├── add() - Add new article
│   ├── delete() - Delete article
│   ├── update() - Update article
│   ├── findById() - Find specific article
│   ├── search() - Search articles
│   ├── filterByCategory() - Filter by category
│   ├── getFeatured() - Get first N articles
│   └── getDefault() - Sample articles
│
├── DB.blogs
│   ├── get()
│   ├── add()
│   ├── delete()
│   ├── update()
│   ├── findById()
│   └── getDefault()
│
├── DB.categories
│   ├── get()
│   ├── add()
│   ├── delete()
│   └── getDefault()
│
├── DB.users
│   ├── get()
│   ├── add()
│   ├── delete()
│   ├── findByUsername()
│   └── getDefault()
│
└── Utilities
    ├── init() - Initialize database
    ├── export() - Export all data
    ├── import() - Import data
    ├── getStats() - Get database info
    ├── clearAll() - Delete all data
    └── resetToDefaults() - Reset to sample data
```

---

## 🔄 Data Flow

```
Admin Panel (admin.html)
   ↓
   Uses DB.articles.add(), DB.blogs.add(), etc.
   ↓
   Data saved to localStorage via database.js
   ↓
   ├─→ main.js calls DB.articles.get() for homepage
   ├─→ articles.html calls DB.articles.get() for article list
   ├─→ blog.html calls DB.blogs.get() for blog list
   └─→ categories.html calls DB.categories.get()
   ↓
User Pages Display Data Dynamically ✅
```

---

## 💾 Where Is Data Stored?

**Location:** Browser's localStorage (on your computer)  
**Size:** ~5-10MB available  
**Access:** Only from same domain/local file  
**Persistence:** Until browser cache is cleared  
**Backup:** Use `DB.export()` to create backup JSON  

---

## ⚙️ Configuration

**Data is stored with these localStorage keys:**
- `articles` - All articles
- `blogs` - All blogs
- `categories` - All categories
- `users` - All users
- `theme` - Dark/light mode preference
- `user` - Current logged-in user

---

## 🎓 Functions Cheat Sheet

```javascript
// ARTICLES
DB.articles.get()                           // Get all
DB.articles.add({...})                      // Add new
DB.articles.delete(id)                      // Delete
DB.articles.update(id, {...})               // Update
DB.articles.findById(id)                    // Find one
DB.articles.search("keyword")               // Search
DB.articles.filterByCategory("Aqeedah")     // Filter
DB.articles.getFeatured(3)                  // Get first 3

// BLOGS
DB.blogs.get()                              // Get all
DB.blogs.add({...})                         // Add new
DB.blogs.delete(id)                         // Delete
DB.blogs.findById(id)                       // Find one

// CATEGORIES
DB.categories.get()                         // Get all
DB.categories.add({...})                    // Add new
DB.categories.delete(id)                    // Delete

// USERS
DB.users.get()                              // Get all
DB.users.add({...})                         // Add new
DB.users.delete(id)                         // Delete
DB.users.findByUsername("name")             // Find user

// UTILITIES
DB.init()                                   // Initialize
DB.export()                                 // Export to JSON
DB.import({...})                            // Import from JSON
DB.getStats()                               // Get statistics
DB.clearAll()                               // Clear all data
DB.resetToDefaults()                        // Reset to samples
```

---

## 📊 Data Counts

**Sample data included:**
- 3 articles
- 1 blog
- 7 categories
- 1 user (SEMEELKT admin)

**You can add unlimited more!**

---

## 🔐 Admin Credentials

```
Username: SEMEELKT
Password: ADMIN
```

**Once logged in:**
1. Click "Admin Dashboard"
2. Add articles, blogs, users, categories
3. Data automatically saved and displayed everywhere

---

## ✅ Checklist

- [x] database.js created (428 lines)
- [x] All HTML files include database.js
- [x] main.js uses DB.articles.get() and DB.blogs.get()
- [x] admin.html uses DB functions for CRUD
- [x] Sample data included
- [x] Auto-initialization on page load
- [x] Export/import functionality
- [x] Statistics available
- [x] Documentation complete

---

## 🚀 Next Steps

1. **Login as admin** (SEMEELKT/ADMIN)
2. **Add an article** in Admin Dashboard
3. **Go to articles.html**
4. **Your article is there!** ✨
5. **Add a blog**
6. **Go to blog.html**
7. **Blog appears!** ✨

---

## 🎉 You Now Have!

✅ Fully functional database system  
✅ All data automatically saved  
✅ Real-time sync across pages  
✅ Easy CRUD operations  
✅ Search and filter capabilities  
✅ Backup/restore features  
✅ Sample data to get started  

**Your Wuroud Islamic Hub is ready to store Islamic knowledge!** 📚🕌

---

For detailed documentation, see: **DATABASE-GUIDE.md**
