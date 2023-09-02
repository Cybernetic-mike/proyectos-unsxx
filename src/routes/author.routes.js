import { Router } from "express";
import {
  getAuthors,
  createAuthor,
  getAuthor,
  deleteAuthor,
  updateAuthor
} from "../controllers/author.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { createAuthorSchema } from "../schemas/author.schema.js";

const router = Router();

router.get("/authors", getAuthors);
router.get("/authors/:id", authRequired, getAuthor);
router.post("/authors", authRequired, createAuthor);
router.delete("/authors/:id",authRequired, deleteAuthor);
router.put("/authors/:id",authRequired, updateAuthor);

export default router;