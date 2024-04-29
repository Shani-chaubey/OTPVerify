import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRoute from "./routes/userRoutes.js";

dotenv.config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log("Connected to MongoDB");
});

const app = express();

app.use(cors());
app.use(express.json());    


app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on port ${process.env.PORT}`);
});
