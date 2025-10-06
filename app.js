// app.js
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const contenedor = document.getElementById("vistaProductos");

// 🟢 Funciones para abrir/cerrar modales
window.abrirPago = function () {
  document.getElementById('modalOverlay').style.display = 'block';
};
window.cerrarPago = function () {
  document.getElementById('modalOverlay').style.display = 'none';
};
window.abrirDetalle = function (titulo, descripcion) {
  document.getElementById('detalleTitulo').innerText = titulo;
  document.getElementById('detalleDescripcion').innerText = descripcion;
  document.getElementById('modalDetalle').style.display = 'block';
};
window.cerrarDetalle = function () {
  document.getElementById('modalDetalle').style.display = 'none';
};

// 🔥 Cargar productos desde Firestore
async function mostrarProductos() {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    contenedor.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const p = doc.data();
      const agotado = p.cantidad <= 0 ? `<div class="agotado">NO DISPONIBLE</div>` : '';
      const oferta = p.descuento && p.descuento > 0 ? `<div class="etiqueta-oferta">${p.descuento}% OFF</div>` : '';
      const precioHTML = p.descuento && p.descuento > 0
        ? `<p><span style="text-decoration: line-through; color: gray">S/.${p.precio.toFixed(2)}</span><br><strong style="color: orange;">S/. ${p.precioFinal.toFixed(2)}</strong></p>`
        : `<p>S/. ${p.precio.toFixed(2)}</p>`;

      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        ${agotado}
        ${oferta}
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        ${precioHTML}
        <div class="info-adicional">ID: ${doc.id} | Stock: ${p.cantidad}</div>
        <button onclick="abrirPago()" ${p.cantidad <= 0 ? 'disabled' : ''}>Comprar</button>
        <button onclick="abrirDetalle('${p.nombre}', '${p.descripcion.replace(/'/g, "\\'")}')">Detalles</button>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    contenedor.innerHTML = "<p style='color:red;'>Error al cargar productos. Revisa tu conexión o configuración de Firebase.</p>";
  }
}

// 🔄 Mostrar productos al cargar la página
mostrarProductos();
