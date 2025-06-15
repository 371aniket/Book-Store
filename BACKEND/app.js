const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect", err));

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Book Schema with timestamps
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    image: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Book Model
const Book = mongoose.model('MyBook', BookSchema);

// Create a new book
app.post('/books', auth, async (req, res) => {
    try {
        const NewBook = new Book({
            ...req.body,
            user: req.user._id
        });
        await NewBook.save();
        res.status(201).json(NewBook);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get all books for the authenticated user
app.get('/books', auth, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id });
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get a book by ID (only if it belongs to the user)
app.get('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!book) return res.status(404).send('Book Not Found');
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Search books (only for the authenticated user)
app.get('/search', auth, async (req, res) => {
    const { title } = req.query;
    try {
        const books = await Book.find({
            title: { $regex: title, $options: 'i' },
            user: req.user._id
        });
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update a book by ID (only if it belongs to the user)
app.put('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!book) return res.status(404).send('Book Not Found');
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// DELETE a book by ID (only if it belongs to the user)
app.delete('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!book) return res.status(404).send('Book Not Found');
        res.json({ message: 'Book deleted successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

const PORT = 8010;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
