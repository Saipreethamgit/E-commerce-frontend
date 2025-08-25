🛒 E-Commerce Platform

A full-stack e-commerce web application built with React (frontend), Spring Boot (backend), and MongoDB (database). The platform provides users with a seamless shopping experience, including product browsing, cart management, authentication, order placement, and an admin panel for product management.

🚀 Features
🔹 User Features

Browse products with filters and search

View product details and reviews

Add/remove items from cart

Secure user authentication (JWT-based login & signup)

Place orders and view order history

Profile management (user info, addresses, etc.)

Responsive UI with modern design

🔹 Admin Features

Add, update, or delete products

Manage inventory and categories

View customer orders

Handle user management

🛠️ Tech Stack

Frontend

React.js

Tailwind CSS / Styled Components (your choice)

Axios for API requests

Vercel deployment

Backend

Spring Boot (Java)

Spring Security + JWT for authentication

RESTful APIs

MongoDB (Atlas) as database

Render deployment

Other Tools

Git & GitHub for version control

📂 Project Structure

e-commerce-platform/
│── backend/              # Spring Boot backend
│   ├── src/main/java/
│   │   ├── controller/   # API controllers
│   │   ├── model/        # Data models
│   │   ├── repository/   # MongoDB repositories
│   │   ├── service/      # Business logic
│   │   └── config/       # Security & JWT config
│── frontend/             # React frontend
│   ├── src/components/   # Reusable UI components
│   ├── src/pages/        # Pages (Home, Cart, Profile, etc.)
│   ├── src/context/      # State management
│   └── src/services/     # API integration

⚡ Deployment

Frontend (React) → Vercel - https://e-commerce-frontend-q6t5.vercel.app (Credentials to login Email: test@example.com, Password: Test@123)

Backend (Spring Boot) → Render - https://e-commerce-backend-6jy0.onrender.com

Database → MongoDB Atlas - https://cloud.mongodb.com/v2/688a489da836b449725e1566#/metrics/replicaSet/68938a2e931cea000d2dec14/explorer/Ecommerce

🔑 Authentication

JWT-based authentication for secure login/signup

Token stored in localStorage for session persistence

Role-based access (User / Admin)
