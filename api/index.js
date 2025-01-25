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

const dateTimeConverter = (date) => {
   const dateTime = {
      date: "",
      time: ""
   }
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   let hour = date.getHours();
   dateTime.date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
   dateTime.time = `${String(hour > 12 || hour == 0 ? Math.abs(hour - 12) : hour).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${hour > 12 ? "PM" : "AM"}`;
   return dateTime;
}

app.get('/ideas', (req, res) => {
    let ideas = [];
    console.log(dateTimeConverter(new Date()));
    const filterRequest = {
      "popularity": req.query.popularity.trim() == 0 ? null : req.query.popularity,
      "status": req.query.status.trim() == 0 ? null : req.query.status,
      "sortBy": req.query.time.trim() == 0 ? null : req.query.time
    }

    const sortOptions = {
      "Most Liked": {"likes": -1},
      "Most Commented": {"comments": -1},
      "Newest First": {"updatedDate": -1, "updatedTime": -1},
      "Oldest First": {"updatedDate": 1, "updatedTime": 1},
      "Trending": {"reads": -1, "likes": -1, "comments": -1}
    }
   //  const popularity = req.query.popularity.trim() == 0 ? null : req.query.popularity;
   //  const status = req.query.status.trim() == 0 ? null : req.query.status;
   //  const sortBy = req.query.time.trim() == 0 ? null : req.query.time;
    let filter = {
       status: filterRequest.status || {$ne: 'Draft'},
    };

    db.collection('ideas')
     .find(filter)
     .sort(sortOptions[filterRequest.sortBy])
     .limit (9)
     .forEach((idea) => {
         // let updatedDateTime = dateTimeConverter(idea.lastUpdatedOn);
         // let postedDateTime = dateTimeConverter(idea.postedOn)
         // idea.lastUpdatedOn = updatedDateTime;
         // idea.postedOn = postedDateTime;
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