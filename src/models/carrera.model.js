import mongoose from "mongoose";

const carreraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: Date.now,
    },
    categoria: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timesTamps: true,
  }
);

carreraSchema.index({ name: "text" });

export default mongoose.model("Carrera", carreraSchema);
