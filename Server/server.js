require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const Card = require('../models/card');


// Creating connection to mongoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected'));

// Setting view engine to ejs
app.set('view engine', 'ejs');

// Allowing express to serve static html + css files
app.use('/', express.static('../Public'));
app.use(express.urlencoded({ extended: true }));


// INDEX
app.get('/', async (req, res) => {
    // Getting all cards from database
    const cards = await Card.find();

    // Display index.ejs file and pass to it the array of Card objects
    // This allows for easy dynamic rendering of these items on the front end
    res.render('index.ejs', { cards: cards });
});


// CREATE
app
    .route('/create')
    .get( async (req, res) => {
    res.render('create.ejs');
    })
    .post( async (req, res) => {
    // Saving to database
    const card = new Card({
        question: req.body.question,
        answer: req.body.answer,
        subject: req.body.subject
    });

    try {
        await card.save();
        console.log('Saved Successfully');
        //res.redirect('/create.html');
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
});


// DELETE - using get since html does not support making delete requests from in browser
app.get('/delete/:id', async (req, res) => {
    try {
        // Removing card by id
        await Card.findByIdAndDelete(req.params.id);
        console.log('Deleted successfully');
        res.redirect('back');
    } catch (err) {
        console.error(err);
    }
});


// UPDATE
app
    .route('/edit/:id')
    .get( async (req, res) => {
        try {
            const card = await Card.findById(req.params.id);
            console.log('Record found');
            res.render('edit.ejs', { card: card });
        } catch (err) {
            console.error(err);
        }
    })
    .post((req, res) => {
        const id = req.params.id;
        Card.findByIdAndUpdate(id, { question: req.body.question, answer: req.body.answer, subject: req.body.subject }, err => {
            if (err) return console.error(err);
            res.redirect('/');
        });
});



app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on http://localhost:${port}`);
    }
});

