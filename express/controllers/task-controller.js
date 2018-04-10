const Controller = require('./controller');
const mongodb = require('mongodb');

module.exports = class TaskController extends Controller {

    index(req, res) {
        super.connect('tasks', (collection) => {
            collection.find({}).toArray((err, result) => {
                if (err) {
                    console.error(err);
                    throw err;
                }

                res.send({
                    data: result
                });
            });
        });
    }

    store(req, res) {
        super.connect('tasks', (collection) => {
            let task = req.body;

            collection.insertOne(task, (err, result) => {
                if (err) {
                    console.error(err);
                    throw err;
                }

                res.send({
                    data: task
                });
            });
        });
    }

    remove(req, res) {
        super.connect('tasks', (collection) => {
            collection.deleteOne({
                _id: mongodb.ObjectID(req.params.id)
            }, (err, obj) => {
                if (err) {
                    console.error(err);
                    throw err;
                }

                res.send({
                    data: 1
                });
            });
        });
    }

    update(req, res) {
        super.connect('tasks', (collection) => {
            let task = req.body;
            delete task._id;

            collection.updateOne({
                    _id: mongodb.ObjectID(req.params.id)
                }, {
                    $set: task
                },
                (err, result) => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }

                    res.send({
                        data: task
                    });
                });
        });
    }
}
