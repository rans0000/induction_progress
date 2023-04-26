import { Document } from 'mongoose';

export interface Task {
    taskId: String;
    status: boolean;
}

export default interface BoardingActivity extends Document {
    userId: String;
    isCompleted: boolean;
    tasks: Task[];
}
