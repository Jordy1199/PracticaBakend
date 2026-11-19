import mongoose from 'mongoose';
const { Schema } = mongoose;

// Conexión
/*async function main (){
*/
export async function conectarDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shop');
  console.log('Database running ok');
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