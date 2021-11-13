require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;

// Creating connection to mongoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected'));


// Allowing express to serve static html + css files
app.use('/static', express.static('../Public'));
app.use(express.urlencoded({ extended: false }));

// displaying index page when users are on root page
app.get('/', (req, res) => {
    // Direct user to index page
    res.redirect(`http://localhost:${port}/static/index.html`);
});




app.post('/post-feedback', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.send('Data received.');
});





app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on http://localhost:${port}`);
    }
});

