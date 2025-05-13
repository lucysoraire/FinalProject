const { createUser, searchUser } = require("../controllers/usersController");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await searchUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Erro" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const createdUser = await createUser({ email, password });
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
