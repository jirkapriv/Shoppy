const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homes");

// Routes for Home
router.post("/", HomeController.createHome);
router.get("/:id", HomeController.getHomeByID); // Get details of a specific home
router.post("/:id/lists", HomeController.createList); // Create a new list 

// Routes for Lists
router.get("/:id/lists", HomeController.getAllLists); // Get all lists in home 
router.get("/:id/lists/:listId", HomeController.getListByID); // Get a specific list by ID
router.put("/:id/lists/:listId", HomeController.updateList); // Update a list 
router.delete("/:id/lists/:listId", HomeController.deleteListByID); // Delete a specific list

// Routes for List Items
router.post("/:id/lists/:listId/items", HomeController.addItemToList); // Add an item to a specific list
router.delete("/:id/lists/:listId/items", HomeController.deleteItemFromList); // Delete an item from a specific list

module.exports = router;
