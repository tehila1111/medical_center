const UsersService = require("../services/UsersService");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body; // Assuming user data is sent in the request body
    const newUser = await UsersService.createUser(userData);
    res.json({ data: newUser, status: "success", message: "User created successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UsersService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UsersService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body; // Assuming updated user data is sent in the request body
    const updatedUser = await UsersService.updateUser(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ data: updatedUser, status: "success", message: "User updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UsersService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ data: deletedUser, status: "success", message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UsersService.authenticateUser(name, password);

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

  
    res.json({ data: user, status: "success", message: "User login successfully." });
  } catch (error) {
    console.error('Error during user authentication:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};