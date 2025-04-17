// main.js

// Array para almacenar los productos en el carrito
let carrito = [];

// Cargar el carrito desde localStorage si existe
document.addEventListener("DOMContentLoaded", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarContadorCarrito();
  }
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto) {
  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.nombre === nombreProducto);

  if (productoExistente) {
    // Si ya existe, aumentar cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si no existe, agregar nuevo producto
    carrito.push({
      nombre: nombreProducto,
      cantidad: 1
    });
  }

  // Guardar carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();

  // Notificación visual
  mostrarNotificacion(`${nombreProducto} fue agregado al carrito`);
}

// Actualizar el número que se muestra en el ícono del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  contador.textContent = totalItems;
}

// Mostrar mensaje flotante al agregar producto
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement("div");
  notificacion.className = "notificacion-carrito";
  notificacion.textContent = mensaje;

  document.body.appendChild(notificacion);

  setTimeout(() => {
    notificacion.classList.add("visible");
  }, 100);

  setTimeout(() => {
    notificacion.classList.remove("visible");
    setTimeout(() => {
      document.body.removeChild(notificacion);
    }, 300);
  }, 2500);
}
