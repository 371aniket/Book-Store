# Book Store API

A Node.js + Express + MongoDB backend for managing a book collection.  
Includes CRUD operations and search functionality.

## Tech Stack
- Node.js
- Express
- MongoDB (via Mongoose)
- dotenv

## API Endpoints
- `POST /books` – Add a new book
- `GET /books` – Get all books
- `GET /books/:id` – Get book by ID
- `PUT /books/:id` – Update book by ID
- `DELETE /books/:id` – Delete book
- `GET /search?title=XYZ` – Search books by title
