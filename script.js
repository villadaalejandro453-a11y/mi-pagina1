let carrito = [];

function agregarCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);
  
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarCarrito();
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");

  if (!lista || !total) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button class="btn-eliminar" onclick="eliminarProducto('${item.nombre}')">🗑️</button>
    `;
    lista.appendChild(li);
    suma += item.precio * item.cantidad;
  });

  total.textContent = "Total: $" + suma.toLocaleString("es-CO");
}

function mostrarCarrito() {
  document.getElementById("modal-carrito").style.display = "block";
}

function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("modal-carrito");
  if (event.target === modal) modal.style.display = "none";
};

// 🔍 FILTRAR EMPANADAS
function filtrarEmpanadas() {
  const input = document.getElementById("busqueda");
  const filtro = input.value.toLowerCase();
  const cards = document.querySelectorAll(".menu-grid .card");

  cards.forEach((card) => {
    const nombre = card.querySelector("h3").textContent.toLowerCase();
    const descripcion = card.querySelector("p").textContent.toLowerCase();

    if (nombre.includes(filtro) || descripcion.includes(filtro)) {
      card.style.display = "block";
      card.classList.add("resaltado");
    } else {
      card.style.display = "none";
      card.classList.remove("resaltado");
    }
  });
}
