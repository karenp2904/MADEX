
CREATE TABLE Proveedor (
    ID_Proveedor SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Direccion VARCHAR(255),
    Telefono VARCHAR(20),
    Correo_Electronico VARCHAR(255)
);

CREATE TABLE Productos (
    ID_Producto SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10, 3) NOT NULL,
    Estado_Producto VARCHAR(45),
    Color VARCHAR(45),
    Stock INT,
    Descuento DECIMAL(20),
    Proveedores_id_Proveedores INT,
    Categoria_idCategoria INT
);

CREATE TABLE Categoria (
    ID_Categoria SERIAL PRIMARY KEY,
    Nombre_Categoria VARCHAR(255) NOT NULL
);

CREATE TABLE Carrito_Compras (
    ID_Carrito SERIAL PRIMARY KEY,
    ID_Usuario INT REFERENCES Usuario(ID_Usuario),
    ID_Producto INT REFERENCES Productos(ID_Producto),
    Cantidad INT
);

CREATE TABLE Usuario (
    ID_Usuario SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Correo_Electronico VARCHAR(255) UNIQUE NOT NULL,
    Contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE Rol_Usuario (
    ID_Rol SERIAL PRIMARY KEY,
    Nombre_Rol VARCHAR(50) NOT NULL
);

CREATE TABLE Factura (
    ID_Factura SERIAL PRIMARY KEY,
    ID_Usuario INT REFERENCES Usuario(ID_Usuario),
    Fecha DATE NOT NULL,
    Total DECIMAL(10, 3) NOT NULL,
    Metodo_Pago INT REFERENCES Metodo_Pago(ID_Metodo_Pago)
);

CREATE TABLE Metodo_Pago (
    ID_Metodo_Pago SERIAL PRIMARY KEY,
    Nombre_Metodo VARCHAR(50) NOT NULL
);

CREATE TABLE Direccion (
    ID_Direccion SERIAL PRIMARY KEY,
    ID_Usuario INT REFERENCES Usuario(ID_Usuario),
    Calle VARCHAR(255),
    Ciudad VARCHAR(100),
    Codigo_Postal VARCHAR(10),
    Departamento VARCHAR(100),
    Barrio VARCHAR(100),
    Descripcion TEXT
);

CREATE TABLE Usuario_Rol (
    ID_Usuario INT REFERENCES Usuario(ID_Usuario),
    ID_Rol INT REFERENCES Rol_Usuario(ID_Rol),
    ID_Cliente INT REFERENCES Cliente(ID_Cliente),
    ID_Empresa INT REFERENCES Empresa(ID_Empresa),
    ID_Administrador INT REFERENCES Administrador(ID_Empleado),
    PRIMARY KEY (ID_Usuario, ID_Rol)
);

CREATE TABLE Empresa (
    ID_Empresa SERIAL PRIMARY KEY,
    NIT_Empresa VARCHAR(20) NOT NULL,
    Razon_Social VARCHAR(255) NOT NULL,
    Cargo VARCHAR(100),
    Rubro VARCHAR(100),
    Departamento VARCHAR(100),
    Ciudad VARCHAR(100),
    Direccion VARCHAR(255),
    Email VARCHAR(255),
    Telefono VARCHAR(20),
    Sitio_Web VARCHAR(255)
);
CREATE TABLE Cliente (
    ID_Cliente SERIAL PRIMARY KEY,
    NIT_Cliente VARCHAR(20) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Departamento VARCHAR(100),
    Ciudad VARCHAR(100),
    Direccion VARCHAR(255),
    Email VARCHAR(255),
    Telefono VARCHAR(20)
);

CREATE TABLE Administrador (
    ID_Empleado SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Cargo VARCHAR(100) NOT NULL
);



/*Inserts*/



INSERT INTO Proveedor (Nombre, Direccion, Telefono, Correo_Electronico)
VALUES ('Proveedor1', 'Direccion1', '1234567890', 'proveedor1@mail.com');

INSERT INTO Productos (Nombre, Descripcion, Precio, Estado_Producto, Color, Stock, Descuento, Proveedores_id_Proveedores, Categoria_idCategoria)
VALUES ('Producto1', 'Descripción del Producto1', 100.000, 'Activo', 'Rojo', 50, 0.00, 1, 1);

INSERT INTO Usuario (Nombre, Apellido, Correo_Electronico, Contrasena)
VALUES ('Usuario1', 'Apellido1', 'usuario1@mail.com', 'password123');

INSERT INTO Categoria (Nombre_Categoria)
VALUES (Mesas);

INSERT INTO Rol_Usuario (Nombre_Rol)
VALUES ('Admin'), ('Usuario');

INSERT INTO Metodo_Pago (Nombre_Metodo)
VALUES ('Tarjeta de crédito'), ('PayPal');

INSERT INTO Direccion (ID_Usuario, Calle, Ciudad, Codigo_Postal, Departamento, Barrio, Descripcion)
VALUES (1, 'Calle 1', 'Ciudad Ejemplo', '12345', 'Departamento 1', 'Barrio 1', 'Descripción de la dirección 1'),
       (2, 'Calle 2', 'Otra Ciudad', '54321', 'Departamento 2', 'Barrio 2', 'Descripción de la dirección 2');

INSERT INTO Carrito_Compras (ID_Usuario, ID_Producto, Cantidad)
VALUES (1, 1, 2), (2, 2, 1);

INSERT INTO Factura (ID_Usuario, Fecha, Total, Metodo_Pago)
VALUES (1, '2023-01-05', 250.000, 1), (2, '2023-01-05', 100.000, 2);

IF EXISTS (SELECT 1 FROM Usuario WHERE ID_Usuario = 1 AND Tipo_Usuario = 'Empresa') THEN
    INSERT INTO Empresa (NIT_Empresa, Razon_Social, Cargo, Rubro, Departamento, Ciudad, Direccion, Email, Telefono, Sitio_Web)
    VALUES ('123456789', 'MADEX S.A.', 'CEO', 'Tecnología', 'Santander', 'Bucaramanga', 'direccion1', 'info@madex.com', '321-1234567', 'https://www.madex.com');
ELSE
    RAISE EXCEPTION 'El usuario no es una empresa.';
END IF;

IF EXISTS (SELECT 1 FROM Usuario WHERE ID_Usuario = 1 AND Tipo_Usuario = 'Cliente') THEN
    INSERT INTO Cliente (ID_Cliente, Nombre, Apellido, Departamento, Ciudad, Direccion, Email, Telefono)
    VALUES ('1', 'Nombre', 'Apellido', 'Antioquia', 'Medellín', 'Direccion1', 'correo@mail.com', '300-9876543');
ELSE
    RAISE EXCEPTION 'El usuario no es un cliente.';
END IF;

IF EXISTS (SELECT 1 FROM Usuario WHERE ID_Usuario = 1 AND Tipo_Usuario = 'Administrador') THEN
    INSERT INTO Administrador (Nombre, Apellido, Cargo)
    VALUES ('Nombre', 'Apellido', 'Gerente de Proyectos');
ELSE
    RAISE EXCEPTION 'El usuario no es un administrador.';
END IF;



/*Métodos*/



/*Eliminar_Id_User*/

DELETE FROM Usuario WHERE ID_Usuario = 1;

/*Obtener_Id_User*/

SELECT * FROM Usuario WHERE ID_Usuario = 1;

/*Actualizar_User*/

UPDATE Usuario
SET Nombre = 'Name',
    Apellido = 'Lastname',
    Correo_Electronico = 'correo@mail.com',
    Contrasena = 'new_password'
WHERE ID_Usuario = 1;

/*Obtener_info_User*/

SELECT * FROM Usuario;
