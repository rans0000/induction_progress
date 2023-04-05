import BoardingTask from '@/resources/boardingTask/boardingTask.interface';
import { Schema, model } from 'mongoose';

const BoardingTaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

export default model<BoardingTask>('BoardingTask', BoardingTaskSchema);
