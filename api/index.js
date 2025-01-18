const express = require('express');
const { connectToDb, getDb } = require('./db');

//init app and middleware
const app = express();
const port = "3000";

//db connection
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(port, () => console.log(`Listening on ${port}`));
        db = getDb();
    }
})

app.get('/ideas', (req, res) => {
    let ideas = [];
    db.collection('ideas')
     .find()
     .batchSize(9)
     .forEach(idea => ideas.push(idea))
     .then(() => {
        res.status(200).json(ideas)
     })
     .catch(() => {
        res.status(500).json({error: 'Error fetching ideas'})
     })
    res.json({message: "api is live"});
});