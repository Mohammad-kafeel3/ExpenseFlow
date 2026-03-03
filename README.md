# 💰 ExpenseFlow – Full Stack Expense Management Application

ExpenseFlow is a full-stack web application built to help users efficiently manage and track their daily expenses. 
The application provides secure authentication, organized expense management, and a structured backend architecture following the MVC pattern.

It is developed using the MERN stack and demonstrates complete frontend-backend integration with RESTful APIs.

---

# 🚀 Features

* User Registration & Login
* JWT-based Authentication
* Secure Password Hashing (Bcrypt)
* Add New Expenses
* Update Existing Expenses
* Delete Expenses
* View All Expenses
* Category-Based Expense Organization
* Protected Routes using Middleware
* RESTful API Architecture

---

# 🛠️ Tech Stack

# Frontend

* React.js
* Axios
* CSS

# Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Bcrypt

---

# 📂 Project Structure

```
ExpenseFlow/
│
├── client/            # React frontend
├── config/            # Database configuration
├── controllers/       # Business logic
├── middlewares/       # Authentication & route protection
├── models/            # Database schemas
├── routes/            # API routes
├── utils/             # Utility functions
├── server.js          # Application entry point
├── package.json
└── .gitignore
```

---

# ⚙️ Installation & Setup

# 1. Clone the Repository

```
git clone https://github.com/your-username/ExpenseFlow.git
cd ExpenseFlow
```

# 2. Install Backend Dependencies

```
npm install
```

# 3. Install Frontend Dependencies

```
cd client
npm install
cd ..
```

# 4. Configure Environment Variables

Create a '.env' file in the root directory and add:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

# 5. Run the Application

```
npm run dev
```

---
