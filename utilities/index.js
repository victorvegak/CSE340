const jwt = require("jsonwebtoken")
require("dotenv").config()
const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'

        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'

        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

 
/* **************************************
* Build details of vehicules view HTML
* ************************************ */

Util.buildInventoryGrid = async function(data){
  let grid = '';
  
  if(data.length > 0){
    
    
    data.forEach(vehicle => { 
      grid += '<li>';
      grid += '<div class="vehicle">';
      
      // Left side content
      grid += '<div class="left-content">';
      grid += '<h2>' + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2>';
      grid += '<a href="../../inv/detail/'+ vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model + 'details">';
      grid += '<img src="' + vehicle.inv_thumbnail +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />';
      grid += '</a>';
      grid += '</div>'; // End of left-content
      
      // Right side content
      grid += '<div class="right-content">';
      grid += '<div class="namePrice2">';
      grid += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2>';
      grid += '<p>';
      grid += '<strong> Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</strong>';
      grid += '</p>';
      grid += '<p>';
      grid += '<strong> Description: </strong>' + vehicle.inv_description + '</p>';
      grid += '<p>';
      grid += '<strong> Color: </strong>' + vehicle.inv_color + '</p>';
      grid += '<p>';
      grid += '<strong> Miles: </strong>' + vehicle.inv_miles + '</p>';
      grid += '</div>'; // End of namePrice
      grid += '</div>'; // End of right-content
      
      grid += '</div>'; // End of vehicle
      grid += '</li>';
    });
    
    
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  
  return grid;
};

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
*unit 5 login process activity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
}

/* ****************************************
 *  Check Login
 * unit 5 jwt authorize activity
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

Util.checkIfClient = (req, res, next) => {
  if (res.locals.accountData.account_type == 'Employee' || res.locals.accountData.account_type == 'Admin') {
    next()
  } else {
    req.flash("notice", "Page is Only Accessible to Employees.")
    return res.redirect("/account/login")
  }
}

module.exports = Util