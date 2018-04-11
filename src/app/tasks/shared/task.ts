export class Task {
    id?: string;
    todo: string;
    deadline: string;
    priority: number;
    done: boolean;

    constructor() {
        this.todo = '';
        this.deadline = null;
        this.priority = 0;
        this.done = false;
    }

    public getPriorityContext(): string {
        switch (this.priority) {
            case 1:
                return 'priority-1';
            case 2:
                return 'priority-2';
            case 3:
                return 'priority-3';
            default:
                return 'priority-0';
        }
    }

}
