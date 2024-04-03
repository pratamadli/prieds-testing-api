// routes/visitors.js
const express = require("express");
const router = express.Router();
const { createVisitor, getVisitor } = require("../controller/visitor");

router.post("/", createVisitor);
router.get("/", getVisitor);

module.exports = router;
