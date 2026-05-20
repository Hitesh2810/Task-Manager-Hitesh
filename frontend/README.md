# TaskSphere Frontend

Premium Next.js frontend for the Django REST Framework Task Manager backend.

## Stack

- Next.js App Router, JavaScript
- Tailwind CSS
- Framer Motion and GSAP
- Shadcn-style UI primitives
- Lucide Icons
- Axios with JWT refresh interceptors
- Zustand global state
- React Hook Form
- React Hot Toast
- Recharts
- DnD Kit
- Dark and light mode

## Setup

```powershell
cd frontend
npm install
copy .env.local.example .env.local
npm run dev
```

Default backend URL:

```text
http://127.0.0.1:8000
```

Set this in `.env.local` if your backend changes:

```text
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

## Backend Requirements

Run the Django backend first:

```powershell
cd ..
.\venv\Scripts\python.exe manage.py runserver
```

Then run the frontend:

```powershell
cd frontend
npm run dev
```

## Routes

Auth:

- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/verify-email`

Dashboard:

- `/dashboard`

Tasks:

- `/tasks`
- `/tasks/create`
- `/tasks/[id]`
- `/tasks/edit/[id]`
- `/tasks/completed`
- `/tasks/upcoming`
- `/tasks/overdue`

Workspaces:

- `/workspaces`
- `/workspaces/create`
- `/workspaces/[id]`
- `/workspaces/edit/[id]`

Notifications:

- `/notifications`

Admin:

- `/admin`

## Auth Flow

1. Register at `/signup`.
2. Copy the OTP from email or the Django terminal.
3. Verify at `/verify-email`.
4. Login at `/login`.
5. The frontend stores access and refresh tokens with Zustand persistence.
6. Axios automatically refreshes expired access tokens.
7. Protected routes redirect to `/login` when no token exists.

## Production Build

```powershell
npm run build
npm run start
```

The current build has been verified with:

```powershell
npm run lint
npm run build
```
