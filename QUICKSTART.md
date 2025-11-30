# Quick Start Guide - Wuroud Islamic Hub

## 🚀 Getting Started

### Step 1: Access the Application
Open these files in your browser:
- Homepage: `index.html`
- Login Page: `login.html`
- Articles: `articles.html`
- Blog: `blog.html`
- Admin Dashboard: `admin.html`

### Step 2: User Login Credentials

**Admin Account:**
- Username: `SEMEELKT`
- Password: `ADMIN`
- Access: Full admin dashboard with all features

**Regular Users:**
- Username: Any username
- Password: Any password
- Access: View articles and blogs only

### Step 3: What You Can Do

#### As Admin:
1. ✅ Add/Edit/Delete Articles
2. ✅ Add/Edit/Delete Blogs
3. ✅ Manage Users
4. ✅ Manage Categories
5. ✅ View Dashboard with Statistics

#### As Regular User:
1. ✅ View all articles
2. ✅ View all blogs
3. ✅ Browse categories
4. ✅ Read about us
5. ✅ Contact support
6. ✅ Toggle dark mode
7. ✅ Search articles

## 📊 Data Storage

**Currently Using:** Browser localStorage
- Data saved locally on your computer
- No internet required
- Data persists until browser cache is cleared
- No Firebase setup needed

**To Use Firebase:**
See `firebase-setup.js` for complete integration guide

## 🔐 Security Note

**Current Implementation:** Proof of concept
- Uses localStorage (browser storage)
- No password hashing
- For development/testing only

**For Production:**
- Add Firebase authentication
- Implement proper user authentication
- Use secure API endpoints
- Add HTTPS
- Implement proper authorization checks

## 📝 Example Workflow

### Add an Article as Admin:
```
1. Go to login.html
2. Enter: SEMEELKT / ADMIN
3. Click "Admin Dashboard"
4. Click "Articles" in sidebar
5. Click "Add New Article"
6. Fill in form:
   - Title: "Understanding Tawheed"
   - Category: "Aqeedah"
   - Author: "Islamic Scholar"
   - Content: "Detailed content here..."
7. Click "Save Article"
```

### View Article as User:
```
1. Go to index.html (home page)
2. Scroll to "Featured Articles"
3. Or click "Articles" in navigation
4. Your new article appears automatically!
```

### Add a Blog as Admin:
```
1. From admin dashboard, click "Blogs"
2. Click "Add New Blog"
3. Fill in form and save
4. Go to blog.html
5. Your blog appears in the list
```

## 🌙 Features

### Global Features:
- 🌓 Dark Mode Toggle
- 🔍 Search functionality
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations

### Page Features:

**Home (index.html):**
- Hero section
- Knowledge categories
- Featured articles
- Newsletter signup

**Articles (articles.html):**
- Displays all admin-added articles
- Filter by category
- View article details
- Search functionality

**Blog (blog.html):**
- Displays all admin-added blogs
- View blog posts
- Author information
- Date published

**Categories (categories.html):**
- Browse all knowledge categories
- Descriptions and icons
- Responsive grid layout

**About (about.html):**
- Mission and Vision
- Company values
- Features overview
- Team information

**Contact (contact.html):**
- Contact form
- Contact information
- Office hours
- Social media links

**Admin Dashboard (admin.html):**
- Statistics dashboard
- Article management
- Blog management
- User management
- Category management

## 🔄 Data Flow

```
Admin Panel → Add Article → Saved in localStorage → 
Displays on articles.html → Users can view
```

## 💾 Browser Storage

Data is stored in browser's localStorage under these keys:
- `articles` - All articles
- `blogs` - All blogs
- `users` - All registered users
- `categories` - All categories
- `user` - Current logged-in user

### Clear All Data:
To reset everything, open browser console and run:
```javascript
localStorage.clear();
```

## ⚙️ Customization

### Change Colors:
Edit `style.css` CSS variables:
```css
:root {
    --primary-green: #198754;
    --primary-gold: #FFD700;
    /* etc */
}
```

### Change Website Name:
Find and replace "Wuroud Islamic Hub" with your name in all HTML files

### Add Social Media Links:
Edit footer links in any HTML file (look for social media icons)

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Admin login fails | Check username is "SEMEELKT" (case-sensitive) |
| Articles don't show | Refresh page, check localStorage in dev tools |
| Data disappeared | Browser cache was cleared, data lost (use Firebase to prevent) |
| Page looks broken | Clear browser cache and refresh |
| Images not loading | Using gradient backgrounds instead, no external images needed |

## 📞 Support

Check browser console (F12) for any error messages that can help troubleshoot issues.

## 🚀 Next Steps

1. **Customize:** Change colors, text, and branding
2. **Add Content:** Use admin panel to add articles and blogs
3. **Firebase:** When ready, follow `firebase-setup.js` guide
4. **Deploy:** Upload files to web hosting
5. **Promote:** Share your Islamic knowledge platform!

---

Happy Contributing! Share authentic Islamic knowledge with the world! 🌍📚
