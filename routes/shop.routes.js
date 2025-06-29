const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shop.controller');

router.get('/mascotas', ShopController.getMascotasTienda);
router.post('/comprar-mascota', ShopController.comprarMascota);
router.get('/mis-mascotas/:studentId', ShopController.getMascotasAlumno);

module.exports = router;