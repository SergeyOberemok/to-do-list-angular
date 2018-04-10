const MongoClient = require('mongodb').MongoClient;

module.exports = class Controller {

    connect(collectionName, callback) {
        MongoClient.connect('mongodb://localhost:27017', (err, db) => {
            if (err) {
                console.error(err);
                throw err;
            }

            let dbo = db.db('dbToDoList');
            let collection = dbo.collection(collectionName);

            callback(collection);

            db.close();
        });
    }
};
