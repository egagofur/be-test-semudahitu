# Employee Management System

This project is an Employee Management System built with NestJS and Prisma ORM. It provides a RESTful API for managing employee data.

## Technologies Used

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database system.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or later)
- yarn (v1.22.22 or later)
- PostgreSQL database

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/egagofur/be-test-semudahitu.git
cd be-test-semudahitu
```

2. Install dependencies:

```bash
yarn install
```

3. Set up your environment variables:

- Copy the `.env.example` file to `.env`
- Update the `DATABASE_URL` in the `.env` file with your PostgreSQL connection string

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Generate Prisma client:

```bash
npx prisma generate
```

6. Start the development server:

```bash
yarn start:dev
```

7. Start the development server:

```bash
The server should now be running on `http://localhost:3000`.
```

## API Endpoints

### Auth

- `POST /register`: To create new user login

#### Request Body

```bash
{
    "fullname": "ega gofur",
    "companyName": "Semudahitu.com",
    "mobilePhoneNumber": "08565501860",
    "email": "egagofur@gmail.com",
    "password": "Admin123!"
}
```

- `POST /login`: To login with valid user

```bash
{
    "email": "egagofur@gmail.com",
    "password": "Admin123!"
}
```

### Employee

- `GET /employees`: Fetch all employees (with pagination)

```bash
{
    "meta": {
        "page": 1,
        "perPage": 10,
        "total": 1,
        "totalPage": 1
    },
    "data": [
        {
            "address": "123 Main St, City, Country",
            "barcode": "EMP001BAR",
            "birthdate": "1990-01-15T00:00:00.000Z",
            "branch": "Main Branch",
            "email": "john.doe@example.com",
            "fullname": "John update Doe",
            "gender": "Male",
            "id": "cm1ainxok00022ie42cz8t1uq",
            "maritalStatus": "Single"
        }
    ]
}
```

- `POST /employees`: Create a new employee

```bash
{
  "approvalLine": "Manager",
  "birthdate": "1990-01-15T00:00:00.000Z",
  "branch": "Main Branch",
  "class": "Class A",
  "department": "IT Department",
  "email": "egagofur@gmail.com",
  "employeeId": "EMP002",
  "employmentStatus": "Full-time",
  "firstName": "Ega Gofur",
  "gender": "Male",
  "grade": "Senior",
  "groupStructure": "Technology",
  "jobLevel": "Level 3",
  "jobPosition": "Software Engineer",
  "joinDate": "2023-01-01T00:00:00.000Z",
  "lastName": "Update",
  "mobilePhone": "+085655501860",
  "nik": "3507320906050002",
  "sbu": "Technology Solutions",
  "schedule": "9 AM - 5 PM",
  "barcode": "EMP001BAR",
  "bloodType": "A+",
  "citizenIdAddress": "123 Main St, City, Country",
  "manager": "Jane Smith",
  "maritalStatus": "Single",
  "phone": "+1987654321",
  "passportExpiry": "2030-12-31T00:00:00.000Z",
  "passportNumber": "AB1234561",
  "placeOfBirth": "New York",
  "postalCode": "12345",
  "religion": "Prefer not to say",
  "residentialAddress": "456 Oak St, City, Country"
}
```

- `PUT /employees/:id`: Update an existing employee

```bash
{
  "approvalLine": "Manager",
  "birthdate": "1990-01-15T00:00:00.000Z",
  "branch": "Main Branch",
  "class": "Class A",
  "department": "IT Department",
  "email": "egagofur@gmail.com",
  "employeeId": "EMP002",
  "employmentStatus": "Full-time",
  "firstName": "Ega Gofur Updated",
  "gender": "Male",
  "grade": "Senior",
  "groupStructure": "Technology",
  "jobLevel": "Level 3",
  "jobPosition": "Software Engineer",
  "joinDate": "2023-01-01T00:00:00.000Z",
  "lastName": "Update",
  "mobilePhone": "+1234567890",
  "nik": "3507320906050002",
  "sbu": "Technology Solutions",
  "schedule": "9 AM - 5 PM",
  "barcode": "EMP001BAR",
  "bloodType": "A+",
  "citizenIdAddress": "123 Main St, City, Country",
  "manager": "Jane Smith",
  "maritalStatus": "Single",
  "phone": "+1987654321",
  "passportExpiry": "2030-12-31T00:00:00.000Z",
  "passportNumber": "AB1234561",
  "placeOfBirth": "New York",
  "postalCode": "12345",
  "religion": "Prefer not to say",
  "residentialAddress": "456 Oak St, City, Country"
}
```

- `DELETE /employees/:id`: Delete an employee

## Demo vidio

### https://www.loom.com/share/53f8555a334148ab987ad47d59984ce9

### https://www.loom.com/share/600216b9433d437d818535968a7a8c04
