// const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');

// let dbConnection;

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect('mongodb://localhost:27017/mindhop')
//         .then((client) => {
//             dbConnection = client.db();
//             return cb();
//         })
//         .catch(err => {
//             console.log(err);
//             return cb(err);
//         })
//     },
//     getDb: () => dbConnection
// }


module.exports = {
    connectToDb: (cb) => {
        mongoose.connect('mongodb://localhost:27017/mindhop')
            .then(() => {
                // listen for requests
                // app.listen(process.env.PORT, () => {
                // console.log('connected to db & listening on port', process.env.PORT)
                // })
            })
            .catch((error) => {
                console.log(error)
                return cb(error)
            })
    }
}