const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Conected to DataBase"));

const leaderboardRouter = require("./routes/leaderboard");
app.use("/leaderboard", leaderboardRouter);

app.listen(3007, () => console.log("Server Started!!!"));
