// app.js
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const contenedor = document.getElementById("vistaProductos");

function abrirPago() {
  document.getElementById('modalOverlay').style.display = 'block';
}
function cerrarPago() {
  document.getElementById('modalOverlay').style.display = 'none';
}
function abrirDetalle(titulo, descripcion) {
  document.getElementById('detalleTitulo').innerText = titulo;
  document.getElementById('detalleDescripcion').innerText = descripcion;
  document.getElementById('modalDetalle').style.display = 'block';
}
function cerrarDetalle() {
  document.getElementById('modalDetalle').style.display = 'none';
}

// Cargar productos desde Firestore
async function mostrarProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));
  contenedor.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();
    const agotado = p.cantidad <= 0 ? `<div class="agotado">NO DISPONIBLE</div>` : '';
    const oferta = p.descuento && p.descuento > 0 ? `<div class="etiqueta-oferta">${p.descuento}% OFF</div>` : '';
    const precioHTML = p.descuento && p.descuento > 0
      ? `<p><span style="text-decoration: line-through; color: gray">S/.${p.precio.toFixed(2)}</span><br><strong style="color: orange;">S/. ${p.precioFinal.toFixed(2)} </strong></p>`
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
      <button onclick="abrirDetalle('${p.nombre}', '${p.descripcion}')">Detalles</button>
    `;
    contenedor.appendChild(div);
  });
}

mostrarProductos();
