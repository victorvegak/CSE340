const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
 
const invCont = {}
 
/* ***************************
*  Build inventory by classification view
* ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
 const classification_id = req.params.classificationId
 const data = await invModel.getInventoryByClassificationId(classification_id)
 const grid = await utilities.buildClassificationGrid(data)
 let nav = await utilities.getNav()
 const className = data[0].classification_name
 res.render("./inventory/classification", {
   title: className + " vehicles",
   nav,
   grid,
 })
}
 
invCont.buildByInventoryId = async function (req, res, next) {
 const inv_id = req.params.inventoryId
 const data = await invModel.getInventoryById(inv_id)
 const grid = await utilities.buildInventoryGrid(data)
 let nav = await utilities.getNav()
 const className = data[0].classification_name
 res.render("./inventory/detailsvehicle", {
   title: className + " vehicles",
   nav,
   grid,
 })
}
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const title = "Vehicle Management";
  res.render("./inventory/management", {
    title: title,
    nav,
    errors: null,
  });
};

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const title = "Add New Classification";
  res.render("./inventory/add-classification", {
    title: title,
    nav,
    errors: null,
  });
};
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const title = "Add New Vehicle";
  let classificationList = await utilities.buildClassificationList();
  res.render("./inventory/add-inventory", {
    title: title,
    nav,
    classificationList,
    errors: null,
  });
};
/* ****************************************
 *  addClassification
 * *************************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;
  const addResult = await invModel.addClassification(classification_name);

  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added  ${classification_name}.`
    );
    let nav = await utilities.getNav();
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,

    });
  } else {
    req.flash("notice", "Sorry, the classification was invalid.");
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,

    });
  }
};
/* ****************************************
 *  addVehicle
 * *************************************** */
invCont.addVehicle = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const addResult = await invModel.addVehicle(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added  ${inv_make} ${inv_model}.`
    );
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the vehicle was invalid.");
    let classificationList = await utilities.buildClassificationList();
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
  }
};

invCont.buildByInventoryId501 = async function (req, res, next) {
  next({ status: 501, message: "Sorry, no id was selected." });

  let nav = await utilities.getNav();
  res.render("errors/error", {
    title: "501" || "Server Error",
    message,
    nav,
    errors: null,
  });
};

module.exports = invCont;