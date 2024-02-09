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

# Creating the Jar file and running the application

- make sure you are in the parent folder
- use this command in terminal ` mvn clean install`
- once the BUILD SUCCESS
- then run `java -jar  target/FPCP-0.0.1-SNAPSHOT.jar`
- Once the application is started you can use it

# Usage

## APIS
### Swagger

- Endpoint: `http://localhost:8086/swagger-ui/index.html`
- try this in browser to get the all the end points from Swagger

### Welcome

- Endpoint: `http://localhost:8086/api/public/welcome`
- Method: GET

### Register

- Endpoint: `http://localhost:8086/api/public/register`
- Method: POST
- Request Body : `{
  "name": "",
  "email": "",
  "password": ""
  }`
- Response : `Hey {name} Resistration successful with email {email}`
- rules to get user registered `
  1-same email must not be in db
  2-name must be max=25, min=3
  3-email must be vaild
  4-password must be min = 8
`

### Login

- Endpoint: `http://localhost:8086/api/public/authenticate`
- Method: POST
- Request Body: `{
  "email": "",
  "password": ""
  }`

### Home Page (After Login)

- Endpoint: `http://localhost:8086/api/private/home`
- Method: GET
- Headers: Authorization: Bearer {token}

### Forgot Password
- Endpoint: `http://localhost:8086/api/public/forgotpassword`
- Method: POST
- Request Body:`{
                  "email": ""
              }`

### Reset Password

- Endpoint: `http://localhost:8086/api/public/reset_password`
- Method: POST
- Query Parameters:
  token: {reset_token}
  password: {new_password}

- Example: http://localhost:8086/api/public/reset_password?token=reset_token&password=new_password
