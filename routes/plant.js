// const
const express = require("express");
const router = express.Router();

// middlewares
const authorized = require("../middleware/auth");

// controllers
const createPlant = require('../controllers/plant/create')
const deletePlant = require('../controllers/plant/delete')
const getPlantsByCoordinates = require("../controllers/plant/getAllFromCoordinates")
const addGuardian = require("../controllers/plant/addGuardian")
const removeGuardian = require("../controllers/plant/removeGuardian")

//create
router.post("/users/:id/plants", authorized, createPlant.create);

//read
router.get("/by-coordinates/:lat/:lng", getPlantsByCoordinates.getAll);

//update
router.put("/:plantId/addGuardian", authorized, addGuardian.update); 
router.put("/:plantId/removeGuardian", authorized, removeGuardian.update)

//delete
router.delete("/:type/:id", authorized, deletePlant.delete);





module.exports = router;
