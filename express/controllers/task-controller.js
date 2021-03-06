const Controller = require('./controller');
const mongodb = require('mongodb');
const TaskTransformer = require('../transformers/task-transformer');

module.exports = class TaskController extends Controller {

    index(req, res) {
        super.connect('tasks', (collection) => {
            let find = {};
            if (req.query.done !== undefined) {
                find.done = req.query.done === 'true' ? true : false;
            }

            collection.find(find).toArray((err, result) => {
                if (err) {
                    console.error(err);
                    throw err;
                }

                res.send({
                    data: result.map((task) => (new TaskTransformer(task)).transform())
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
                    data: (new TaskTransformer(task)).transform()
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
            delete task.id;
            let toUpdate = {
                $set: Object.assign({}, task)
            };

            collection.updateOne({
                    _id: mongodb.ObjectID(req.params.id)
                }, toUpdate,
                (err, result) => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }

                    task._id = req.params.id;
                    res.send({
                        data: (new TaskTransformer(task)).transform()
                    });
                });
        });
    }
}
