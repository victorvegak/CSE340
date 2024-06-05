const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 * unit 3
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryById error " + error)
  }
}

async function getInventoryByInvId2(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryByInvId error " + error)
  }
}

/* *****************************
*   Register new account
* *************************** */
async function addClassification(classification_name){
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}
/* **********************
*   Check for existing Classification
* ********************* */
async function checkClassification(classification_name){
try {
  const sql = "SELECT * FROM classification WHERE classification_name = $1"
  const classification = await pool.query(sql, [classification_name])
  return classification.rowCount
} catch (error) {
  return error.message
}
}    
/* **********************
*   Check for existing inventory
* ********************* */
async function checkVehicle(inv_make, inv_model){
  try {
    const sql = "SELECT * FROM inventory WHERE inv_make =$1 AND inv_model = $2"
    const vehicle = await pool.query(sql, [inv_make, inv_model])
    return vehicle.rowCount
  } catch (error) {
    return error.message
  }
  }   
/* *****************************
*   Register new Vehicle
* *************************** */
async function addVehicle(inv_make, inv_model, inv_year, 
	inv_description, inv_image, inv_thumbnail,
	inv_price, inv_miles, inv_color, classification_id){
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, 
      inv_description, inv_image, inv_thumbnail,
      inv_price, inv_miles, inv_color, classification_id])
  } catch (error) {
    return error.message
  }
}  

/* ***************************
 *  Update Inventory Data
 * unit 5 step 2
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* ***************************
 *  Delete Inventory Item TEAM-ACT unit5
 * ************************** */
async function deleteInventory(inv_id) {
  try {
    const sql = 'DELETE FROM inventory WHERE inv_id = $1'
    const data = await pool.query(sql, [inv_id])
  return data
  } catch (error) {
    new Error("Delete Inventory Error")
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryById, addClassification,
  checkClassification, checkVehicle, addVehicle, updateInventory, deleteInventory, getInventoryByInvId2
};