#  DevPulse – Assignment Issue Tracker API

An internal **tech issue & feature tracking system** built for software teams to report bugs, suggest features, and manage workflows efficiently.

---

##  Live URL

https://your-live-url.com

---

##  Features

-  User authentication (JWT-based signup & login)
-  Role-based access control (Contributor & Maintainer)
-  Create bug reports and feature requests
-  View all issues with filtering & sorting
-  View single issue details
-  Update issues with role-based restrictions
-  Delete issues (maintainer only)
-  Reporter info attached to each issue
-  Modular Express + TypeScript architecture
-  PostgreSQL with raw SQL (pg driver)
-  Secure password hashing using bcrypt
-  JWT authentication

---

##  Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- bcrypt
- dotenv

---

##  Setup Instructions

### 1 Clone Repository
```bash
git clone https://github.com/your-username/devpulse-server.git
cd devpulse-server
```

### 2 Install Dependencies
```bash
npm install
```

### 3 Configure Environment Variables
Create a .env file:

```
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4 Run Project

Development:
```
npm run dev
```

Production:
```
npm run build
npm start
```

---

##  API ENDPOINTS

### AUTH

POST /api/auth/signup  
POST /api/auth/login  

### ISSUES

POST /api/issues  
GET /api/issues  
GET /api/issues/:id  
PATCH /api/issues/:id  
DELETE /api/issues/:id  

---

##  DATABASE SCHEMA

Users:
- id SERIAL PRIMARY KEY
- name VARCHAR
- email UNIQUE VARCHAR
- password TEXT
- role contributor | maintainer
- created_at TIMESTAMP
- updated_at TIMESTAMP

Issues:
- id SERIAL PRIMARY KEY
- title VARCHAR(150)
- description TEXT
- type bug | feature_request
- status open | in_progress | resolved
- reporter_id INT
- created_at TIMESTAMP
- updated_at TIMESTAMP

---

##  ROLES

Contributor:
- Create issues
- View issues
- Update own issues

Maintainer:
- Full access
- Manage status
- Delete issues

---

##  Author
DevPulse Backend System
