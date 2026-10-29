# Smart Electricity Meter Management System

A full-stack web application for managing electricity meters, tracking meter readings, and calculating electricity bills.

## Features

- **Meter Management:** Add and view electricity meter details.
- **Reading Updates:** Update current meter readings.
- **Customer-wise Search:** View meters associated with a customer ID.
- **Electricity Bill Calculation:** Calculate consumed units and bills at ₹8 per unit.
- **REST API:** Backend APIs built with FastAPI.
- **Interactive Dashboard:** React-based frontend for managing meter information.

## Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML
- CSS
- Vite

**Backend**
- Python
- FastAPI
- SQLAlchemy
- SQLite

## Project Structure

```text
smart-electricity-meter/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── schemas.py
├── fronted/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── .gitignore
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/satyam147287/smart-electricity-meter.git
cd smart-electricity-meter
```

### 2. Run the backend

```bash
cd backend
pip install fastapi uvicorn sqlalchemy
python -m uvicorn main:app --reload
```

Backend API: `http://127.0.0.1:8000`

API documentation: `http://127.0.0.1:8000/docs`

### 3. Run the frontend

Open a new terminal from the project root:

```bash
cd fronted
npm install
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## Future Improvements

- Deploy the application online.
- Add user authentication and authorization.
- Improve dashboard design and data visualization.
- Add automated testing and billing reports.

## Author

**Satyam**

GitHub: [@satyam147287](https://github.com/satyam147287)

---

This project was built as a learning project to practice full-stack development using React.js, FastAPI, and SQLite.
