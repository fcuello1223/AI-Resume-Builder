import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/database.js";

const app = express();

const PORT = process.env.PORT || 8000;

//Database Connection
await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is Live..."));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on Port ${PORT}`);
});
