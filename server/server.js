import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import studentRoutes from "./routes/student.js";
import generalRoutes from "./routes/general.js";
import authRoutes from "./routes/auth.js";
import xlsx from "xlsx";
import * as path from "path";

// data imports

//
const __dirname = path.resolve();

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/student", studentRoutes);
app.use("/general", generalRoutes);
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Read excel file from path
    // let xlFile = xlsx.readFile("D:\\Code\\liberty-admin\\DS-HS-LIBERTY.xlsx");

    // Extract the data in sheet
    // let sheet = xlFile.Sheets[xlFile.SheetNames[0]];

    // Convert sheet into JSON
    // let dataStudents = xlsx.utils.sheet_to_json(sheet, { raw: false });
    // console.log("🚀dataStudents:", dataStudents);

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataStudents);
  })
  .catch((error) => console.log(`${error} did not connect`));

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join()))
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./", "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
