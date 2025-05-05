const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (e.g., index.html)
app.use(express.static('.'));

// API endpoint to handle club joining
app.post('/api/join', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required!' });
    }

    // Simulate saving to a database (in a real app, use a database like MongoDB)
    console.log(`New member: ${name}, ${email}`);

    res.json({ message: `Welcome to Marina FIFA Club, ${name}!` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});