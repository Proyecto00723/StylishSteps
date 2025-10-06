import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const form = document.getElementById("formProducto");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    descripcion: form.descripcion.value,
    precio: parseFloat(form.precio.value),
    cantidad: parseInt(form.cantidad.value),
    descuento: parseFloat(form.descuento.value) || 0,
    imagen: form.imagen.value,
  };

  data.precioFinal = data.descuento > 0
    ? data.precio - (data.precio * data.descuento / 100)
    : data.precio;

  try {
    await addDoc(collection(db, "productos"), data);
    alert("✅ Producto guardado correctamente");
    form.reset();
  } catch (error) {
    alert("❌ Error al guardar: " + error.message);
  }
});
