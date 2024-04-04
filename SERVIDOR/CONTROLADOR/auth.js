const express = require('express')
const router = express.Router()

const {manejarInicioSesion, s_añadirUsuario} = require('./controllerServer.js')

router.post('/login', manejarInicioSesion)
router.post('/register', s_añadirUsuario)

module.exports = router
