const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (e.g., index.html)
app.use(express.static('.'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
