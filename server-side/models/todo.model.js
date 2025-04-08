import mongoose from "mongoose";


const todoSchema=new mongoose.Schema(
    {
        title: {
          type: String,
          required: [true, "Title is required"],
          trim: true,
        },
        description: {
          type: String,
        },
        status: {
          type: String,
          enum: ["pending", "in-progress", "completed"],
          default: "pending",
        },
      },
      { timestamps: true }
);

export default mongoose.model.Todo|| mongoose.model("Todo",todoSchema);