# MySQL + Express CRUD

Express API with MySQL (MAMP) for managing students. Data can be added through an HTML form or any API client such as Postman.

## Features

- `POST /students` inserts a student
- Input validation (`400` if name or email is missing)
- Duplicate emails are rejected (`409`)
- HTML form served from `public/`

## Setup

1. Start MAMP (MySQL on port 3306)
2. Create a database `my_database` and run:
   ```sql
   CREATE TABLE students (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE
   );
   ```
3. `npm install`
4. Copy `.env.example` to `.env` and fill in your values
5. `node app.js`
6. Open `http://localhost:3000/index.html`

## API

GET /students
GET /students/:id

### POST /students

Request body (JSON):

```json
{ "name": "Abel", "email": "abel@test.com" }
```

| Status | Meaning                  |
| ------ | ------------------------ |
| 201    | Student created          |
| 400    | Missing name or email    |
| 409    | Email already exists     |
| 500    | Server or database error |

## Roadmap

- [x] POST (create)
- [x] GET (read)
- [x] PUT (update)
- [x] DELETE (remove)

## Stack

- Node.js
- Express
- mysql2
- dotenv
