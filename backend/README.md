# FPC Real Estate Project

A Spring Boot project for a Real Estate application with user authentication and JWT security.

## Overview

This project implements a Real Estate application with features such as user registration, login, forgot password, reset password, and JWT security.

## Features

- User Registration
- User Login
- Forgot Password
- Reset Password
- JWT Security

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Java Development Kit (JDK) installed
- Maven installed
- MYSQL installed and running
- SMTP server configured for sending emails

# Running the Application

- Run the Spring Boot application:
- java -jar target/Smple-0.0.1-SNAPSHOT.jar

# Usage

## APIS

### Welcome

- Endpoint: http://localhost:8086/api/public/welcome
- Method: GET

### Register

- Endpoint: http://localhost:8086/api/public/register
- Method: POST
- Request Body : {
  "name": "",
  "email": "",
  "password": ""
  }

### Login

- Endpoint: http://localhost:8086/api/public/authenticate
- Method: POST
- Request Body: {
  "email": "",
  "password": ""
  }

### Home Page (After Login)

- Endpoint: http://localhost:8086/api/private/home
- Method: GET
- Headers: Authorization: Bearer {token}

### Reset Password

- Endpoint: http://localhost:8086/api/public/reset_password
- Method: POST
- Query Parameters:
  token: {reset_token}
  password: {new_password}

- Example: http://localhost:8086/api/public/reset_password?token=reset_token&password=new_password
