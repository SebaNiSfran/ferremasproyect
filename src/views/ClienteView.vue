<template>
    <div class="cliente-container">
      <h1>Catálogo de Productos</h1>
      
      <!-- Filtro de búsqueda (opcional) -->
      <section class="filtros">
        <input type="text" v-model="searchQuery" placeholder="Buscar productos" @input="searchProducts" />
      </section>
  
      <!-- Mostrar productos -->
      <section class="productos">
        <div v-if="productos.length > 0" class="productos-list">
          <div v-for="producto in filteredProductos" :key="producto.id" class="producto-card">
            <img :src="producto.imagen" :alt="producto.nombre" />
            <h3>{{ producto.nombre }}</h3>
            <p>{{ producto.descripcion }}</p>
            <p><strong>Precio: ${{ producto.precio }}</strong></p>
            <button @click="agregarAlCarrito(producto)">Agregar al carrito</button>
          </div>
        </div>
        <p v-else>No hay productos disponibles</p>
      </section>
      
      <!-- Carrito de compras -->
      <section v-if="carrito.length > 0" class="carrito">
        <h2>Carrito de Compras</h2>
        <ul>
          <li v-for="item in carrito" :key="item.id">
            {{ item.nombre }} - ${{ item.precio }} x {{ item.cantidad }}
          </li>
        </ul>
        <p>Total: ${{ totalCarrito }}</p>
        
        <button @click="procederAlPago">Proceder al pago</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "ClienteView",
    data() {
      return {
        searchQuery: "",
        productos: [
          { id: 1, nombre: "Producto A", descripcion: "Descripción del producto A", precio: 100, imagen: "imagenA.jpg" },
          { id: 2, nombre: "Producto B", descripcion: "Descripción del producto B", precio: 150, imagen: "imagenB.jpg" },
          { id: 3, nombre: "Producto C", descripcion: "Descripción del producto C", precio: 200, imagen: "imagenC.jpg" },
          // Otros productos...
        ],
        carrito: [],
      };
    },
    computed: {
      filteredProductos() {
        return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
      },
      totalCarrito() {
        return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
      },
    },
    methods: {
      agregarAlCarrito(producto) {
        const productoEnCarrito = this.carrito.find((item) => item.id === producto.id);
        if (productoEnCarrito) {
          productoEnCarrito.cantidad += 1;
        } else {
          this.carrito.push({ ...producto, cantidad: 1 });
        }
      },
      procederAlPago() {
        this.$router.push("/pago");
      },
    },
  };
  </script>
  
  <style scoped>
  .cliente-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 2rem;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .filtros input {
    padding: 0.8rem;
    width: 100%;
    max-width: 300px;
    margin-bottom: 2rem;
  }
  
  .productos-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .producto-card {
    width: calc(33.33% - 1rem);
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
  }
  
  .producto-card img {
    width: 100%;
    height: auto;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .carrito {
    margin-top: 3rem;
    padding: 1rem;
    border-top: 2px solid #ccc;
  }
  
  .carrito button {
    background-color: #007bff;
  }
  
  .carrito button:hover {
    background-color: #0056b3;
  }
  </style>
  