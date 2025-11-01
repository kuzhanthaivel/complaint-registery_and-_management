# Complaint Registry and Management System - Backend

## 📝 Overview
A robust backend system for managing complaints, users, and agent assignments. Built with Node.js, Express, and MongoDB, deployed on Vercel.

## 🏗️ Project Structure

```
backend/
├── config.js        # Database configuration and connection
├── index.js         # Main application entry point and API routes
├── Schema.js        # MongoDB schemas and models
├── vercel.json      # Vercel deployment configuration
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (comes with Node.js)
- MongoDB Atlas account (for database)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install express mongoose cors
   ```
4. Set up environment variables (create `.env` file):
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

### Running Locally

```bash
# Start development server
node index.js
```

The server will be available at `http://localhost:5000`

## 🔧 API Documentation

### Authentication

#### User Registration
- **Endpoint**: `POST /SignUp`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "phone": 1234567890,
    "userType": "Ordinary" // or "Agent"
  }
  ```

#### User Login
- **Endpoint**: `POST /Login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### Users

#### Get All Agents
- **Endpoint**: `GET /AgentUsers`
- **Response**: List of all agent users

#### Get All Ordinary Users
- **Endpoint**: `GET /OrdinaryUsers`
- **Response**: List of all ordinary users

#### Delete User
- **Endpoint**: `DELETE /OrdinaryUsers/:id`
- **URL Params**: `id` - User ID to delete

### Complaints

#### Create Complaint
- **Endpoint**: `POST /Complaint/:id`
- **URL Params**: `id` - User ID
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": 10001,
    "comment": "Issue description",
    "status": "Pending"
  }
  ```

#### Get User Complaints
- **Endpoint**: `GET /status/:id`
- **URL Params**: `id` - User ID

#### Get All Complaints (Admin)
- **Endpoint**: `GET /status`

### Messages

#### Send Message
- **Endpoint**: `POST /messages`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "message": "Hello, I have an update",
    "complaintId": "complaint_id_here"
  }
  ```

#### Get Messages for Complaint
- **Endpoint**: `GET /messages/:complaintId`
- **URL Params**: `complaintId` - ID of the complaint

## 🛠️ Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: Number,
  userType: String, // 'Agent' or 'Ordinary'
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint
```javascript
{
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  city: String,
  state: String,
  pincode: Number,
  comment: String,
  status: String
}
```

### Message
```javascript
{
  name: String,
  message: String,
  complaintId: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

This application is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

### Environment Variables

| Variable     | Description                | Required | Default |
|--------------|----------------------------|----------|---------|
| MONGODB_URI  | MongoDB connection string  | Yes      | -       |
| PORT         | Server port               | No       | 5000    |
| NODE_ENV     | Environment               | No       | development |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
