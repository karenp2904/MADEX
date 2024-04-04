app.post('/producto/añadir', (req, res) => {
    
    const {nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol } = req.body;

    // Llamar al controlador para agregar el producto al carrito con la cantidad especificada
    controladorServer.s_añadirUsuario(nombre_usuario, apellido_usuario, correo, tipo_documento, contraseña, telefono, idRol);

    res.send('usuario añadido');
});