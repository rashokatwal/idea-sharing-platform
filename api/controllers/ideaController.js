// const { getDb } = require('../database/dbConnection');

// const ObjectId = require('mongodb').ObjectId;
const Idea = require('../models/ideaModel')
const mongoose = require('mongoose');
const User = require('../models/userModel');

const getIdeas = async (req, res) => {

    let filterRequest = {};
    let sortOptions = {};
    let timePeriodOptions = {};
    let filter = {};
    const page = req.query.page || 0;
    const ideasPerPage = 6;
    // console.log(page);
    if(JSON.stringify(req.query) != '{}') {
        filterRequest = {
            "category": req.query.category.trim() == 0 ? null : req.query.category,
            "timePeriod": req.query.timePeriod.trim() == 0 ? null : req.query.timePeriod,
            "status": req.query.status.trim() == 0 ? null : req.query.status,
            "sortBy": req.query.time.trim() == 0 ? null : req.query.time
        }
    
        sortOptions = {
            "Most Liked": {"likes": -1},
            "Most Commented": {"comments": -1},
            "Recently Posted": {"postedOn": -1},
            "Recently Updated": {"lastUpdatedOn": -1},
            "Trending": {"reads": -1, "likes": -1, "comments": -1}
        }
    
        timePeriodOptions = {
            "Today": { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lte: new Date()},
            "Last 7 Days": { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), $lte: new Date() },
            "Last 30 Days": { $gte: new Date(new Date().setDate(new Date().getDate() - 30)), $lte: new Date() }
        }
    
        filter = {
            status: filterRequest.status || {$ne: 'Draft'},
            category: filterRequest.category ? {$regex: filterRequest.category, $options: "i"} : null || {$exists: true},
        };
    
        if (timePeriodOptions[filterRequest.timePeriod]) {
            filter.postedOn = timePeriodOptions[filterRequest.timePeriod];
        }
    }

    const totalIdeas = await Idea.countDocuments(filter);

    await Idea
        .find(filter)
        .sort(sortOptions[filterRequest.sortBy])
        .skip(page * ideasPerPage)
        .limit(ideasPerPage)
        .then((ideas) => {
            let allFilesFetched = false;
            if((page * ideasPerPage) + ideasPerPage >= totalIdeas) {
                allFilesFetched = true;
            }
            res.status(200).json({ideas, allFilesFetched});
        })
        .catch(() => {
            res.status(500).json({error: 'Error fetching ideas'});
        })
}

const getIdea = async (req, res) => {
    // const db = getDb();
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        await Idea
            .findById(req.params.id)
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
    // const db = getDb();
    const idea = req.body;
    await Idea
        .create(idea)
        .then(async (result) => {
            await User.updateOne(
                { _id: idea.author.id },
                {$addToSet: { postedIdeas: {ideaId: result._id, title: result.title, description: result.description, status: result.status, createdDate: result.createdAt} }}
            );
            res.status(201).json(result);

        })
        .catch(() => {
            res.status(500).json({error: 'Couldn\'t post the idea'});
        })
}

const deleteIdea = async (req, res) => {
    // const db = getDb();
    if (mongoose.Type.ObjectId.isValid(req.params.id)) {
        await Idea
            .findOneAndDelete({_id: req.params.id})
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
    try {
        const requestType = req.query.requestType || null;
        const updates = req.body;
        const date = new Date();
        const ideaId = req.params.id;

        if (requestType === "postIdea") {
            updates.postedOn = date;
        }

        if (!mongoose.Types.ObjectId.isValid(ideaId)) {
            return res.status(400).json({ error: "Invalid idea ID" });
        }

        // Update the idea document
        const result = await Idea.findOneAndUpdate(
            { _id: ideaId },
            updates,
            { new: true } // Returns the updated document
        );

        if (!result) {
            return res.status(404).json({ error: "Idea not found" });
        }

        // If status is updated, update the corresponding entry in postedIdeas
        if (updates.status && result.author?.id) {
            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: result.author.id,
                    "postedIdeas.ideaId": new mongoose.Types.ObjectId(ideaId)
                },
                { 
                    $set: { "postedIdeas.$.status": updates.status } 
                },
                { new: true } // Returns updated user
            );

            console.log("Updated User:", updatedUser);
        }

        res.status(200).json(result);

    } catch (err) {
        console.error("Error updating idea:", err);
        res.status(500).json({ error: "Error updating data" });
    }
};


const likeIdea = async (req, res) => {
    // const db = getDb();
    const {userId, ideaId} = req.body;
    // console.log(req.query);
    if (mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(ideaId)) {
        const user = await User.findOne({ _id: userId });
        if(user) {
            const alreadyLiked = user.likedIdeas.includes(ideaId);
            await User.updateOne(
                { _id: userId },
                alreadyLiked
                ? { $pull: { likedIdeas: ideaId } } 
                : { $addToSet: { likedIdeas: ideaId } } 
            ).then(async (result) => {
                await Idea.updateOne(
                    { _id: ideaId },
                    { $inc: { likes: alreadyLiked? -1 : 1 } }
                ).then(() => {
                    res.status(200).json({message: 'Idea liked successfully'});
                    // db.close();
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({error: 'Error updating likes'});
                    // db.close();
                })
            }).catch((error) => {
                console.log(error);
                res.status(500).json({error: 'Error updating user'});
            })
        }
        else {
            res.status(404).json({error: 'User not found'});
        }
    }
    else {
        res.status(500).json({error: 'Invalid ID'});
    }
}

const saveIdea = async (req, res) => {
    // const db = getDb();
    const {userId, ideaId} = req.body;
    // console.log(req.query);
    if (mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(ideaId)) {
        const user = await User.findOne({ _id: userId });
        if(user) {
            const alreadySaved = user.savedIdeas.includes(ideaId);
            await User.updateOne(
                { _id: userId },
                alreadySaved
                ? { $pull: { savedIdeas: ideaId } } 
                : { $addToSet: { savedIdeas: ideaId } } 
            ).then(async (result) => {
                res.status(200).json({message: 'Idea Saved successfully'});
            }).catch((error) => {
                console.log(error);
                res.status(500).json({error: 'Error Saving Idea'});
            })
        }
        else {
            res.status(404).json({error: 'User not found'});
        }
    }
    else {
        res.status(500).json({error: 'Invalid ID'});
    }
}

module.exports = { getIdeas, getIdea, postIdea, updateIdea, deleteIdea, likeIdea, saveIdea };