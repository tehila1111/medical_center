const Users = require("../models/users");

exports.getAllUsers = async () => {
  return Users.find();
};

exports.createUser = async (userData) => {
  return Users.create(userData);
};

exports.getUserById = async (id) => {
  return Users.findById(id);
};

exports.updateUser = async (id, data) => {
  return Users.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return Users.findOneAndDelete({ _id: id });
};
// Function to check user details for authentication
exports.authenticateUser = async (name, password) => {
  try {
    const user = await Users.findOne({ name });

    if (!user) {
      return null; // User not found
    }    

    if (!(user.password==password)) {
      return null; // Invalid password
    }

    return user;
  } catch (error) {
    throw new Error(`Error during user authentication: ${error.message}`);
  }
};