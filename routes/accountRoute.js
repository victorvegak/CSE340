// unit 4  
//External Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

const regValidate = require('../utilities/account-validation')
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/registration", utilities.handleErrors(accountController.buildRegistration));
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)
// Process the login attempt

router.post(
  "/login",
  //regValidate.loginRules(),
  //regValidate.checkLoginData,
  (req, res) => {
    res.status(200).send('login process')
  }
  //utilities.handleErrors(accountController.loginAccount)
)

module.exports = router;