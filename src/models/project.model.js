import mongoose from "mongoose";

// append index for searching to some fields
const projectSchema = new mongoose.Schema(
  {
    registration: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
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
    }
  },
  {
    timesTamps: true,
  }
);

projectSchema.index({
  title: "text",
  summary: "text",
});


export default mongoose.model("Proyect", projectSchema);
