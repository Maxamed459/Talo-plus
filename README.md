# Talo +

Welcome to **Talo +**!

## 📋 Table of Contents

- [High-Level Overview](#high-level-overview)
- [Architecture Breakdown](#architecture-breakdown)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works-step-by-step)
- [Important Features](#important-features)
- [API/Backend Flow](#api-backend-flow)
- [Frontend Flow](#frontend-flow)
- [Deployment Details](#deployment-details)
- [Getting Started](#getting-started)
- [Potential Improvements](#potential-improvements)

---

## 🎯 High-Level Overview

**Talo+** is a full-stack healthcare Q&A platform inspired by StackOverflow, specifically designed for medical questions and answers. It allows users to post medical questions about symptoms or health concerns, and receive answers from medical professionals like doctors, nurses, medical students, pharmacists, and coaches.

### Problem It Solves

- Provides a centralized platform for health-related questions
- Connects users with verified medical professionals
- Creates a community-driven knowledge base for healthcare information
- Enables role-based interactions between patients and healthcare providers

---

## 🏗️ Architecture Breakdown

### Folder Structure

```
Talo +
├── backend/                    # Node.js/Express API server
│   ├── config/                # Configuration files
│   │   ├── config.js          # Environment variables
│   │   └── db.js              # MongoDB connection
│   ├── controllers/           # Business logic handlers
│   │   ├── userController.js  # Auth & user management
│   │   ├── postController.js  # Question CRUD operations
│   │   └── answerController.js # Answer creation & retrieval
│   ├── middlewares/           # Request interceptors
│   │   └── authenticate.js    # JWT authentication
│   ├── models/                # Mongoose schemas
│   │   ├── User.js            # User model
│   │   ├── Questions.js       # Question model
│   │   └── Answers.js         # Answer model
│   ├── routes/                # API route definitions
│   │   ├── userRoutes.js
│   │   ├── postRouter.js
│   │   └── answerRouter.js
│   ├── lib/                   # Utility functions
│   │   └── generateToken.js   # JWT token generation
│   ├── server.js              # Express app entry point
│   └── vercel.json            # Vercel deployment config
│
└── frontend/                   # Next.js 15 React application
    ├── app/                    # Next.js App Router
    │   ├── (auth)/            # Authentication routes group
    │   │   ├── login/         # Login page
    │   │   └── register/      # Registration page
    │   ├── (dashboard)/       # Protected dashboard routes
    │   │   ├── dashboard/     # Main dashboard pages
    │   │   │   ├── page.tsx   # Questions feed
    │   │   │   ├── [id]/      # Individual question view
    │   │   │   ├── post/      # Create question page
    │   │   │   ├── questions/ # User's questions
    │   │   │   ├── profile/   # User profile
    │   │   │   └── discover/  # Discover page
    │   │   └── _components/   # Dashboard components
    │   ├── (root)/            # Public routes
    │   │   └── page.tsx       # Landing page
    │   ├── context/           # React Context providers
    │   │   └── AuthContext.tsx # Authentication state
    │   └── lib/               # Frontend utilities
    ├── components/            # Reusable UI components
    │   └── ui/                # shadcn/ui components
    ├── action/                # Server actions
    │   └── post.ts            # Question submission action
    └── public/                # Static assets
```

### Component Interaction Flow

```
User Request → Frontend (Next.js)
    ↓
AuthContext (checks auth state)
    ↓
API Call (Axios with credentials)
    ↓
Backend Express Server
    ↓
Authentication Middleware (JWT verification)
    ↓
Controller (business logic)
    ↓
Mongoose Model (database operations)
    ↓
MongoDB Database
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose | Why Used |
|------------|---------|----------|
| **Node.js** | Runtime environment | JavaScript ecosystem, async I/O |
| **Express.js 5.1** | Web framework | RESTful APIs, middleware support |
| **MongoDB** | Database | Document model, flexible schema |
| **Mongoose 8.17** | ODM | Schema validation, relationships |
| **JWT (jsonwebtoken)** | Authentication | Stateless, secure tokens |
| **bcryptjs** | Password hashing | Secure password storage |
| **Google Auth Library** | OAuth integration | Social login |
| **cookie-parser** | Cookie handling | HttpOnly cookies for tokens |
| **CORS** | Cross-origin requests | Frontend-backend communication |
| **validator** | Input validation | Email/password validation |

### Frontend

| Technology | Purpose | Why Used |
|------------|---------|----------|
| **Next.js 15.4** | React framework | SSR, routing, optimization |
| **React 19.1** | UI library | Component-based UI |
| **TypeScript 5** | Type safety | Type checking, better DX |
| **Tailwind CSS 4** | Styling | Utility-first CSS |
| **Axios** | HTTP client | API requests with interceptors |
| **Radix UI** | Component primitives | Accessible, unstyled components |
| **Lucide React** | Icons | Icon library |
| **js-cookie** | Cookie management | Client-side cookie handling |

---

## 🔄 How It Works Step-by-Step

### User Registration Flow

1. User fills registration form (`/register`)
2. Frontend sends POST to `/api/user/signUp`
3. Backend validates email/username uniqueness
4. Password is hashed with bcrypt (pre-save hook)
5. User document created in MongoDB
6. JWT token generated (7-day expiry)
7. Token stored in HttpOnly cookie
8. User data stored in localStorage
9. Redirect to `/dashboard`

### User Login Flow

1. User submits credentials (`/login`)
2. POST to `/api/user/signIn`
3. Backend finds user by email
4. Password compared with bcrypt
5. JWT token generated and set in cookie
6. User data returned and stored
7. Redirect to `/dashboard`

### Posting a Question Flow

1. User navigates to `/dashboard/post`
2. Form submission triggers server action (`action/post.ts`)
3. Client-side validation (title, description, tags)
4. POST to `/api/post/create-post` with JWT cookie
5. `authenticate` middleware verifies token
6. Controller creates Question document
7. Question linked to author (User reference)
8. Success response → redirect/refresh

### Viewing Questions Flow

1. Dashboard loads (`/dashboard`)
2. `AllQuestions` component fetches from `/api/post/questions`
3. Backend applies pagination, search, filtering
4. Questions populated with author info
5. Rendered with tags, answer count, timestamps
6. Infinite scroll loads more pages

### Answering a Question Flow

1. User clicks question → `/dashboard/[id]`
2. Page fetches question details and existing answers
3. User types answer in `PostAnswer` component
4. POST to `/api/answer/create-answer`
5. Answer document created with question reference
6. Answer ID added to question's answers array
7. New answer appears in list (optimistic update)

---

## ✨ Important Features

### Authentication & Authorization
- ✅ JWT-based authentication with HttpOnly cookies
- ✅ Password hashing with bcrypt
- ✅ Google OAuth integration
- ✅ Role-based user system (user, medical_student, nurse, doctor, pharmacist, coach, admin)
- ✅ Protected routes via authentication middleware

### Question Management
- ✅ Create questions with title, description, and tags
- ✅ Edit/delete own questions
- ✅ Search by title/description
- ✅ Filter by tags
- ✅ Sort by newest/oldest
- ✅ Pagination (20 per page, infinite scroll)

### Answer System
- ✅ Post answers to questions
- ✅ View all answers for a question
- ✅ Answers linked to authors with role display
- ✅ Chronological ordering

### User Experience
- ✅ Responsive design (mobile/desktop)
- ✅ Loading states and error handling
- ✅ Real-time answer updates
- ✅ User profile display (avatar, username, role)
- ✅ Sidebar navigation

---

## 🔌 API/Backend Flow

### API Routes Structure

```
/api/user/
  POST /signUp          → Create new user account
  POST /signIn          → Login user
  POST /logout          → Clear auth cookie
  POST /googleSignIn    → OAuth Google login

/api/post/
  POST /create-post           → Create question (authenticated)
  GET  /questions            → Get all questions (paginated, searchable)
  GET  /get-post/:id         → Get single question
  GET  /get-user-posts       → Get current user's questions
  PUT  /update-post/:id      → Update question (author only)
  DELETE /delete-post/:id    → Delete question (author only)

/api/answer/
  POST /create-answer        → Create answer (authenticated)
  GET  /get-answers/:id      → Get answers for a question
```

### Database Models

**User Schema:**
```javascript
{
  fullname: String (required)
  username: String (required, unique, lowercase)
  email: String (required, unique, validated)
  password: String (required, hashed, select: false)
  profilePic: String (default: "")
  role: Enum [user, medical_student, nurse, doctor, pharmacist, coach, admin]
  timestamps: true
}
```

**Question Schema:**
```javascript
{
  title: String (required)
  description: String (required)
  tags: [String]
  author: ObjectId → User (required)
  answers: [ObjectId] → Answer
  timestamps: true
}
```

**Answer Schema:**
```javascript
{
  content: String (required)
  author: ObjectId → User (required)
  question: ObjectId → Question (required)
  timestamps: true
}
```

### Authentication Flow

1. **Token Extraction**: Checks cookies first, falls back to Authorization header
2. **JWT Verification**: Validates token with secret key
3. **User Attachment**: Attaches user ID to `req.user`
4. **Route Protection**: Protected routes check `req.user.id`

---

## 🎨 Frontend Flow

### Routing Structure (Next.js App Router)

```
/ (root)
  └── Landing page

/login (auth group)
  └── Login form → AuthContext.login()

/register (auth group)
  └── Registration form → AuthContext.registerUser()

/dashboard (dashboard group, protected)
  ├── /dashboard (page.tsx)
  │   └── AllQuestions component
  ├── /dashboard/[id] (dynamic)
  │   └── Question detail + answers
  ├── /dashboard/post
  │   └── Create question form
  ├── /dashboard/questions
  │   └── User's own questions
  ├── /dashboard/profile
  │   └── User profile page
  └── /dashboard/discover
      └── Discover page
```

### State Management

- **AuthContext**: Global authentication state (user, login, logout)
- **Local State**: Component-level state (posts, answers, loading, errors)
- **localStorage**: Persists user data across sessions
- **Server State**: Fetched via Axios (no global cache library)

### Component Hierarchy

```
DashboardLayout
  └── AuthProvider
      └── DashboardShell
          ├── Sidebar (navigation)
          └── {children}
              ├── AllQuestions (feed)
              ├── QuestionDetail ([id])
              ├── PostQuestion (post)
              └── ...
```

---

## 🚀 Deployment Details

### Backend Deployment (Vercel)

- `vercel.json` configures serverless function
- Entry point: `server.js` exported as default
- Environment variables required:
  - `MONGO_URL` - MongoDB connection string
  - `JWT_SECRET` - Secret key for JWT tokens
  - `GOOGLE_CLIENT_ID` - Google OAuth client ID
  - `PORT` - Server port
  - `NODE_ENV` - Environment (production/development)
- CORS configured for production URL: `https://talo-plus.vercel.app`

### Frontend Deployment (Vercel)

- Next.js build: `npm run build`
- Static assets optimized automatically
- Environment variable: `NEXT_PUBLIC_BACKEND_URL`

### Database

- MongoDB (likely MongoDB Atlas)
- Connection string stored in `MONGO_URL` environment variable

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/talo-plus.git
   cd talo-plus
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NODE_ENV=development
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

### Running the Project

1. **Start Backend Server:**
   ```bash
   cd backend
   npm run server  # Uses nodemon for auto-reload
   # or
   npm start      # Production mode
   ```

2. **Start Frontend Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 🔮 Potential Improvements

### Security Enhancements
- [ ] Rate limiting (express-rate-limit)
- [ ] Input sanitization (express-validator)
- [ ] CSRF protection
- [ ] Password reset flow
- [ ] Email verification
- [ ] Stronger password requirements

### Performance Optimizations
- [ ] Redis caching for frequent queries
- [ ] Database indexing (username, email, question tags)
- [ ] Image optimization/upload for profile pictures
- [ ] React Query/SWR for server state management
- [ ] Lazy loading for components

### Feature Additions
- [ ] Upvote/downvote answers
- [ ] Mark best answer
- [ ] Notification system
- [ ] User reputation/points system
- [ ] Rich text editor (Markdown support)
- [ ] File attachments
- [ ] Question categories
- [ ] Follow users
- [ ] Bookmark questions

### Code Quality
- [ ] Error handling middleware
- [ ] Request validation middleware
- [ ] API response standardization
- [ ] Unit/integration tests (Jest)
- [ ] E2E tests (Playwright/Cypress)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] TypeScript for backend
- [ ] ESLint/Prettier configuration

### UX Improvements
- [ ] Loading skeletons
- [ ] Optimistic updates
- [ ] Toast notifications
- [ ] Search autocomplete
- [ ] Tag suggestions
- [ ] Answer editing/deletion
- [ ] Question status (solved/open)
- [ ] Dark mode

### Architecture Improvements
- [ ] Separate API and frontend repositories
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Environment-specific configurations
- [ ] Logging (Winston/Pino)
- [ ] Monitoring (Sentry)
- [ ] Database migrations

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please open an issue on GitHub.
