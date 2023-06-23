const userService = require('../services/UserService');

/**
 * Get all users.
 * @route GET /users
 * @returns {Promise<object[]>} A promise that resolves to an array of user objects.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

/**
 * Get a user by ID.
 * @route GET /users/{id}
 * @param {number} id - The ID of the user.
 * @returns {Promise<object>} A promise that resolves to the user object.
 */
const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

/**
 * Create a new user.
 * @route POST /users
 * @param {object} user - Information about the user to be created.
 * @param {string} user.email - The user's email address.
 * @param {string} user.username - The user's username.
 * @param {string} user.password - The user's password.
 * @param {string} user.role - The user's role.
 * @returns {Promise<object>} A promise that resolves to the created user object.
 */
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

/**
 * Update a user by ID.
 * @route PUT /users/{id}
 * @param {number} id - The ID of the user to be updated.
 * @param {object} user - Updated information about the user.
 * @returns {Promise<object>} A promise that resolves to the updated user object.
 */
const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const updatedUser = await userService.updateUser(userId, userData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

/**
 * Delete a user by ID.
 * @route DELETE /users/{id}
 * @param {number} id - The ID of the user to be deleted.
 * @returns {Promise<object>} A promise that resolves to a success message.
 */
const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedUser = await userService.deleteUser(userId);
    if (deletedUser) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

/**
 * Connecte un utilisateur.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
     // Call the login function from the userService
    const user = await userService.login(email, password);
    if (user) {
      // res.json(user);
      res.json({ message: 'User connected' });
      // console.log(user.email);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
};

/**
 * Enregistre un nouvel utilisateur.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
  try {
    const { email, username, password} = req.body;
    // Call the register function from the userService
    const newUser = await userService.register(email, username, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    register
};
