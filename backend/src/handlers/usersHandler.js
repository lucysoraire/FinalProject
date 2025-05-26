const { createUser, searchUser, findUserByEmail  } = require("../controllers/usersController");

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


const checkUserExists = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email requerido" });

  try {
    const user = await findUserByEmail(email);
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el usuario" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  checkUserExists,
};
