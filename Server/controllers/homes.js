const Home = require("../models/homes");

// Get details of a specific home by ID
exports.getHomeByID = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      return res.status(200).send({
        msg: "Home found",
        payload: {
          ...home.toObject(),
          Lists: Object.fromEntries(home.Lists), // Convert Map to Object
        },
      });
    }
    return res.status(404).send({ msg: "Home not found" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error fetching home", error: error.message });
  }
};

// Get all lists in a home
exports.getAllLists = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      return res.status(200).send({
        msg: "Lists found",
        payload: Object.fromEntries(home.Lists), // Convert Map to Object
      });
    }
    res.status(404).send({ msg: "Home not found" });
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).send({ msg: "Error fetching lists", error });
  }
};

// Get a specific list by its name (listId)
exports.getListByID = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      const list = home.Lists.get(req.params.listId);
      if (list) {
        return res.status(200).send({
          msg: "List found",
          payload: { name: req.params.listId, items: list },
        });
      }
    }
    res.status(404).send({ msg: "List not found" });
  } catch (error) {
    console.error("Error fetching the list:", error);
    res.status(500).send({ msg: "Error fetching the list", error });
  }
};

// Create a new list in a home
exports.createList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      if (home.Lists.has(req.body.listName)) {
        return res.status(400).send({ msg: "List with this name already exists" });
      }

      home.Lists.set(req.body.listName, req.body.items || []); // Create new list
      const result = await home.save();

      return res.status(201).send({
        msg: "List created successfully",
        payload: Object.fromEntries(result.Lists), // Return updated lists
      });
    }
    res.status(404).send({ msg: "Home not found" });
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).send({ msg: "Error creating the list", error });
  }
};

// Update a list's items
exports.updateList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      const list = home.Lists.get(req.params.listId);
      if (list) {
        home.Lists.set(req.params.listId, req.body.items); // Update list items
        const result = await home.save();
        return res.status(200).send({
          msg: "List updated successfully",
          payload: result.Lists.get(req.params.listId), // Return updated list
        });
      }
    }
    res.status(404).send({ msg: "List not found" });
  } catch (error) {
    console.error("Error updating the list:", error);
    res.status(500).send({ msg: "Error updating the list", error });
  }
};

// Delete a specific list by its name (listId)
exports.deleteListByID = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      if (home.Lists.has(req.params.listId)) {
        home.Lists.delete(req.params.listId); // Remove the list
        const result = await home.save();
        return res.status(200).send({
          msg: "List deleted successfully",
          payload: Object.fromEntries(result.Lists), // Return updated lists
        });
      }
    }
    res.status(404).send({ msg: "List not found" });
  } catch (error) {
    console.error("Error deleting the list:", error);
    res.status(500).send({ msg: "Error deleting the list", error });
  }
};

// Add an item to a specific list
exports.addItemToList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      const list = home.Lists.get(req.params.listId);
      if (list) {
        if (list.includes(req.body.item)) {
          return res.status(400).send({ msg: "Item already exists in the list" });
        }
        list.push(req.body.item); // Add item
        home.Lists.set(req.params.listId, list);
        const result = await home.save();
        return res.status(200).send({
          msg: "Item added successfully",
          payload: result.Lists.get(req.params.listId), // Return updated list
        });
      }
    }
    res.status(404).send({ msg: "List not found" });
  } catch (error) {
    console.error("Error adding item to the list:", error);
    res.status(500).send({ msg: "Error adding item to the list", error });
  }
};

// Delete an item from a specific list
exports.deleteItemFromList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      const list = home.Lists.get(req.params.listId);
      if (list) {
        if (!list.includes(req.body.item)) {
          return res.status(404).send({ msg: "Item not found in the list" });
        }
        const updatedList = list.filter((item) => item !== req.body.item); // Remove item
        home.Lists.set(req.params.listId, updatedList);
        const result = await home.save();
        return res.status(200).send({
          msg: "Item removed successfully",
          payload: result.Lists.get(req.params.listId), // Return updated list
        });
      }
    }
    res.status(404).send({ msg: "List not found" });
  } catch (error) {
    console.error("Error removing item from the list:", error);
    res.status(500).send({ msg: "Error removing item from the list", error });
  }
};

// Create a new home
exports.createHome = async (req, res) => {
  try {
    const newHome = new Home({
      name: req.body.name,
      passHash: req.body.passHash, // Ensure password is hashed before saving
      QR: req.body.QR || null, // Optional QR code
    });

    const result = await newHome.save();
    if (result) {
      return res.status(201).send({
        msg: "New home created successfully",
        payload: result,
      });
    }
    res.status(500).send({ msg: "Failed to create home" });
  } catch (error) {
    console.error("Error creating home:", error);
    res.status(500).send({ msg: "Error creating home", error });
  }
};
