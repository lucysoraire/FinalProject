const {
  createDisableAvailability,
  getAllDisableAvailabilities,
  deleteDisableAvailability,
} = require("../controllers/disableAvailabilityController");

const createBlockHandler = async (req, res) => {
  try {
    const data = req.body;
    const newBlock = await createDisableAvailability(data);
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBlocksHandler = async (req, res) => {
  try {
    const blocks = await getAllDisableAvailabilities();
    res.status(200).json(blocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlockHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteDisableAvailability(id);
    if (result === 1) {
      res.status(200).json({ message: "Bloqueo eliminado" });
    } else {
      res.status(404).json({ error: "Bloqueo no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBlockHandler,
  getBlocksHandler,
  deleteBlockHandler,
};
