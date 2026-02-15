# Event Management Application

A full-stack MERN application that allows users to browse events, register, cancel registrations, and manage their event dashboard efficiently.

---

## Live Demo
```
Frontend: https://event-management-sjvm.onrender.com
```
```
Backend API: https://event-management-backend-yeph.onrender.com/api
```

---

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Render (Frontend & Backend)
- MongoDB Atlas (Cloud Database)

---

## Features

### Authentication
- User Registration
- User Login
- JWT-based Protected Routes
- Secure password hashing with bcrypt

### Event Management
- Browse all available events
- View detailed event information
- Search events dynamically
- Pagination support
- View available seats in real-time

### Event Registration
- Register for events
- Cancel event registration
- Prevent duplicate registrations
- Capacity validation (no overbooking)

### User Dashboard
- View registered events
- Categorized into:
  - Upcoming Events
  - Past Events

---

## System Architecture

Frontend (Render)  
⬇  
Backend API (Render)  
⬇  
MongoDB Atlas (Cloud Database)

---

## 📂 Project Structure

### Backend

```
server/
├── models/
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
│
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
│
├── middleware/
│   ├── protect.js
│   └── errorHandler.js
│
├── server.js
└── package.json
```

### Frontend

```
client/
│── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── api.js
│ ├── App.jsx
│ └── main.jsx
│
│── tailwind.config.js
│── package.json
```
---

## 🔍 API Endpoints

### Auth Routes

```
POST /api/auth/register
```
```
POST /api/auth/login
```


### Event Routes
```
GET /api/events
```
```
GET /api/events/:id
```


### Registration Routes
```
POST /api/registrations/:eventId
```
```
DELETE /api/registrations/:eventId
```
```
GET /api/registrations/my/events
```


---

## Database Design

### User
- name
- email (unique)
- password (hashed)

### Event
- name
- organizer
- location
- date
- description
- capacity
- category

### Registration
- user (ref)
- event (ref)

Relationship:
