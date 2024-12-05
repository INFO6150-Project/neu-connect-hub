# NEU Connect Hub

NEU Connect Hub is a professional networking platform built for Northeastern University developers. Built with the MERN stack, the platform enables developers to create profiles, share posts, and connect with other developers while providing comprehensive admin management capabilities.

## Features

### For Users
- **Authentication**
  - User registration and login with JWT
  - Secure password management
  - Gravatar integration for profile pictures

- **Profile Management**
  - Create and customize developer profiles
  - Add professional experiences and education
  - Showcase skills and expertise
  - GitHub repository integration
  - Social media links integration

- **Posts and Interactions**
  - Create and share posts
  - Like/unlike posts
  - Comment on posts
  - View posts feed
  - Delete own posts and comments

### For Admins
- **Secure Admin Panel**
  - Separate admin authentication
  - User management dashboard
  - Edit user details
  - Delete user accounts
  - Search and filter users

### Technical Features
- Modern, responsive dark-themed UI
- Glassmorphism design elements
- Real-time form validation
- Secure API endpoints
- Token-based authentication
- Database persistence
- State management with Redux

## Technology Stack

### Frontend
- React.js (v18.3.1)
- Redux & Redux Toolkit
- React Router DOM (v7.0.1)
- Axios for API calls
- Modern CSS with responsive design
- PropTypes for type checking

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator
- Gravatar integration
- CORS enabled

## Installation

### Prerequisites
```bash
Node.js >= 14.x
MongoDB
Git
```

### Environment Setup
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GITHUB_TOKEN=your_github_api_token
PORT=5001
NODE_ENV=development
```

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/INFO6150-Project/neu-connect-hub.git
cd neu-connect-hub
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Run the development servers:

For backend only:
```bash
npm run server
```

For frontend only:
```bash
cd client
npm start
```

For both concurrently:
```bash
npm run dev
```

## API Endpoints

### Authentication Routes
```
POST /api/auth - User login
GET /api/auth - Get authenticated user
POST /api/users - Register user
```

### Profile Routes
```
GET /api/profile/me - Get current user profile
POST /api/profile - Create/update profile
GET /api/profile - Get all profiles
GET /api/profile/user/:user_id - Get profile by user ID
DELETE /api/profile - Delete profile & user
PUT /api/profile/experience - Add experience
DELETE /api/profile/experience/:exp_id - Delete experience
PUT /api/profile/education - Add education
DELETE /api/profile/education/:edu_id - Delete education
GET /api/profile/github/:username - Get user's Github repos
```

### Post Routes
```
POST /api/posts - Create post
GET /api/posts - Get all posts
GET /api/posts/:id - Get post by ID
DELETE /api/posts/:id - Delete post
PUT /api/posts/like/:id - Like a post
PUT /api/posts/unlike/:id - Unlike a post
POST /api/posts/comment/:id - Comment on post
DELETE /api/posts/comment/:id/:comment_id - Delete comment
```

### Admin Routes
```
POST /api/admin/login - Admin authentication
GET /api/admin/users - Get all users
PUT /api/admin/users/:id - Update user
DELETE /api/admin/users/:id - Delete user
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team Members
- Adarsh Akhouri
- Ashish Gangaramani
- Kshitij Kumar
- Mayukh Sinha
- Rithwik Srivastava

## Project Structure
```
├── client/                # React frontend
│   ├── src/
│   │   ├── actions/      # Redux actions
│   │   ├── components/   # React components
│   │   ├── reducers/     # Redux reducers
│   │   └── utils/        # Utility functions
│   └── package.json
├── config/               # Backend configuration
├── middleware/           # Express middleware
├── models/              # Mongoose models
├── routes/              # API routes
├── server.js            # Express app
└── package.json
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.