// app.js
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const contenedor = document.getElementById("vistaProductos");

function abrirPago() {
  document.getElementById("modalOverlay").style.display = "block";
}
function cerrarPago() {
  document.getElementById("modalOverlay").style.display = "none";
}
function abrirDetalle(titulo, descripcion) {
  document.getElementById("detalleTitulo").innerText = titulo;
  document.getElementById("detalleDescripcion").innerText = descripcion;
  document.getElementById("modalDetalle").style.display = "block";
}
function cerrarDetalle() {
  document.getElementById("modalDetalle").style.display = "none";
}

// Cargar productos desde Firestore
async function mostrarProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));
  contenedor.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();

    // Validaciones
    const agotado = p.cantidad <= 0 ? `<div class="agotado">NO DISPONIBLE</div>` : "";
    const oferta =
      p.descuento && p.descuento > 0
        ? `<div class="etiqueta-oferta">${p.descuento}% OFF</div>`
        : "";

    const precioFinal = p.descuento && p.descuento > 0
      ? (p.precio - p.precio * (p.descuento / 100)).toFixed(2)
      : p.precio.toFixed(2);

    const precioHTML =
      p.descuento && p.descuento > 0
        ? `<p><span style="text-decoration: line-through; color: gray;">S/.${p.precio.toFixed(
            2
          )}</span><br><strong style="color: orange;">S/. ${precioFinal}</strong></p>`
        : `<p style="color: green;">S/. ${precioFinal}</p>`;

    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      ${agotado}
      ${oferta}
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      ${precioHTML}
      <p class="info-idstock">ID: ${doc.id} | Stock: ${p.cantidad}</p>
      <div class="botones">
        <button onclick="abrirPago()" ${p.cantidad <= 0 ? "disabled" : ""}>Comprar</button>
        <button onclick="abrirDetalle('${p.nombre}', '${p.descripcion}')">Detalles</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

mostrarProductos();
