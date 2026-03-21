![React](https://img.shields.io/badge/Frontend-React-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![Status](https://img.shields.io/badge/Status-Production-brightgreen)

# SaaS трекер доходів

### Веб-додаток для відстеження своїх доходів з повною системою авторизації та верифікацією через пошту

## Demo:

https://saas-trackig-jobs-2d13.vercel.app

## Стек технологій

### Frontend:

- React(Vite)
- Axios
- React Router

### Backend:

- FastAPI
- SQLAlchemy
- JWT Authentication
- Resend (email verification)

### Database:

- SQLite (Production на Railway)

### Deploy:

- Frontend - Vercel
- Backend - Railway

## Функціонал

### Авторизація:

- Реєстрація користувача
- Вхід (JWT)
- Logout
- Підтвердження email через лист

### Jobs:

- Додавання вакансій
- Редагування
- Видалення
- Підрахунок загального доходу

### UX/UI:

- Loading стани
- Обробка помилок
- Захищені маршрути

## Screenshots

### Login

![Login](./frontend/public/screens/Login.PNG)

### Register

![Register](./frontend/public/screens/Register.PNG)

### Dashboard

![Dashboard](./frontend/public/screens/Dashboard.PNG)

### Edit

![Edit](./frontend/public/screens/Edit.PNG)

## Що було реалізовано

- Повноцінну систему авторизації з JWT
- Email verification flow (token-based)
- Роботу з backend + frontend + deploy
- Захист маршрутів
- CRUD операції

## Запуск на локальному сервері

**Backend**

`pip install -r requirements.txt`

`uvicorn app.main:app --reload`

**Frontend**

`npm install`

`npm run dev`

## ENV змінні

Backend (.env)

SECRET_KEY =...

ALGORITHM =...

ACCESS_TOKEN_EXPIRE_MINUTES =...

DATABASE_URL=...

RESEND_API_KEY=...

FRONTEND_URL=http://localhost:5173

RESEND_EMAIL_FROM=...

## Плани розвитку

- Stripe підписка
- Розширена аналітика
- Фільтри та пошук

### Автор

Костянтин Живило
