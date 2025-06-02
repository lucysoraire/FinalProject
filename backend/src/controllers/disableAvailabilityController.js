const { DisableAvailability } = require("../../db");

const createDisableAvailability = async (data) => {
  // data puede ser un array o un objeto único
  if (Array.isArray(data)) {
    const newBlocks = await DisableAvailability.bulkCreate(data);
    return newBlocks;
  } else {
    const newBlock = await DisableAvailability.create(data);
    return newBlock;
  }
};

const getAllDisableAvailabilities = async () => {
  const blocks = await DisableAvailability.findAll();
  return blocks;
};

const deleteDisableAvailability = async (id) => {
  const result = await DisableAvailability.destroy({ where: { id } });
  return result;
};

module.exports = {
  createDisableAvailability,
  getAllDisableAvailabilities,
  deleteDisableAvailability,
};
