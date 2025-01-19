const express = require('express');
const { connectToDb, getDb } = require('./db');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')

//init app and middleware
const app = express();
const port = "3000";

app.use(cors());
app.use(express.json());

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
   if (ObjectId.isValid(req.params.id)) {
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
   }
   else {
      res.status(500).json({error: 'Invalid ID'});
   }
});

app.post('/idea', (req, res) => {
   const idea = req.body;

   db.collection('ideas')
    .insertOne(idea)
    .then((result) => {
        res.status(201).json(result);
     })
    .catch(() => {
        res.status(500).json({error: 'Couldn\'t post the idea'});
     })
})

app.delete('/idea/:id', (req, res) => {
   if (ObjectId.isValid(req.params.id)) {
      db.collection('ideas')
         .deleteOne({_id: new ObjectId(req.params.id)})
         .then(result => {
            res.status(200).json(result);
            // db.close();
         })
         .catch(() => {
            res.status(500).json({error: 'Error fetching idea'});
            // db.close();
         })
   }
   else {
      res.status(500).json({error: 'Invalid ID'});
   }
});

app.patch('/idea/:id', (req, res) => {
   const updates = req.body;

   if (ObjectId.isValid(req.params.id)) {
      db.collection('ideas')
         .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
         .then(result => {
            res.status(200).json(result);
            // db.close();
         })
         .catch(() => {
            res.status(500).json({error: 'Error updating data'});
            // db.close();
         })
   }
   else {
      res.status(500).json({error: 'Invalid ID'});
   }
});