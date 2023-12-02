

# Employee Relocation App

## Description

This project provides functionality for user authentication, CRUD operations for departments, and managing employees, including the ability to relocate them.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Login Information](#login-information)
- [License](#license)

## Prerequisites

Ensure you have the following installed:

- Node.js (>= 20)
- Angular (= 17)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Ahmed-Makled/employee-relocation-app
cd your-repo
npm install
```

### Additional Steps

If required, perform any additional setup steps, such as configuring a database or environment variables.

# Features

1. **Login:**
   - Users can authenticate themselves.

2. **CRUD Departments:**
   - Create, Read, Update, and Delete operations for departments.

3. **Employee Management:**
   - Display a list of employees.
   - Relocate employees to different departments.

# Project Structure

## src

The `src` directory contains the source code of the Angular application.

- **app:**
  - *components:* Angular components for different features.
    - *auth:* Components related to user authentication.
    - *departments:* Components for CRUD operations on departments.
    - *employees:* Components for employee management.
  - *core:*
    - *guards:* Authentication guard.
    - *models:* Data models for authentication, departments, and employees.
    - *pipes:* Custom pipes (e.g., search-by-name).
    - *services:* Services for API, authentication, department, employee, and form handling.
  - *shared:*
    - *components:* Reusable layout and sidemenu components.

- **assets:**
  - *css:* Styles for Toastr notifications.
  - *data:* JSON files for employees and departments.
  - *images:* Project images.

## Running the Development Server

To run the development server, use the following command:

```bash
ng s
```

Open your browser and navigate to http://localhost:4200.

Explore the various features such as authentication, CRUD operations for departments, and managing employees.

# Login Information


- **Username:** tie
- **Password:** tie

# License

Specify the license under which the project is distributed.

