// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

const inventoryValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));


router.get("/detail/", utilities.handleErrors(invController.buildByInventoryId501));
//router.get("/", utilities.handleErrors(invController.buildManagement));
router.get(
    "/",
    utilities.checkIfClient,
    utilities.handleErrors(invController.buildManagement)
);

//router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
//router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.get(
    "/add-classification",
    utilities.checkIfClient,
    utilities.handleErrors(invController.buildAddClassification)
);
router.get(
    "/add-inventory",
    utilities.checkIfClient,
    utilities.handleErrors(invController.buildAddInventory)
);

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON)); //learnAct select inv item
//router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView)); //updating unit5 step1
router.get(
    "/edit/:inv_id",
    utilities.checkIfClient,
    utilities.handleErrors(invController.editInventoryView)
);
//router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteInventoryView)); // teamAct unit5 
router.get(
    "/delete/:inv_id",
    utilities.checkIfClient,
    utilities.handleErrors(invController.deleteInventoryView)
);

//updating unit5 step2 
router.post(
    "/update/",
    utilities.checkIfClient, //checkifclient IND+++++++++++++++++
    inventoryValidate.inventoryRules(),
    inventoryValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
);

//deleting unit5 teamAct
//router.post("/delete/", utilities.handleErrors(invController.deleteInventory)); 
router.post("/delete/", utilities.checkIfClient, utilities.handleErrors(invController.deleteInventory));





router.post(
    "/add-classification",
    utilities.checkIfClient,
    inventoryValidate.addClassificationRules(),
    inventoryValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
);

router.post(
    "/add-inventory",
    utilities.checkIfClient,
    inventoryValidate.inventoryRules(),
    inventoryValidate.checkInventoryData,
    utilities.handleErrors(invController.addVehicle)
);



/* ****************************************
 *  get inventory for ajax route
  * unit 5 select inv item activity 
  * utilities.checkAccountType,
 * *************************************** */
//router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;