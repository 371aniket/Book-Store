const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
// Node.js/Express with CORS
app.use(cors({
  origin: 'https://book-store-frontend-nidc.onrender.com',
  credentials: true
}));


// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect", err));

// Book Schema with timestamps
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    image: String
}, { timestamps: true });

// Book Model
const Book = mongoose.model('MyBook', BookSchema);

// Create a new book
app.post('/books', async (req, res) => {
    try {
        const NewBook = new Book(req.body);
        await NewBook.save();
        res.status(201).json(NewBook);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book Not Found');
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Search books by title
app.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const books = await Book.find({ title: { $regex: title, $options: 'i' } }); // case-insensitive
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).send('Book Not Found');
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// DELETE a book by ID (💥 New Endpoint)
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book Not Found');
        res.json({ message: 'Book deleted successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start the server

const PORT = 8010;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
