// checkout.js
// Este script carga los productos del carrito desde localStorage y los muestra en el resumen de pedido del checkout.
// También gestiona la simulación de envío del formulario de pedido.

document.addEventListener("DOMContentLoaded", () => {
    const listaCheckout = document.getElementById("lista-checkout");
    const totalCheckout = document.getElementById("total-checkout");
    const formulario = document.getElementById("formularioCheckout");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    function mostrarProductosCheckout() {
      listaCheckout.innerHTML = "";
      let total = 0;
  
      if (carrito.length === 0) {
        listaCheckout.innerHTML = "<li>No hay productos en el carrito.</li>";
        totalCheckout.textContent = "$0 CLP";
        return;
      }
  
      carrito.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${producto.nombre}</span>
          <span>${producto.cantidad} x $${producto.precio} CLP</span>
        `;
        listaCheckout.appendChild(li);
  
        total += producto.precio * producto.cantidad;
      });
  
      totalCheckout.textContent = `$${total.toLocaleString("es-CL")} CLP`;
    }
  
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Simulamos que el pedido fue exitosamente enviado
      formulario.style.display = "none";
      mensajeConfirmacion.style.display = "block";
  
      // Limpiar carrito
      localStorage.removeItem("carrito");
      actualizarContadorCarrito(0);
    });
  
    function actualizarContadorCarrito(cantidad) {
      const contador = document.getElementById("contador-carrito");
      if (contador) {
        contador.textContent = cantidad;
      }
    }
  
    // Mostrar productos al cargar
    mostrarProductosCheckout();
  });
  