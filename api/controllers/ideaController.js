const { getDb } = require('../database/dbConnection');

const ObjectId = require('mongodb').ObjectId;

const getIdeas = async (req, res) => {
    const db = getDb();
    let ideas = [];
    console.log(req.query)

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
        category: filterRequest.category ? {$regex: filterRequest.category, $options: "i"} : null || {$exists: true},
    };

    if (timePeriodOptions[filterRequest.timePeriod]) {
        filter.postedOn = timePeriodOptions[filterRequest.timePeriod];
    }

    await db.collection('ideas')
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
}

const getIdea = async (req, res) => {
    const db = getDb();
    if (ObjectId.isValid(req.params.id)) {
        await db.collection('ideas')
            .findOne({_id: new ObjectId(req.params.id)})
            .then(doc => {
              res.status(200).json(doc);
            })
            .catch(() => {
              res.status(500).json({error: 'Error fetching idea'});
            })
    }
    else {
    res.status(500).json({error: 'Invalid ID'});
    }
}

const postIdea = async (req, res) => {
    const db = getDb();
    const idea = req.body;
    idea.lastUpdatedOn = new Date();
    await db.collection('ideas')
        .insertOne(idea)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(() => {
            res.status(500).json({error: 'Couldn\'t post the idea'});
        })
}

const deleteIdea = async (req, res) => {
    const db = getDb();
    if (ObjectId.isValid(req.params.id)) {
        await db.collection('ideas')
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
}

const updateIdea = async (req, res) => {
    const db = getDb();
    const requestType = req.params.requestType || null;
    const updates = req.body;
    const date = new Date();
    if (requestType == "updateIdea") {
        updates.lastUpdatedOn = date;
    }

    if (requestType == "postIdea") {
        updates.postedOn = date;
    }

    if (ObjectId.isValid(req.params.id)) {
        await db.collection('ideas')
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
}

module.exports = { getIdeas, getIdea, postIdea, updateIdea, deleteIdea };