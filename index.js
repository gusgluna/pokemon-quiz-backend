const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Conected to DataBase"));

const leaderboardRouter = require("./routes/leaderboard");
app.use("/leaderboard", leaderboardRouter);

app.listen(3007, () => console.log("Server Started!!!"));
