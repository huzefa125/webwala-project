# MERN Full Stack To-Do Application

A production-ready full-stack to-do application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, task management, and a responsive UI with Tailwind CSS.

## Features

- ✅ User Authentication (Register/Login) with JWT
- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Mark tasks as complete/pending
- ✅ Filter tasks by status (All, Completed, Pending)
- ✅ Edit task titles
- ✅ Responsive design with Tailwind CSS
- ✅ Protected routes and user-specific task isolation
- ✅ Input validation on both frontend and backend
- ✅ Error handling with user-friendly messages
- ✅ Loading states throughout the application

## Project Structure

```
full-stack-todo/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Database configuration
│   │   └── database.js
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/             # API endpoints
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/         # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── tokenGenerator.js
│   ├── server.js           # Express app setup
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── frontend/               # React frontend
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── components/     # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskItem.jsx
    │   │   ├── TaskList.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/          # Page components
    │   │   ├── RegisterPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── DashboardPage.jsx
    │   ├── services/       # API clients
    │   │   ├── api.js      # Axios instance
    │   │   └── auth.js     # API calls
    │   ├── styles/
    │   │   └── index.css   # Tailwind + global styles
    │   ├── App.jsx
    │   └── index.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    ├── .env.example
    └── .gitignore
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud database)

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important Notes:**
- Replace `MONGODB_URI` with your MongoDB connection string
  - For local MongoDB: `mongodb://localhost:27017/todo-app`
  - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/todo-app?retryWrites=true&w=majority`
- Change `JWT_SECRET` to a strong, random string in production
- Ensure MongoDB is running before starting the backend

### 4. Start Backend Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The backend will start on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

The default API URL is already set:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Adjust if your backend runs on a different port.

### 4. Start Frontend Development Server

```bash
npm start
```

The frontend will open in your browser at `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (requires auth) |

### Task Endpoints (All require JWT authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks for user |
| GET | `/api/tasks?filter=completed` | Get completed tasks |
| GET | `/api/tasks?filter=pending` | Get pending tasks |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
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

### Add Task

**Request:**
```json
POST /api/tasks
Headers: Authorization: Bearer <token>
{
  "title": "Buy groceries"
}
```

**Response:**
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

## Testing the Application

### 1. Register a New User

- Go to `http://localhost:3000/register`
- Fill in name, email, and password
- Click "Register"

### 2. Login

- Go to `http://localhost:3000/login`
- Enter email and password
- Click "Login"

### 3. Dashboard

- View your tasks
- Add a new task using the input field
- Mark tasks as complete/pending using the checkbox
- Edit tasks by clicking "Edit"
- Delete tasks by clicking "Delete"
- Filter tasks using the filter buttons (All, Pending, Completed)

## Development Tips

### Clear Browser Cache (if needed)

If you encounter issues, clear localStorage and try again:

```javascript
// Open browser console and run:
localStorage.clear();
```

### Check Network Requests

Use browser DevTools (F12) → Network tab to inspect API requests and responses.

### MongoDB Shell Commands

```bash
# Connect to MongoDB
mongo

# List all databases
show dbs

# Use todo-app database
use todo-app

# View users
db.users.find()

# View tasks
db.tasks.find()
```

## Backend Environment Variables Explained

| Variable | Description |
|----------|-------------|
| `PORT` | Port on which backend server runs (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRE` | JWT token expiration time (e.g., "7d", "24h") |
| `NODE_ENV` | Environment (development, production, etc.) |

## Frontend Environment Variables Explained

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Base URL for backend API |

## Common Issues & Solutions

### Issue: "Cannot GET /api/tasks"

**Solution:** Ensure backend is running on port 5000 and MongoDB is connected.

### Issue: "Invalid token" error

**Solution:** Clear localStorage and login again:
```javascript
localStorage.clear();
```

### Issue: "CORS error"

**Solution:** Backend has CORS enabled for localhost:3000. Update backend `server.js` if frontend runs on different port:

```javascript
app.use(cors({
  origin: 'http://your-frontend-url:port',
  credentials: true
}));
```

### Issue: MongoDB connection refused

**Solution:**
- Check if MongoDB is running
- For local: `mongod` should be running
- For MongoDB Atlas: Check connection string and network access

### Issue: Port already in use

**Solution:**
```bash
# Windows - Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti :5000 | xargs kill -9
```

## Production Deployment Guide

### Backend Deployment (Heroku Example)

1. Create Heroku account and install CLI
2. In `backend` directory:
   ```bash
   heroku create your-app-name
   heroku config:set JWT_SECRET=your_production_secret
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   git push heroku main
   ```

### Frontend Deployment (Vercel Example)

1. Create Vercel account
2. In `frontend` directory:
   ```bash
   npm run build
   vercel --prod
   ```

## Best Practices Implemented

✅ **Security:**
- Password hashing with bcrypt
- JWT token-based authentication
- Protected API endpoints
- Input validation on both frontend and backend

✅ **Code Quality:**
- MVC architecture
- Reusable components
- Separation of concerns
- Error handling
- Loading states

✅ **Performance:**
- Lazy loading
- Efficient state management
- Optimized re-renders
- Responsive design

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken
- **Frontend:** React.js, React Router, Axios
- **Styling:** Tailwind CSS
- **Tools:** Nodemon (development), npm

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

---

**Happy coding! 🚀**
#   w e b w a l a - p r o j e c t  
 