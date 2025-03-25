<template>
  <div class="container">
    <!-- Encabezado -->
    <div class="header">
      <h1>Catálogo de Productos</h1>
      <div class="carrito">
        <router-link to="/carrito" class="carrito-icono">
          <svg xmlns="http://www.w3.org/2000/svg" class="icono" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cantidadCarrito > 0" class="contador">{{ cantidadCarrito }}</span>
        </router-link>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="grid">
      <!-- Sección de Filtros -->
      <div class="filtros">
        <h2>Filtros</h2>
        <input v-model="filtros.busqueda" placeholder="Buscar productos..." class="input-busqueda" />

        <div class="categoria">
          <h3>Categorías</h3>
          <label v-for="categoria in categorias" :key="categoria">
            <input type="checkbox" :value="categoria" v-model="filtros.categorias">
            {{ categoria }}
          </label>
        </div>

        <div>
          <h3>Tipo de Entrega</h3>
          <select v-model="filtros.tipoEntrega" class="select">
            <option value="">Todos</option>
            <option value="retiro">Retiro en Tienda</option>
            <option value="domicilio">Despacho a Domicilio</option>
          </select>
        </div>
      </div>

      <!-- Sección de Productos -->
      <div class="productos">
        <div v-for="producto in productosFiltrados" :key="producto.id" class="producto">
          <img :src="producto.imagen" :alt="producto.nombre" class="producto-img">
          <div class="producto-info">
            <h3>{{ producto.nombre }}</h3>
            <p>{{ producto.descripcion }}</p>
            <div class="precio-entrega">
              <span class="precio">${{ producto.precio.toFixed(2) }}</span>
              <span class="entrega">{{ producto.tipoEntrega }}</span>
            </div>
            <button @click="agregarAlCarrito(producto)" class="boton-agregar">
              Agregar al Carrito
            </button>
          </div>
        </div>

        <p v-if="productosFiltrados.length === 0" class="no-productos">
          No se encontraron productos.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClienteView',
  data() {
    return {
      filtros: {
        busqueda: '',
        categorias: [],
        tipoEntrega: ''
      },
      categorias: ['Electrónica', 'Ropa', 'Hogar', 'Deportes'],
      productos: [
        {
          id: 1,
          nombre: 'Smartphone Pro',
          descripcion: 'Último modelo con cámara de alta resolución',
          precio: 129.99,
          imagen: 'https://via.placeholder.com/300x200',
          categoria: 'Electrónica',
          tipoEntrega: 'retiro'
        },
        {
          id: 2,
          nombre: 'Zapatillas Deportivas',
          descripcion: 'Zapatillas de running de alta performance',
          precio: 599.99,
          imagen: 'https://via.placeholder.com/300x200',
          categoria: 'Deportes',
          tipoEntrega: 'domicilio'
        },
        // Más productos...
      ],
      carrito: []
    };
  },
  computed: {
    productosFiltrados() {
      return this.productos.filter(producto => {
        const matchBusqueda = producto.nombre.toLowerCase().includes(this.filtros.busqueda.toLowerCase());
        const matchCategoria = this.filtros.categorias.length === 0 || this.filtros.categorias.includes(producto.categoria);
        const matchEntrega = !this.filtros.tipoEntrega || producto.tipoEntrega === this.filtros.tipoEntrega;
        return matchBusqueda && matchCategoria && matchEntrega;
      });
    },
    cantidadCarrito() {
      return this.carrito.reduce((total, item) => total + item.cantidad, 0);
    }
  },
  methods: {
    agregarAlCarrito(producto) {
      const productoEnCarrito = this.carrito.find(item => item.id === producto.id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
      } else {
        this.carrito.push({ ...producto, cantidad: 1 });
      }
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Encabezado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.carrito {
  position: relative;
}

.icono {
  width: 32px;
  height: 32px;
}

.contador {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 50%;
}

/* Grid principal */
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

/* Filtros */
.filtros {
  background: #f3f4f6;
  padding: 15px;
  border-radius: 10px;
}

.input-busqueda, .select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

/* Productos */
.productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.producto {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.producto:hover {
  transform: scale(1.02);
}

.producto-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.producto-info {
  padding: 15px;
}

.precio-entrega {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.precio {
  font-size: 1.2em;
  font-weight: bold;
  color: #2563eb;
}

.boton-agregar {
  width: 100%;
  padding: 10px;
  background: #22c55e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.boton-agregar:hover {
  background: #16a34a;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
