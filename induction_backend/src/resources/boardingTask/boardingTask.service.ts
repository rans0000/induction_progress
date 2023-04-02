import BoardingTaskModel from "@/resources/boardingTask/boardingTask.model";
import BoardingTask from "@/resources/boardingTask/boardingTask.interface"

class BoardingTaskService{
    private task = BoardingTaskModel;

    /**
     * Create a new task
     */
    public async create(title:string, body:string):Promise<BoardingTask> {
        try{
            const task = await this.task.create({title,body});
            return task;
        }
        catch(e){
            throw new Error('Unable to create task');
        }
    }
}

export default BoardingTaskService;