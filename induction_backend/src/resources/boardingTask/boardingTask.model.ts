import { Schema, model } from "mongoose";
import BoardingTask from "@/resources/boardingTask/boardingTask.interface";

const BoardingTaskSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            unique:true
        },
        body:{
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

export default model<BoardingTask>('BoardingTask', BoardingTaskSchema);