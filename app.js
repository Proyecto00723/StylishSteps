// app.js
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Contenedor donde se mostrarán los productos
const contenedor = document.getElementById("productos");

// Leer productos de Firestore
async function cargarProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((doc) => {
    const producto = doc.data();
    contenedor.innerHTML += `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <p>Precio: ${producto.precio}</p>
        <img src="${producto.imagen}" width="100"/>
      </div>
    `;
  });
}

cargarProductos();
