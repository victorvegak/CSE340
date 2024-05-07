-- Insert the following new record to the account table
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Modify the Tony Stark record to change the account_type
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
--Delete the Tony Stark record from the database.
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
--Modify the "GM Hummer" record to read "a huge interior"
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_description LIKE '%GM Hummer%';
--Use an inner join to select the make and model fields
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM inventory AS i
    INNER JOIN classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
--Update all records in the inventory table
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');