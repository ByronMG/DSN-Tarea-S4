const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let clientes = [
    { id: 1, nombre: 'Cliente 1: Byron', edad: 18 },
    { id: 2, nombre: 'Cliente 2: Juan', edad: 20 },
    { id: 3, nombre: 'Cliente 3: Pepe', edad: 23 }
];

let productos = [
    { id: 1, nombre: 'Producto 1: Aceite', precio: 10 },
    { id: 2, nombre: 'Producto 2: Galleta', precio: 20 },
    { id: 3, nombre: 'Producto 3: Gaseosa', precio: 30 }
];

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación Express');
});

// Ruta para mostrar clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta para mostrar productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para agregar un cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Ruta para agregar un producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un cliente por ID
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    const index = clientes.findIndex(cliente => cliente.id === parseInt(id));
    if (index !== -1) {
        clientes[index] = { id: parseInt(id), nombre, edad };
        res.json(clientes[index]);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Ruta para actualizar un producto por ID
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const index = productos.findIndex(producto => producto.id === parseInt(id));
    if (index !== -1) {
        productos[index] = { id: parseInt(id), nombre, precio };
        res.json(productos[index]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta para eliminar un cliente por ID
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    clientes = clientes.filter(cliente => cliente.id !== parseInt(id));
    res.sendStatus(204);
});

// Ruta para eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(producto => producto.id !== parseInt(id));
    res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
