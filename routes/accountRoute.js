//needed resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

const regValidate = require('../utilities/account-validation')
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/registration", utilities.handleErrors(accountController.buildRegistration));
// Unit5 IND++++++++++++++++++++++++
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdate));

/* ****************************************
 * deliver account management view
 * unit 5 jwt authorization activity
 * ************************************ */
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagement)) 


router.get("/all", utilities.checkLogin, utilities.handleErrors(accountController.viewAllAccounts));

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
  regValidate.loginRules(),
  regValidate.checkLoginData,
  accountController.accountLogin,
  utilities.handleErrors(accountController.accountLogin)
)

// Unit5 IND++++++++++++++++++++++++++
router.post(
  "/updateUser",
  regValidate.updateUserRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateUser)
)
router.post(
  "/updatePassword",
  regValidate.updatePasswordRules(),
  regValidate.checkUpdatePasswordData,
  utilities.handleErrors(accountController.updatePassword)
)



router.get(
  "/logout",
  utilities.handleErrors(accountController.logout)
)

module.exports = router;