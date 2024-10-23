const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Contact = require('./models/contact'); // Use Contact model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/portfolio'; // You may want to include the DB name
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Route to submit the contact form
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body; // Extract form data

    // Create new contact entry
    const newContact = new Contact({
        name,
        email,
        phone,
        message
    });

    try {
        // Save the contact form data to the database
        await newContact.save();
        res.status(200).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving contact', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
