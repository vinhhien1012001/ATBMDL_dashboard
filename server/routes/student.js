import express from "express";
import {
  addNewStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/student.js";

const router = express.Router();

router.get("/students", getStudents);

router.post("/add", addNewStudent);

router.put("/edit/:id", updateStudent);

router.delete("/delete/:id", deleteStudent);

export default router;
