import mongoose from "mongoose";

const carreraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: Date.now,
      required: true
    },
    categoria: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
  },
  {
    timesTamps: true,
  }
);

carreraSchema.index({ name: "text" });

export default mongoose.model("Carrera", carreraSchema);
