module.exports = class TaskTransformer {
    constructor(task) {
        this.task = task;
    }

    transform() {
        return {
            id: this.task._id,
            todo: this.task.todo,
            deadline: this.task.deadline,
            priority: this.task.priority,
            done: this.task.done,
        };
    }
}