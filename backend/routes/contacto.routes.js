const express = require("express");
const router = express.Router();
const { sendContacto } = require("../controllers/contacto.controller");

router.post("/", sendContacto);

module.exports = router;