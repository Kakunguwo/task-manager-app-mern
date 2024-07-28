import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "complete"],
        default: "pending",
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Task = model('Task',taskSchema )

export default Task;