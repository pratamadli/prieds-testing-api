// routes/queue.js
const express = require("express");
const router = express.Router();
const { createQueue, getQueue } = require("../controller/queue");

router.post("/", createQueue);
router.get("/", getQueue);

module.exports = router;
