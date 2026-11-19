import mongoose from 'mongoose';
const { Schema } = mongoose;

// Conexión: usa la variable de entorno en Vercel y la local en tu PC
export async function conectarDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shop';
  await mongoose.connect(uri);
  console.log('MongoDB conectado');
}

// Modelo
const productoSchema = new Schema({
  foto: { type: String, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  contenido: { type: String, required: true },
  cantidad: { type: Number, required: true }
});

export const Producto = mongoose.model('Producto', productoSchema);
