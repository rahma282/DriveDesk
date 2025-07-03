# 🚗 DriveDesk – Car Agency Management System

**DriveDesk** is a full-stack web application designed for car agencies. It enables **admins** to manage car listings and **users** to browse available cars. The system features role-based access, car listing dates, a secure backend using Spring Boot, and a dynamic frontend built with Angular.

---

## 📁 Project Structure

DriveDesk/
├── backend/ ← Spring Boot (Java 17) + MySQL
├── frontend/ ← Angular 16+ with TypeScript
└── README.md


---

## 🔧 Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | Angular 16+, TypeScript, Bootstrap |
| Backend     | Spring Boot, Java 17, Spring Data JPA |
| Database    | MySQL                            |
| Auth        | Spring Security + JWT            |
| Build Tools | Maven (Java), Angular CLI        |

---

## 👥 Features

### 🚘 Car Management
- Admin can add, update, delete cars
- All users can view available cars
- Cars include brand, model, price, listing date

### 👤 User Roles
- `ROLE_ADMIN`: Full access to manage cars
- `ROLE_USER`: Can view listed cars & Allow a user to reserve one or more cars to be shown in the agency at a specific date.  

### 🔐 Authentication
- JWT-based login & registration
- Role-based access control for secure routes

### 📅 Listing Date
- Each car has a date when it was listed in the agency
-  Allow a user to reserve one or more cars to be shown in the agency at a specific date.  

---

## 🚀 Getting Started

### 1️⃣ Backend (Spring Boot)

```bash
cd _car_app
./mvnw clean install
./mvnw spring-boot:run
```
### 2️⃣ Frontend (Angular)
cd _car_app_frontend
npm install
ng serve

---

⚙️ Environment Setup
Java 17

Node.js 18+

Angular CLI

MySQL 8+

Maven 3.8+

