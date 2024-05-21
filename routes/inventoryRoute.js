// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
 
const inventoryValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
//router.get("/type/:classificationId", invController.buildByClassificationId);//
//router.get("/detail/:inventoryId", invController.buildByInventoryId);//
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));


router.get("/detail/", utilities.handleErrors(invController.buildByInventoryId501));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));


router.post("/add-classification", 
inventoryValidate.addClassificationRules(),
inventoryValidate.checkClassificationData,
utilities.handleErrors(invController.addClassification));


router.post("/add-inventory", 
inventoryValidate.inventoryRules(),
inventoryValidate.checkInventoryData,
utilities.handleErrors(invController.addVehicle));

module.exports = router;