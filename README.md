# TaskMates

TaskMates is a modern task management application built with React, Node.js, and MongoDB. It provides a seamless platform for users to manage their tasks and collaborate with others.

## Features

- User authentication with Google OAuth
- Task creation and management
- Real-time updates
- Modern and responsive UI built with Tailwind CSS
- Secure API endpoints with JWT authentication

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- JWT for token-based authentication
- CORS enabled

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TaskMates.git
cd TaskMates
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Development

- Frontend development server: `npm run dev` (in frontend directory)
- Backend development server: `npm run dev` (in root directory)
- Build frontend: `npm run build` (in frontend directory)
- Lint frontend: `npm run lint` (in frontend directory)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 