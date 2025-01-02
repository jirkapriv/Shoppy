const Home = require("../models/homes")

exports.getHomeByID = async (req, res) => {
  try {
    const result = await Home.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Home found",
        payload: result,
      });
    }
    return res.status(404).send({
      msg: "Home not found",
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).send({
      msg: "Error fetching home",
      error: error.message,
    });
  }
};
exports.getAllLists = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      return res.status(200).send({
        msg: "Lists found",
        payload: home.Lists,
      });
        }
    res.status(404).send({
      msg: "Home not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error fetching lists",
      error,
    });
  }
};

// Get a specific list by list ID
exports.getListByID = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home && home.Lists.has(req.params.listId)) {
      return res.status(200).send({
        msg: "List found",
        payload: home.Lists.get(req.params.listId),
      });
    }
    res.status(404).send({
      msg: "List not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error fetching the list",
      error,
    });
  }
};

// Create a new list within a home
exports.createList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home) {
      home.Lists.set(req.body.listName, req.body.items || []);
      const result = await home.save();
      return res.status(201).send({
        msg: "List created",
        payload: result.Lists,
      });
    }
    res.status(404).send({
      msg: "Home not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error creating the list",
      error,
    });
  }
};

// Update a list's items completely
exports.updateList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home && home.Lists.has(req.params.listId)) {
      home.Lists.set(req.params.listId, req.body.items);
      const result = await home.save();
      return res.status(200).send({
        msg: "List updated",
        payload: result.Lists.get(req.params.listId),
      });
    }
    res.status(404).send({
      msg: "List not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error updating the list",
      error,
    });
  }
};

// Delete a specific list
exports.deleteListByID = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home && home.Lists.has(req.params.listId)) {
      home.Lists.delete(req.params.listId);
      const result = await home.save();
      return res.status(200).send({
        msg: "List deleted",
        payload: result.Lists,
      });
    }
    res.status(404).send({
      msg: "List not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error deleting the list",
      error,
    });
  }
};

// Add an item to a specific list
exports.addItemToList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home && home.Lists.has(req.params.listId)) {
      const list = home.Lists.get(req.params.listId);
      list.push(req.body.item);
      home.Lists.set(req.params.listId, list);
      const result = await home.save();
      return res.status(200).send({
        msg: "Item added to list",
        payload: result.Lists.get(req.params.listId),
      });
    }
    res.status(404).send({
      msg: "List not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error adding item to the list",
      error,
    });
  }
};

// Delete an item from a specific list
exports.deleteItemFromList = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home && home.Lists.has(req.params.listId)) {
      const list = home.Lists.get(req.params.listId).filter(
        (item) => item !== req.body.item
      );
      home.Lists.set(req.params.listId, list);
      const result = await home.save();
      return res.status(200).send({
        msg: "Item removed from list",
        payload: result.Lists.get(req.params.listId),
      });
    }
    res.status(404).send({
      msg: "List not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error removing item from the list",
      error,
    });
  }
};
exports.createHome = async (req, res) => {
  try {
    const newHome = new Home({
      name: req.body.name,
      passHash: req.body.passHash, // Ensure password is hashed before saving
      QR: req.body.QR || null, // Optional QR code
      Lists: {}, // Initialize with an empty map for lists
    });

    const result = await newHome.save();
    if (result) {
      return res.status(201).send({
        msg: "New home created successfully",
        payload: result,
      });
    }

    res.status(500).send({
      msg: "Failed to create home",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Error creating home",
      error,
    });
  }
};

