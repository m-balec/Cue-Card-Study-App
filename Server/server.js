const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/:id', (req, res) => {
    res.send(`Hello ${req.params.id}`);
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on http://localhost:${port}`);
    }
});

