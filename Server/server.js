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


//EJS TEST
app.get('/', async (req, res) => {
    const cards = await Card.find();

    res.render('../views/index.ejs', {
        cards: cards
    });
});



// Getting all cards saved in database
app.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        console.log(JSON.stringify(cards));
        res.send(cards);
    } catch (err) {
        console.error(err);
    }
});


app.post('/post-feedback', async (req, res) => {
    // Saving to database
    const card = new Card({
        question: req.body.question,
        answer: req.body.answer
    });

    try {
        await card.save();
        console.log('Saved Successfully');
        //res.redirect('/create.html');
        res.redirect('back');
    } catch (err) {
        console.error(err);
    }
});


app.delete('/:id', getCard, async (req, res) => {
    try {
        //await Card.remove(res.card);
        await Card.deleteOne(res.card);
        console.log('Deleted successfully');
        res.redirect('back'); //page will NOT refresh
    } catch (err) {
        console.error(err);
    }
})



// Middleware to find an individual card from id
async function getCard(req, res, next) {
    let card;
    try {
        card = await Card.findById(req.params.id);
    } catch (err) {
        console.error(err);
    }

    res.card = card;
    next();
}




app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on http://localhost:${port}`);
    }
});

