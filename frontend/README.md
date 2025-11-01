# Complaint Registry and Management System

A full-stack web application for managing complaints, with separate interfaces for users, agents, and administrators.

## Features

### User Features
- User registration and authentication
- Submit new complaints with details and attachments
- Track complaint status in real-time
- View complaint history
- Chat support with agents

### Agent Features
- View assigned complaints
- Update complaint status
- Communicate with users through chat
- Manage complaint resolution process

### Admin Features
- Manage users and agents
- Monitor all complaints
- Assign complaints to agents
- View system analytics and reports

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kuzhanthaivel/complaint-registry-management.git
   cd complaint-registry-management
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
frontend/
  src/
    components/
      admin/        # Admin components
      agent/        # Agent components
      common/       # Shared components
      user/         # User components
    Images/         # Image assets
    App.js          # Main App component
    App.css         # Global styles
    index.js        # Entry point

backend/
  models/          # Database models
  routes/          # API routes
  config.js        # Configuration
  index.js         # Server entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
