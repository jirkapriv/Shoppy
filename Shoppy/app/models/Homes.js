const API_BASE_URL = "http://10.0.2.2:3000/";
// Creates Home
export const createHome = async (formData) => {
  try {
    const req = await fetch(`${API_BASE_URL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error creating home:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Fetch all homes
export const getAllHomes = async () => {
  try {
    const req = await fetch(`${API_BASE_URL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error fetching homes:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Fetch a specific home by ID
export const getHomeById = async (id) => {
  try {
    const req = await fetch(`${API_BASE_URL}${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error fetching home:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Fetch all lists within a home
export const getAllLists = async (homeId) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error fetching lists:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Fetch a specific list by ID
export const getListById = async (homeId, listId) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists/${listId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error fetching list:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Create a new list in a home
export const createList = async (homeId, formData) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error creating list:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Update a list's items
export const updateList = async (homeId, listId, formData) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists/${listId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formData),
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error updating list:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Delete a specific list
export const deleteList = async (homeId, listId) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists/${listId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error deleting list:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Add an item to a specific list
export const addItemToList = async (homeId, listId, item) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists/${listId}/items`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ item }),
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error adding item to list:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};

// Delete an item from a specific list
export const deleteItemFromList = async (homeId, listId, item) => {
  try {
    const req = await fetch(`${API_BASE_URL}${homeId}/lists/${listId}/items`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ item }),
    });
    const data = await req.json();
    return {
      status: req.status,
      payload: data.payload,
      msg: data.msg,
    };
  } catch (error) {
    console.error("Error deleting item from list:", error);
    return {
      status: 500,
      msg: "Error connecting to the server",
    };
  }
};
