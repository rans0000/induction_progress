import { Schema, model } from 'mongoose';
import BoardingActivity from './boardingActivity.interface';

const taskSchema = new Schema({
    taskId: { type: String, required: true },
    status: { type: Boolean, required: true },
});

const BoardingActivitySchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        tasks: [taskSchema],
    },
    { timestamps: true }
);

export default model<BoardingActivity>(
    'BoardingActivity',
    BoardingActivitySchema
);
