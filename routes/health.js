// const
const express = require("express");
const router = express.Router();


// controllers
const getHealth = require('../controllers/health/get')


// read
router.get("/", getHealth.get);


module.exports = router;