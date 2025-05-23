// server.js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) =>{
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

//GET Home page
app.get('/', (req, res) =>{
    res.type('text/plain').send('Welcome to the home page');
});

// GET /contact — Form Page
app.get('/contact', (req, res) => {
    res.type('html').send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
        </form>
    `);
});

// POST /contact — Form Submission
app.post('/contact', (req, res) => {
    const name = req.body.name?.trim();

    if (!name) {
        return res.status(400).send(`
            <h1>400 Bad Request</h1>
            <p>Name cannot be empty.</p>
        `);
    }

    const submission = {
        name,
        timestamp: new Date().toISOString()
    };

    const filePath = path.join(__dirname, 'submissions.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let submissions = [];

        if (!err && data) {
            try {
                submissions = JSON.parse(data);
            } catch (e) {
                console.error("JSON parse error:", e);
            }
        }

        submissions.push(submission);

        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                console.error("Write error:", err);
                return res.status(500).send('Internal Server Error');
            }

            res.type('html').send(`
                <h1>Thank you, ${submission.name}!</h1>
                <p>Your submission was saved at ${submission.timestamp}</p>
            `);
        });
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).type('text/plain').send('404 Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
