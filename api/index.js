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

   const filterRequest = {
      "category": req.query.category.trim() == 0 ? null : req.query.category,
      "timePeriod": req.query.timePeriod.trim() == 0 ? null : req.query.timePeriod,
      "status": req.query.status.trim() == 0 ? null : req.query.status,
      "sortBy": req.query.time.trim() == 0 ? null : req.query.time
   }

   const sortOptions = {
      "Most Liked": {"likes": -1},
      "Most Commented": {"comments": -1},
      "Recently Posted": {"postedOn": -1},
      "Recently Updated": {"lastUpdatedOn": -1},
      "Trending": {"reads": -1, "likes": -1, "comments": -1}
   }

   const timePeriodOptions = {
      "Today": { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lte: new Date()},
      "Last 7 Days": { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), $lte: new Date() },
      "Last 30 Days": { $gte: new Date(new Date().setDate(new Date().getDate() - 30)), $lte: new Date() }
   }

   let filter = {
       status: filterRequest.status || {$ne: 'Draft'},
       category: filterRequest.category || {$exists: true},
   };

   if (timePeriodOptions[filterRequest.timePeriod]) {
      filter.postedOn = timePeriodOptions[filterRequest.timePeriod];
   }

    db.collection('ideas')
     .find(filter)
     .sort(sortOptions[filterRequest.sortBy])
     .limit(9)
     .forEach((idea) => {
         ideas.push(idea);
      })
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
   idea.lastUpdatedOn = new Date();
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
   const date = new Date();
   updates.lastUpdatedOn = date;
   if(updates.status !== "Draft") {
      updates.postedOn = date;
   }
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