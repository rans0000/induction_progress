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
        } catch (err) {
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
        } catch (err) {
            throw new Error('Unable to retrieve tasks');
        }
    }

    /**
     * get one boarding task
     */
    public async getTask(_id: string): Promise<BoardingTask | Error> {
        try {
            const task = (await this.task.findById(_id)) as BoardingTask;
            return task;
        } catch (err) {
            throw new Error('Unable to retrieve task');
        }
    }

    /**
     * delete a boarding task
     */
    public async deleteTask(_id: string): Promise<any | Error> {
        try {
            const task = await this.task.deleteOne({ _id });
            return task;
        } catch (err) {
            throw new Error('Unable to delete task');
        }
    }
}

export default BoardingTaskService;
