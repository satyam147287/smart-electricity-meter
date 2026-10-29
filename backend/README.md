# Smart Electricity Meter Management System

## About the Project
Smart Electricity Meter is a full-stack web application to manage electricity meters, update meter readings, calculate electricity bills, and view customer meter details.

## Features
- Add a new electricity meter
- Update meter readings
- View electricity bills
- Calculate units consumed
- Search meters by customer ID
- View all registered meters
- Validate meter readings

## Technologies Used
- Frontend: React.js, Vite, CSS
- Backend: Python, FastAPI
- Database: SQLite
- ORM: SQLAlchemy

## Electricity Bill Calculation
- Rate per unit: ₹8
- Units consumed = Current Reading - Previous Reading
- Total Bill = Units Consumed × ₹8

## How to Run the Project

### 1. Start the Backend
Open a terminal and run:

```bash
cd backend
python -m uvicorn main:app --reload
```

Backend API: http://127.0.0.1:8000

API Documentation: http://127.0.0.1:8000/docs

### 2. Start the Frontend
Open a second terminal and run:

```bash
cd fronted
npm.cmd run dev
```

Frontend: http://localhost:5173/

## Database
The project uses SQLite to store electricity meter and reading information.

## Project Status
Core features implemented and tested.
