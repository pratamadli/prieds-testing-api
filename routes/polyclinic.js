// routes/polyclinic.js
const express = require("express");
const router = express.Router();
const { createPolyclinic, getPolyclinic } = require("../controller/polyclinic");

router.post("/", createPolyclinic);
router.get("/", getPolyclinic);

module.exports = router;
