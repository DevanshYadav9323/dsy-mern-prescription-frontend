# DSY MERN Prescription Platform - Frontend

A modern online prescription and consultation platform built using React.js and Material UI.

## Features

### Authentication
- Doctor Signup & Login
- Patient Signup & Login
- JWT Authentication
- Role Based Navigation

### Doctor Panel
- Dashboard Analytics
- Consultation Requests
- Prescription Management
- Generate & Update Prescriptions
- Download PDF Prescriptions
- Doctor Profile

### Patient Panel
- Browse Doctors
- Multi-Step Consultation Form
- QR Based Payment Step
- View Consultations
- View & Download Prescriptions
- Patient Profile

### UI Features
- Responsive Design
- Professional Dashboard
- Graphs & Charts
- Role Based Sidebar
- Modern Material UI Interface

---

# Tech Stack

- React.js
- Material UI
- Axios
- Formik
- Yup
- Recharts
- React Router
- React Toastify

---

# Installation

## Clone Repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
```

---

## Install Dependencies

```bash
npm install
```

---

# Update Appconfig file

To run locally :

```env
Change baseurl to https:localhost:3100
```
---

# Run Development Server

```bash
npm start
```

---

# Build Production

```bash
npm run build
```

---

# Important Routes

## Authentication

| Route | Description |
|---|---|
| `/doctor/login` | Doctor Login |
| `/doctor/signup` | Doctor Signup |
| `/patient/login` | Patient Login |
| `/patient/signup` | Patient Signup |

---

## Doctor Panel

| Route | Description |
|---|---|
| `/dashboard` | Doctor Dashboard |
| `/consultations` | Consultation Requests |
| `/consultation-details/:id` | Consultation Details |
| `/prescriptions` | Prescription List |
| `/doctor/profile` | Doctor Profile |

---

## Patient Panel

| Route | Description |
|---|---|
| `/doctors` | Doctors Listing |
| `/consult/:id` | Consultation Form |
| `/my-consultations` | Patient Consultations |
| `/my-prescriptions` | Patient Prescriptions |
| `/patient/profile` | Patient Profile |

---

# Features Implemented

- Multi-step consultation form
- Form validation using Formik + Yup
- QR payment step
- PDF generation
- Editable prescriptions
- Dashboard analytics
- Charts & graphs
- Responsive layouts
- Role based authentication

---

# Deployment

Frontend can be deployed on:
- Netlify
- Vercel

---

# Author

Devansh Yadav
