# MERN To-Do App - Complete Setup Guide

## Quick Start

### 1. Backend Setup (5 minutes)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm run dev      # Start with nodemon for development
```

### 2. Frontend Setup (5 minutes)

```bash
cd frontend
npm install
cp .env.example .env
npm start        # Opens http://localhost:3000
```

✅ **Done!** Application is now running.

---

## Detailed Setup Instructions

### Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org))
- **MongoDB** (local or [Atlas cloud](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com))

### Backend Setup

#### Step 1: Navigate to Backend

```bash
cd backend
```

#### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `express-validator` - Input validation
- `nodemon` - Auto-reload (dev only)

#### Step 3: Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**MongoDB Connection String Examples:**

- **Local MongoDB:**
  ```
  mongodb://localhost:27017/todo-app
  ```

- **MongoDB Atlas (Cloud):**
  ```
  mongodb+srv://username:password@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
  ```

#### Step 4: Ensure MongoDB is Running

**Local MongoDB:**
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
npm run dev
```

**MongoDB Atlas:** Just ensure internet connection

#### Step 5: Start Backend Server

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost
```

✅ Backend is ready at `http://localhost:5000`

---

### Frontend Setup

#### Step 1: Navigate to Frontend

```bash
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP requests
- `react-scripts` - Build tools
- `tailwindcss` - Utility-first CSS
- `postcss` & `autoprefixer` - CSS processing

#### Step 3: Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default configuration (usually no changes needed):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

If backend runs on different port, update accordingly:
```env
REACT_APP_API_URL=http://localhost:YOUR_PORT/api
```

#### Step 4: Start Frontend Server

```bash
npm start
```

**Expected Output:**
```
Compiled successfully!
Local:            http://localhost:3000
```

Browser opens automatically to `http://localhost:3000`

✅ Frontend is ready!

---

## Using the Application

### 1. Register Account

1. Navigate to `http://localhost:3000/register`
2. Fill in:
   - **Full Name:** Your name (min. 2 characters)
   - **Email:** Valid email
   - **Password:** Min. 6 characters
   - **Confirm Password:** Must match password
3. Click **"Register"**
4. Redirects to Dashboard automatically

### 2. Login

1. Navigate to `http://localhost:3000/login`
2. Enter email and password
3. Click **"Login"**

### 3. Dashboard Features

#### Add Task
- Type task in input field
- Click **"Add Task"**
- Task appears at top of list

#### Mark Complete
- Check checkbox next to task
- Task shows as completed (grayed out, strikethrough)

#### Edit Task
- Click **"Edit"** button
- Modify task title in edit input
- Click **"Save"** to confirm or **"Cancel"**

#### Delete Task
- Click **"Delete"** button
- Confirm deletion dialog
- Task is removed

#### Filter Tasks
Use filter buttons at top:
- **All** - All tasks
- **Pending** - Uncompleted tasks
- **Completed** - Completed tasks

#### Statistics
- **Total Tasks** - All tasks count
- **Completed** - Completed tasks count
- **Pending** - Pending tasks count

#### Logout
- Click **"Logout"** button in header
- Redirects to login page

---

## Project Files Overview

### Backend Files

**Configuration:**
- `package.json` - Dependencies and scripts
- `.env.example` - Environment template
- `.gitignore` - Files to ignore in git
- `server.js` - Express app entry point

**Database:**
- `config/database.js` - MongoDB connection

**Models:**
- `models/User.js` - User schema (name, email, password)
- `models/Task.js` - Task schema (title, completed, user reference)

**Controllers:**
- `controllers/authController.js` - Register, Login, Get User
- `controllers/taskController.js` - Task CRUD operations

**Routes:**
- `routes/authRoutes.js` - Auth endpoints
- `routes/taskRoutes.js` - Task endpoints (protected)

**Middleware:**
- `middleware/authMiddleware.js` - JWT verification
- `middleware/tokenGenerator.js` - JWT creation

### Frontend Files

**Configuration:**
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS plugins
- `.env.example` - Environment template
- `.gitignore` - Files to ignore in git

**Components:**
- `src/components/Header.jsx` - Navigation header
- `src/components/TaskForm.jsx` - Add task form
- `src/components/TaskItem.jsx` - Single task component
- `src/components/TaskList.jsx` - Task list container
- `src/components/ProtectedRoute.jsx` - Route protection

**Pages:**
- `src/pages/RegisterPage.jsx` - User registration
- `src/pages/LoginPage.jsx` - User login
- `src/pages/DashboardPage.jsx` - Main dashboard

**Services:**
- `src/services/api.js` - Axios configuration (token injection)
- `src/services/auth.js` - API call functions

**Styling:**
- `src/styles/index.css` - Tailwind directives + global styles

**Entry:**
- `src/App.jsx` - Main app component
- `src/index.js` - React entry point
- `public/index.html` - HTML template

---

## API Documentation

### Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-domain.com/api`

### Authentication Endpoints

