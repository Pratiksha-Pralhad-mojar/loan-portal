# Loan Application Portal

## Overview

A full-stack Loan Application Portal that allows users to submit loan applications and enables administrators to view, manage, approve, or reject applications.

## Live Links

Frontend:
https://loan-portal-iota.vercel.app/

Backend:
https://loan-portal-7ajr.onrender.com/

GitHub Repository:
https://github.com/Pratiksha-Pralhad-mojar/loan-portal

## Features

* Submit loan applications
* View all applications
* Approve applications
* Reject applications
* Dashboard statistics
* PostgreSQL database integration
* Responsive web interface

## Tech Stack

### Frontend

* React.js
* Axios

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Neon Database

### Deployment

* Vercel
* Render

## API Endpoints

### Get All Applications

GET /api/applications

### Create Application

POST /api/applications

### Update Status

PATCH /api/applications/:id/status

## Installation

### Backend

npm install

Create .env file:

DATABASE_URL=your_database_url
PORT=5000

Run:

node server.js

### Frontend

cd frontend
npm install
npm start

## Author

Pratiksha Mojar
B.Tech CSE (Data Science)
