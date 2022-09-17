const express = require("express");
const router = express.Router();

const Record = require("../models/leaderboard");

router.get("/", async (request, response) => {
  try {
    const recordsQuick = await Record.find({ gameMode: "quick" })
      .sort({ points: -1 })
      .limit(10);
    const recordsAdvanced = await Record.find({ gameMode: "advanced" })
      .sort({ points: -1 })
      .limit(10);
    response.status(200).json([
      { gameMode: "quick", leaderBoard: recordsQuick },
      { gameMode: "advanced", leaderBoard: recordsAdvanced },
    ]);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.get("/:gameMode", async (request, response) => {
  const gameMode = request.params.gameMode;
  const responseObj = {};
  try {
    const recordsQuick = await Record.find({ gameMode: "quick" })
      .sort({ points: -1 })
      .limit(10);
    const recordsAdvanced = await Record.find({ gameMode: "advanced" })
      .sort({ points: -1 })
      .limit(10);
    if (gameMode == "quick") {
      responseObj.gameMode = "quick";
      responseObj.leaderBoard = recordsQuick;
    }
    if (gameMode == "advanced") {
      responseObj.gameMode = "advanced";
      responseObj.leaderBoard = recordsAdvanced;
    }
    if (gameMode != "quick" || gameMode != "advanced") {
      return response.status(400).json({ error: "bad requuest" });
    }
    response.status(200).json(responseObj);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  const record = new Record({
    name: request.body.name,
    points: request.body.points,
    gameMode: request.body.gameMode,
  });
  try {
    const newRecord = await record.save();
    response.status(201).json(newRecord);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

module.exports = router;
