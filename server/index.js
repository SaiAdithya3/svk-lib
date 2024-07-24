import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.get("/", (req, res) => {
  res.send("Library Management System - Server");
});

app.listen(3000, () => {
  ConnectDB();
  console.log("We are on port 3000");
});
