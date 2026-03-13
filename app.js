// @ts-nocheck
<
script type = "module" >
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
    update
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCDSrE_hWvYYgjNwTX85leeU3vHBLBJsY",
    authDomain: "stylishsteps-10fc4.firebaseapp.com",
    databaseURL: "https://stylishsteps-10fc4-default-rtdb.firebaseio.com",
    projectId: "stylishsteps-10fc4",
    storageBucket: "stylishsteps-10fc4.firebasestorage.app",
    messagingSenderId: "32645603346",
    appId: "1:32645603346:web:ae022c525a85aaf7ad38cb",
    measurementId: "G-369VZP753G"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const productosRef = ref(db, "productos");

function generarID() {
    return Date.now().toString().slice(-6);
}

// ✅ AGREGAR PRODUCTO
window.agregarProducto = function() {
    const nombre = document.getElementById('nombre').value.trim();
    const imagen = document.getElementById('imagen').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const descuento = parseFloat(document.getElementById('descuento').value) || 0;

    if (!nombre || !imagen || !descripcion || !precio || !cantidad) {
        alert('❗Completa todos los campos.');
        return;
    }

    const precioFinal = parseFloat((precio - (precio * (descuento / 100))).toFixed(2));

    push(productosRef, {
        id: generarID(),
        nombre,
        imagen,
        descripcion,
        precio,
        cantidad,
        stockMaximo: cantidad,
        descuento,
        precioFinal
    });

    alert("✅ Producto guardado en Realtime Database");

    ['nombre', 'imagen', 'descripcion', 'precio', 'cantidad', 'descuento']
    .forEach(id => document.getElementById(id).value = '');
};

// ✅ MOSTRAR PRODUCTOS EN TIEMPO REAL
function mostrarProductos() {
    const contenedor = document.getElementById('listaProductos');

    onValue(productosRef, (snapshot) => {
                contenedor.innerHTML = "";

                snapshot.forEach(child => {
                            const p = child.val();
                            const key = child.key;

                            const div = document.createElement('div');
                            div.className = 'producto';

                            div.innerHTML = `
          ${p.descuento > 0 ? `<div class="etiqueta-oferta">En oferta</div>` : ''}
          <button onclick="eliminarProducto('${key}')" 
          style="position: absolute; right: 10px; top: 10px;">🗑</button>

          <img src="${p.imagen}" alt="${p.nombre}" />
          <div class="producto-content">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p><strong>Precio:</strong> 
            <span style="text-decoration: ${p.descuento > 0 ? 'line-through' : 'none'};">
            ${p.precio} $
            </span>
            ${p.descuento > 0 ? `<br><strong style="color: orange;">Ahora: ${p.precioFinal} $</strong>` : ''}
            </p>
            <p><strong>Stock:</strong> ${p.cantidad}</p>
            <p style="font-size: 12px; color: #aaa;">ID: ${p.id}</p>
          </div>
        `;

        contenedor.appendChild(div);
      });
    });
  }

  // ✅ ELIMINAR PRODUCTO
  window.eliminarProducto = function(key) {
    if (!confirm("¿Eliminar producto?")) return;

    remove(ref(db, "productos/" + key));
  };


  query(ref(db, "productos"), orderByChild("idProducto"), equalTo(idProducto))
  
  window.onload = mostrarProductos;

</script>