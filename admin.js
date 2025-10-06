// admin.js
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Esperar a que cargue el DOM antes de acceder al formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");

  if (!form) {
    console.error("⚠️ No se encontró el formulario con id='formProducto'");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const descripcion = form.descripcion.value.trim();
    const precio = parseFloat(form.precio.value);
    const cantidad = parseInt(form.cantidad.value);
    const descuento = parseFloat(form.descuento.value) || 0;
    const imagen = form.imagen.value.trim();

    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad)) {
      alert("⚠️ Por favor completa todos los campos requeridos correctamente.");
      return;
    }

    const precioFinal = descuento > 0
      ? precio - (precio * descuento / 100)
      : precio;

    const data = {
      nombre,
      descripcion,
      precio,
      cantidad,
      descuento,
      imagen,
      precioFinal
    };

    try {
      await addDoc(collection(db, "productos"), data);
      alert("✅ Producto guardado correctamente");
      form.reset();
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("❌ Error al guardar: " + error.message);
    }
  });
});
