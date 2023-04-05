import BoardingTask from '@/resources/boardingTask/boardingTask.interface';
import BoardingTaskModel from '@/resources/boardingTask/boardingTask.model';

class BoardingTaskService {
    private task = BoardingTaskModel;

    /**
     * Create a new task
     */
    public async create(title: string, body: string): Promise<BoardingTask> {
        try {
            const task = await this.task.create({ title, body });
            return task;
        } catch (e) {
            throw new Error('Unable to create task');
        }
    }

    /**
     * get all boarding tasks
     */
    public async getTasks(): Promise<BoardingTask[] | Error> {
        try {
            const tasks = await this.task.find();
            return tasks;
        } catch (e) {
            throw new Error('Unable to retrieve tasks');
        }
    }
}

export default BoardingTaskService;
