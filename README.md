# 🚀 Task Manager Backend

A production-ready **Django REST Framework backend** for a modern **Task Manager SaaS application** using:

- 🐍 Django + DRF
- 🐘 Supabase PostgreSQL
- 🔐 JWT Authentication
- 📧 OTP Email Verification
- 🏢 Workspaces
- ✅ Tasks & Checklists
- 🔔 Notifications
- 📎 Attachments
- 📝 Notes & Comments
- 🔍 Filtering/Search/Ordering
- 📄 Pagination
- 🛠 Django Admin

---

# ✨ Features

## 🔐 Authentication System

- ✅ User Registration
- ✅ Email OTP Verification
- ✅ JWT Login
- ✅ Access & Refresh Tokens
- ✅ Password Reset
- ✅ Change Password
- ✅ Logout
- ✅ Protected APIs
- ✅ User Profiles
- ✅ Token Blacklisting

---

## 🏢 Workspace System

- ✅ Create Workspace
- ✅ Invite Members
- ✅ Member Roles
- ✅ Archive Workspace
- ✅ Workspace Permissions
- ✅ Search & Filters

---

## ✅ Task Management

- ✅ Create Tasks
- ✅ Assign Tasks
- ✅ Task Priorities
- ✅ Task Status Tracking
- ✅ Due Dates & Reminders
- ✅ Recurring Tasks
- ✅ Task Notes
- ✅ Task Comments
- ✅ Checklist Items
- ✅ Attachments
- ✅ Archive/Restore Tasks

---

## 🔔 Notifications

- ✅ Task Assigned
- ✅ Comment Notifications
- ✅ Reminder Notifications
- ✅ Mark Read / Unread
- ✅ Unread Count

---

# 🏗 System Architecture

```text
Task Manager Backend
│
├── accounts
│   ├── authentication
│   ├── OTP verification
│   ├── JWT tokens
│   └── profile management
│
├── workspaces
│   ├── workspace CRUD
│   ├── member management
│   └── permissions
│
├── tasks
│   ├── task CRUD
│   ├── comments
│   ├── checklists
│   ├── notes
│   ├── labels
│   └── attachments
│
├── notifications
│   ├── alerts
│   ├── unread tracking
│   └── reminder system
│
└── config
    ├── settings
    ├── JWT
    ├── DRF
    └── Supabase PostgreSQL
```

---

# 🗄 Database Structure

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

# 🏷 tasks_label

| Column | Type |
|---|---|
| id | UUID |
| workspace | FK |
| name | VARCHAR |
| color | VARCHAR |

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

# 📝 tasks_note

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

# ⚙️ Setup

## 1️⃣ Create Virtual Environment

```powershell
python -m venv venv
```

---

## 2️⃣ Activate Environment

```powershell
.\venv\Scripts\Activate.ps1
```

---

## 3️⃣ Install Requirements

```powershell
pip install -r requirements.txt
```

---

## 4️⃣ Configure Environment Variables

Copy:

```powershell
copy .env.example .env
```

Update `.env`:

```env
SECRET_KEY=your_secret_key

DEBUG=True

DB_NAME=postgres
DB_USER=postgres.xxxxxxxxx
DB_PASSWORD=your_password
DB_HOST=xxxx.com
DB_PORT=5432

EMAIL_HOST=
EMAIL_PORT=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_USE_TLS=True
```

---

# 🚀 Run Project

## Apply Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

---

## Create Admin User

```powershell
python manage.py createsuperuser
```

---

## Run Server

```powershell
python manage.py runserver
```

---

# 🌐 Base URL

```text
http://127.0.0.1:8000
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
| POST | `/api/auth/resend-verification/` |
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

# 🔍 Filtering Examples

```text
/api/tasks/?status=todo

/api/tasks/?priority=high

/api/tasks/?search=sprint

/api/tasks/?ordering=-due_date

/api/workspaces/?search=main
```

---

# 🧪 Postman Testing Flow

## 1️⃣ Register

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

## 2️⃣ Verify Email

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

## 3️⃣ Login

```http
POST /api/auth/login/
```

```json
{
  "email": "postmanuser@example.com",
  "password": "StrongPass123!"
}
```

Copy:

- access token
- refresh token

---

## 4️⃣ Create Workspace

```http
POST /api/workspaces/
```

```json
{
  "name": "Main Workspace",
  "description": "Testing workspace",
  "color": "#2563eb"
}
```

---

## 5️⃣ Create Task

```http
POST /api/tasks/
```

```json
{
  "workspace": "workspace_uuid",
  "title": "Prepare sprint board",
  "description": "Create initial task list",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-05-25T10:00:00Z"
}
```

---

# 🛠 Admin Panel

```text
http://127.0.0.1:8000/admin/
```

---

# 🚨 Troubleshooting

## 401 Unauthorized

- Access token missing
- Access token expired

Solution:

```text
Login again and paste new access token
```

---

## OTP Not Received

If SMTP is not configured:

```text
OTP appears in Django terminal
```

---

## Supabase Migration Error

If using old DB before custom user model:

```text
Use fresh dev database or reset schema
```

---

# 📦 Tech Stack

- Django
- Django REST Framework
- PostgreSQL
- Supabase
- JWT
- SimpleJWT
- Python Dotenv
- psycopg2
- DRF Filters

---

# 👨‍💻 Author

Hitesh Kumar S