# 🚀 Task Manager Application

A production-ready **full-stack Task Manager SaaS application** built using modern technologies with secure authentication, workspace collaboration, advanced task management, notifications, and a stunning Next.js frontend UI.

---

# ✨ Tech Stack

## 🔹 Backend
- 🐍 Django
- ⚡ Django REST Framework (DRF)
- 🔐 JWT Authentication
- 🐘 PostgreSQL
- ☁️ Supabase PostgreSQL
- 📧 OTP Email Verification
- 🔄 SimpleJWT
- 🔍 DRF Filters
- 🛠 Django Admin

---

## 🔹 Frontend
- ⚡ Next.js
- ⚛️ React.js
- 🎨 Tailwind CSS
- ✨ Framer Motion
- 📡 Axios
- 🧩 React Hook Form
- 🔔 Toast Notifications
- 🌙 Dark Mode
- 📊 Dashboard Analytics

---

# 🏗 Project Structure

```text
Task-Manager/
│
├── backend/
│   │
│   ├── accounts/
│   ├── tasks/
│   ├── workspaces/
│   ├── notifications/
│   ├── config/
│   ├── media/
│   ├── staticfiles/
│   ├── venv/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   ├── styles/
│   ├── public/
│   ├── admin/
│   ├── dashboard/
│   ├── tasks/
│   ├── workspaces/
│   ├── notifications/
│   ├── login/
│   ├── signup/
│   ├── package.json
│   └── .env.local
│
├── README.md
└── .gitignore
```

---

# 🔐 Authentication Features

- ✅ User Registration
- ✅ JWT Authentication
- ✅ Access Token & Refresh Token
- ✅ OTP Email Verification
- ✅ Forgot Password
- ✅ Reset Password
- ✅ Change Password
- ✅ Protected APIs
- ✅ Role-Based Authentication
- ✅ Google Sign-In UI
- ✅ GitHub Sign-In UI

---

# 🏢 Workspace Features

- ✅ Create Workspace
- ✅ Update Workspace
- ✅ Delete Workspace
- ✅ Archive Workspace
- ✅ Invite Members
- ✅ Workspace Roles
- ✅ Workspace Collaboration
- ✅ Workspace Filters & Search

---

# ✅ Task Features

- ✅ Create Task
- ✅ Update Task
- ✅ Delete Task
- ✅ Archive Task
- ✅ Restore Task
- ✅ Assign Task
- ✅ Due Dates & Reminders
- ✅ Task Priority System
- ✅ Task Status Tracking
- ✅ Checklist Items
- ✅ Task Notes
- ✅ Task Comments
- ✅ File Attachments
- ✅ Recurring Tasks

---

# 🔔 Notification Features

- ✅ Real-Time Notifications
- ✅ Task Assignment Alerts
- ✅ Comment Notifications
- ✅ Reminder Notifications
- ✅ Unread Notification Count
- ✅ Mark Read / Unread

---

# 🎨 Frontend Features

- ✅ Modern UI/UX
- ✅ Tailwind CSS Design
- ✅ Responsive Layout
- ✅ Animated Components
- ✅ Glassmorphism Effects
- ✅ Sidebar Navigation
- ✅ Protected Routes
- ✅ Interactive Dashboard
- ✅ Admin Dashboard
- ✅ Loading Skeletons
- ✅ Toast Messages
- ✅ Form Validation

---

# 👨‍💼 Admin Dashboard

- ✅ Admin Login
- ✅ User Management
- ✅ Workspace Management
- ✅ Task Management
- ✅ Notifications Monitoring
- ✅ Analytics Dashboard
- ✅ System Monitoring

---

# 🗄 Database Structure

---

# 👤 accounts_user

| Column | Type |
|---|---|
| id | UUID |
| username | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| full_name | VARCHAR |
| phone | VARCHAR |
| profile_image | IMAGE |
| bio | TEXT |
| role | VARCHAR |
| is_verified | BOOLEAN |
| otp | VARCHAR |
| otp_created_at | DATETIME |
| created_at | DATETIME |
| updated_at | DATETIME |

---

# 🏢 workspaces_workspace

| Column | Type |
|---|---|
| id | UUID |
| owner | FK → User |
| name | VARCHAR |
| slug | VARCHAR |
| description | TEXT |
| color | VARCHAR |
| is_active | BOOLEAN |
| is_archived | BOOLEAN |
| created_at | DATETIME |
| updated_at | DATETIME |

---

# 👥 workspaces_workspacemember

| Column | Type |
|---|---|
| id | UUID |
| workspace | FK |
| user | FK |
| role | VARCHAR |
| joined_at | DATETIME |

---

# ✅ tasks_task

| Column | Type |
|---|---|
| id | UUID |
| workspace | FK |
| created_by | FK |
| assigned_to | FK |
| title | VARCHAR |
| description | TEXT |
| status | VARCHAR |
| priority | VARCHAR |
| start_date | DATETIME |
| due_date | DATETIME |
| completed_at | DATETIME |
| reminder_time | DATETIME |
| notes | TEXT |
| is_recurring | BOOLEAN |
| recurring_rule | TEXT |
| is_archived | BOOLEAN |
| deleted_at | DATETIME |
| created_at | DATETIME |
| updated_at | DATETIME |

