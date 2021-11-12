require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port;

// Allowing express to serve static html + css files
app.use('/static', express.static('../Public'));

app.get('/', (req, res) => {
    // Direct user to index page
    res.redirect(`http://localhost:${port}/static/index.html`);
});


app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on http://localhost:${port}`);
    }
});

