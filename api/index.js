const express = require('express');
const { connectToDb, getDb } = require('./db');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')

//init app and middleware
const app = express();
const port = "3000";

app.use(cors());

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
        res.status(200).json(ideas);
     })
     .catch(() => {
        res.status(500).json({error: 'Error fetching ideas'});
     })
});

app.get('/idea/:id', (req, res) => {
    db.collection('ideas')
     .findOne({_id: new ObjectId(req.params.id)})
     .then(doc => {
        res.status(200).json(doc);
        // db.close();
     })
     .catch(() => {
        res.status(500).json({error: 'Error fetching idea'});
        // db.close();
     })
    // res.json({message: "api is live"});
});