---

# 💬 tasks_comment

| Column | Type |
|---|---|
| id | UUID |
| task | FK |
| user | FK |
| content | TEXT |
| created_at | DATETIME |

---

# ☑ tasks_checklistitem

| Column | Type |
|---|---|
| id | UUID |
| task | FK |
| title | VARCHAR |
| is_completed | BOOLEAN |
| completed_at | DATETIME |
| created_at | DATETIME |

---

# 📎 tasks_attachment

| Column | Type |
|---|---|
| id | UUID |
| task | FK |
| uploaded_by | FK |
| file | FILE |
| created_at | DATETIME |

---

# 🔔 notifications_notification

| Column | Type |
|---|---|
| id | UUID |
| user | FK |
| type | VARCHAR |
| title | VARCHAR |
| message | TEXT |
| is_read | BOOLEAN |
| related_task | FK |
| created_at | DATETIME |

---

# ⚙️ Backend Setup

## 1️⃣ Navigate To Backend

```powershell
cd backend
```

---

## 2️⃣ Create Virtual Environment

```powershell
python -m venv venv
```

---

## 3️⃣ Activate Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

---

## 4️⃣ Install Dependencies

```powershell
pip install -r requirements.txt
```

---

## 5️⃣ Configure Environment Variables

Create `.env`

```env
SECRET_KEY=your_secret_key

DEBUG=True

DB_NAME=postgres
DB_USER=postgres.xxxxxxxxx
DB_PASSWORD=your_password
DB_HOST=xxxx.supabase.co
DB_PORT=5432

EMAIL_HOST=
EMAIL_PORT=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_USE_TLS=True
```

---

# 🚀 Run Backend

## Apply Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

---

## Create Superuser

```powershell
python manage.py createsuperuser
```

---

## Run Backend Server

```powershell
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

# 🎨 Frontend Setup

## 1️⃣ Navigate To Frontend

```powershell
cd frontend
```

---

## 2️⃣ Install Dependencies

```powershell
npm install
```

---

## 3️⃣ Configure Frontend Environment

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 4️⃣ Run Frontend

```powershell
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

# 🔐 Authentication Header

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

---

# 📡 API Endpoints

# 🔐 Authentication APIs

| Method | Endpoint |
|---|---|
| POST | `/api/auth/register/` |
| POST | `/api/auth/login/` |
| POST | `/api/auth/refresh/` |
| POST | `/api/auth/logout/` |
| POST | `/api/auth/verify-email/` |
| POST | `/api/auth/forgot-password/` |
| POST | `/api/auth/reset-password/` |
| POST | `/api/auth/change-password/` |
| GET/PATCH | `/api/auth/profile/` |

---

# 🏢 Workspace APIs

| Method | Endpoint |
|---|---|
| GET/POST | `/api/workspaces/` |
| GET/PATCH/DELETE | `/api/workspaces/{id}/` |
| GET/POST | `/api/workspaces/members/` |

---

# ✅ Task APIs

| Method | Endpoint |
|---|---|
| GET/POST | `/api/tasks/` |
| GET/PATCH/DELETE | `/api/tasks/{id}/` |
| GET/POST | `/api/tasks/comments/` |
| GET/POST | `/api/tasks/checklists/` |
| GET/POST | `/api/tasks/notes/` |
| GET/POST | `/api/tasks/attachments/` |
| GET/POST | `/api/tasks/labels/` |

---

# 🔔 Notification APIs

| Method | Endpoint |
|---|---|
| GET | `/api/notifications/` |
| GET | `/api/notifications/unread-count/` |
| POST | `/api/notifications/{id}/mark-read/` |
| POST | `/api/notifications/mark-all-read/` |

---

# 🧪 Postman Testing Flow

## 🔹 Register

```http
POST /api/auth/register/
```

```json
{
  "username": "postmanuser",
  "email": "postmanuser@example.com",
  "full_name": "Postman User",
  "phone": "9876543210",
  "password": "StrongPass123!"
}
```

---

## 🔹 Verify Email

```http
POST /api/auth/verify-email/
```

```json
{
  "email": "postmanuser@example.com",
  "otp": "123456"
}
```

---

## 🔹 Login

```http
POST /api/auth/login/
```

```json
{
  "email": "postmanuser@example.com",
  "password": "StrongPass123!"
}
```

---

# 🛠 Admin Panel

## Backend Admin

```text
http://127.0.0.1:8000/admin/
```

---

## Frontend Admin

```text
http://localhost:3000/admin/login
```

---

# 🚨 Troubleshooting

## 401 Unauthorized

```text
Access token missing or expired.
Login again with valid credentials.
```

---

## OTP Not Received

```text
If SMTP is not configured,
OTP will appear in Django terminal.
```

---

## Supabase Migration Error

```text
Use fresh database or reset schema.
```

---

# 📦 Installation Commands

## Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

---

# 👨‍💻 Author

## Hitesh Kumar S

- Full Stack Developer
- Django REST Framework Developer
- Next.js Frontend Developer
- PostgreSQL & Supabase Integration
- JWT Authentication Systems
- Modern SaaS Application Development