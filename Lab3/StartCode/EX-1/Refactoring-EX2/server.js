// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next)=>{
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

//Home
app.get('/', (req, res) =>{
    res.status(200).send(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
});

//About
app.get('/about', (req, res) => {
    res.status(200).send('About us: at CADT, we love node.js!');
});

//contact-us
app.get('/contact-us', (req, res) =>{
    res.status(200).send('You can reach us via email...!');
});

//Products
app.get('/products', (req, res) =>{
    res.status(200).send('Buy one get one...');
});

//projects
app.get('/projects', (req, res) =>{
    res.status(200).send('Here are our awesome products');
});

//404
app.use((req, res) =>{
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
