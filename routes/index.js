var express = require("express");
var router = express.Router();
const { createPolyclinic, getPolyclinic } = require("../controller/polyclinic");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.post("/polyclinic", createPolyclinic);
// router.get("/polyclinic/:code", getPolyclinic);

module.exports = router;
