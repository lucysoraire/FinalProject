const express = require("express");
const router = express.Router();

let bloqueos = []; // guardamos los bloqueos en memoria (ejemplo simple)

router.get("/", (req, res) => {
  res.json(bloqueos);
});

router.post("/", (req, res) => {
  const nuevosBloqueos = req.body;
  if (!Array.isArray(nuevosBloqueos)) {
    return res.status(400).json({ error: "Se esperaba un array" });
  }
  bloqueos = nuevosBloqueos;
  res.status(201).json({ message: "Bloqueos guardados correctamente" });
});

module.exports = router;
