import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    registration: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      default: Date.now,
    },
    email: {
      type: String,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carrera: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carrera",
    },
  },
  {
    timesTamps: true,
  }
);
export default mongoose.model("Author", taskSchema);