#### POST `/auth/register`
Register new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/auth/login`
Login user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET `/auth/me`
Get current user (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints (All Protected - Require JWT Token)

#### POST `/tasks`
Create task

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Buy groceries"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task added successfully",
  "task": {
    "_id": "60d5ec49c1234567890abcde",
    "title": "Buy groceries",
    "completed": false,
    "user": "60d5ec49c1234567890abcde",
    "createdAt": "2024-04-14T10:30:00.000Z",
    "updatedAt": "2024-04-14T10:30:00.000Z"
  }
}
```

#### GET `/tasks`
Get all user's tasks

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `filter` - "completed" or "pending" (optional)

**Example:**
```
GET /tasks?filter=pending
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "tasks": [
    {
      "_id": "60d5ec49c1234567890abcde",
      "title": "Buy groceries",
      "completed": false,
      "user": "60d5ec49c1234567890abcde",
      "createdAt": "2024-04-14T10:30:00.000Z",
      "updatedAt": "2024-04-14T10:30:00.000Z"
    }
  ]
}
```

#### PUT `/tasks/:id`
Update task

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Buy groceries and cook dinner",
  "completed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "60d5ec49c1234567890abcde",
    "title": "Buy groceries and cook dinner",
    "completed": true,
    "user": "60d5ec49c1234567890abcde",
    "createdAt": "2024-04-14T10:30:00.000Z",
    "updatedAt": "2024-04-14T11:45:00.000Z"
  }
}
```

#### DELETE `/tasks/:id`
Delete task

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Troubleshooting

### Backend Issues

**Issue:** `Cannot connect to MongoDB`
```
Solution: Ensure MongoDB is running
# Start MongoDB
mongod
```

**Issue:** `Port 5000 already in use`
```
Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

Mac/Linux:
lsof -ti :5000 | xargs kill -9
```

**Issue:** `JWT_SECRET is undefined`
```
Solution: Set JWT_SECRET in .env file
JWT_SECRET=your_secret_key
```

### Frontend Issues

**Issue:** `Cannot GET /api/tasks` (CORS error)
```
Solution:
1. Ensure backend is running on port 5000
2. Check REACT_APP_API_URL in .env
3. Clear browser cache: Ctrl+Shift+Delete
```

**Issue:** `Port 3000 already in use`
```
Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

Mac/Linux:
lsof -ti :3000 | xargs kill -9
```

**Issue:** `localStorage is null`
```
Solution: Clear browser storage
# In browser console:
localStorage.clear();
sessionStorage.clear();
# Then reload page
```

**Issue:** `Login not working after registration`
```
Solution: 
1. Check backend logs for errors
2. Ensure MongoDB has the data
3. Clear browser localStorage
4. Try logging in again
```

### Common Solutions

**Clear Everything Fresh Start:**
```bash
# Backend
cd backend
rm node_modules package-lock.json
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm node_modules package-lock.json
npm install
npm start
```

**Clear Browser Cache:**
- Press `F12` to open DevTools
- Settings (gear icon) → Network → Disable cache → Reload page
- Or: `Ctrl+Shift+Delete` → Clear all data

---

## Development Workflow

### Terminal Setup

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm start

# Terminal 3: Optional - MongoDB
mongod
```

### Making Changes

**Backend:**
1. Edit files in `backend/`
2. Server auto-reloads with nodemon
3. Test with API client or frontend

**Frontend:**
1. Edit files in `frontend/src/`
2. Browser auto-refreshes
3. Check console for errors (F12)

### Testing Workflow

1. Register new account
2. Add multiple tasks
3. Test all CRUD operations
4. Test filtering
5. Logout and login
6. Verify tasks persist

---

## Performance Tips

1. **Disable Console Logs in Production:**
   ```javascript
   // frontend/.env
   REACT_APP_DEBUG=false
   ```

2. **Use Production Build:**
   ```bash
   npm run build  # Creates optimized build
   ```

3. **Enable MongoDB Indexing:**
   ```javascript
   // backend/models/Task.js
   userSchema.index({ user: 1 });
   ```

4. **Cache API Responses:**
   Already implemented in frontend services with axios interceptors

---

## Security Checklist

✅ Passwords hashed with bcrypt
✅ JWT tokens for authentication
✅ Protected API routes
✅ Input validation (frontend & backend)
✅ CORS enabled appropriately
✅ Environment variables for secrets
✅ Password confirmation on register
✅ Token stored in localStorage

**Additional Production Steps:**
- [ ] Use HTTPS everywhere
- [ ] Set strong JWT_SECRET
- [ ] Enable CORS only for your domain
- [ ] Use MongoDB Atlas (not local)
- [ ] Add rate limiting
- [ ] Enable logging/monitoring
- [ ] Add password reset functionality
- [ ] Add email verification

---

## Next Steps / Enhancement Ideas

1. **Password Reset** - Email-based recovery
2. **Task Categories** - Organize by category
3. **Due Dates** - Set task deadlines
4. **Reminders** - Email/notification reminders
5. **Sharing** - Share tasks with others
6. **Dark Mode** - Theme toggle
7. **Mobile App** - React Native
8. **Search** - Search tasks
9. **Sorting** - Sort by date, priority
10. **Recurring Tasks** - Daily/Weekly tasks

---

## Deployment

### Deploy Backend (Heroku)
```bash
cd backend
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Deploy Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

---

**Happy Coding! 🚀**

For more help, check README.md or create an issue in the repository.
