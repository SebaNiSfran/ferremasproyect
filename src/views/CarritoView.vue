<template>
  <div class="container">
    <h1 class="titulo">Carrito de Compras</h1>

    <div v-if="carrito.length === 0" class="mensaje-vacio">
      <p>Tu carrito está vacío.</p>
    </div>

    <div v-else class="grid">
      <!-- Lista de Productos en el Carrito -->
      <div class="lista-productos">
        <div 
          v-for="item in carrito" 
          :key="item.id" 
          class="producto"
        >
          <img 
            :src="item.imagen" 
            :alt="item.nombre" 
            class="producto-img"
          >
          <div class="producto-info">
            <h3>{{ item.nombre }}</h3>
            <p class="precio">${{ item.precio.toFixed(2) }}</p>
          </div>
          <div class="cantidad">
            <button @click="reducirCantidad(item)" class="btn-control">-</button>
            <span class="cantidad-texto">{{ item.cantidad }}</span>
            <button @click="aumentarCantidad(item)" class="btn-control">+</button>
          </div>
          <button @click="eliminarDelCarrito(item)" class="btn-eliminar">
            Eliminar
          </button>
        </div>
      </div>

      <!-- Resumen de Compra -->
      <div class="resumen">
        <h2>Resumen</h2>
        <div class="detalle">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="detalle">
          <span>IVA (19%)</span>
          <span>${{ iva.toFixed(2) }}</span>
        </div>
        <div class="total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        <button @click="procederPago" class="btn-pago">
          Proceder al Pago
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarritoView',
  data() {
    return {
      carrito: []
    };
  },
  computed: {
    subtotal() {
      return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    },
    iva() {
      return this.subtotal * 0.19;
    },
    total() {
      return this.subtotal + this.iva;
    }
  },
  methods: {
    reducirCantidad(item) {
      const producto = this.carrito.find(p => p.id === item.id);
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      } else {
        this.eliminarDelCarrito(item);
      }
      this.guardarCarrito();
    },
    aumentarCantidad(item) {
      const producto = this.carrito.find(p => p.id === item.id);
      producto.cantidad += 1;
      this.guardarCarrito();
    },
    eliminarDelCarrito(item) {
      this.carrito = this.carrito.filter(p => p.id !== item.id);
      this.guardarCarrito();
    },
    guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    procederPago() {
      alert('✅ Pago realizado con éxito. ¡Gracias por tu compra!');
      this.carrito = [];
      this.guardarCarrito();
    }
  },
  mounted() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }
}
</script>

<style scoped>
/* Contenedor principal */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Título */
.titulo {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

/* Mensaje de carrito vacío */
.mensaje-vacio {
  text-align: center;
  font-size: 18px;
  color: gray;
  padding: 20px;
}

/* Grid principal */
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

/* Lista de productos */
.lista-productos {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Producto */
.producto {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.producto-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}

.producto-info {
  flex-grow: 1;
}

.precio {
  font-size: 16px;
  font-weight: bold;
  color: #2563eb;
}

/* Controles de cantidad */
.cantidad {
  display: flex;
  align-items: center;
}

.cantidad-texto {
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 5px;
  margin: 0 5px;
}

.btn-control {
  padding: 6px 10px;
  background: #e5e7eb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-control:hover {
  background: #d1d5db;
}

/* Botón eliminar */
.btn-eliminar {
  margin-left: 10px;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s;
}

.btn-eliminar:hover {
  color: #dc2626;
}

/* Resumen */
.resumen {
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.resumen h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.detalle {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 8px;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

/* Botón de pago */
.btn-pago {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 15px;
}

.btn-pago:hover {
  background: #1d4ed8;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
