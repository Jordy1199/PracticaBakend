import express from 'express';
import { conectarDB, Producto } from './database.js';

const app = express();
const port = 3000;

app.use(express.json());

const productoReferencia = {
  foto: '/img/isdin-spf50.jpg',
  titulo: 'ISDIN Protector Solar Fusion Water Magic Tono Medium SPF50 50ml',
  descripcion: 'Protector solar facial de alta protección, textura ultraligera.',
  precio: 25.32,
  contenido: '50 ml',
  cantidad: 1
};

app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

app.post('/producto', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json({
      mensaje: 'Producto guardado correctamente',
      id: producto._id
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error.message);
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

app.post('/producto/referencia', async (req, res) => {
  try {
    const producto = new Producto(productoReferencia);
    await producto.save();
    res.status(201).json({
      mensaje: 'Producto guardado correctamente',
      id: producto._id
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

conectarDB().then(() => {
  app.listen(port, (error) => {
    if (error) {
      console.error('No se pudo iniciar el servidor:', error.message);
      return;
    }
    console.log(`Example app listening on port ${port}`);
  });
});