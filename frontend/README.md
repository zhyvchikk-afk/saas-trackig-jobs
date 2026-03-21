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

📸 Screenshots
Login

Register

Dashboard

🧠 Що я реалізував
Повноцінну систему авторизації з JWT
Email verification flow (token-based)
Роботу з backend + frontend + deploy
Захист маршрутів
CRUD операції
⚡ Запуск локально
Backend
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
npm install
npm run dev
🔑 ENV змінні
Backend (.env)
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
FRONTEND_URL=http://localhost:5173
📌 Плани розвитку
Stripe підписка
Розширена аналітика
Фільтри та пошук
👨‍💻 Автор

Костянтин Живило
