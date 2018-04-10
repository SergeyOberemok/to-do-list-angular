const path = require('path');
const TaskController = require('../controllers/task-controller');

module.exports = class Routes {

    constructor(app) {
        this.app = app;
        this.setUpRoutes();
    }

    setUpRoutes() {
        const taskController = new TaskController();
        this.app.get('/api/tasks', taskController.index);
        this.app.post('/api/tasks', taskController.store);
        this.app.delete('/api/tasks/:id', taskController.remove);
        this.app.put('/api/tasks/:id', taskController.update);
    }
};
