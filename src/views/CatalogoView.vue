<template>
  <div class="vendedor-container">
    <!-- Nueva Barra de Perfil -->
    <header class="perfil-header">
      <div class="perfil-info">
        <img 
        src="https://ui-avatars.com/api/?name=Juan+Perez" 
        alt="Avatar de usuario" 
        class="avatar"
        />
        <span class="nombre-usuario">Juan Pérez</span>
      </div>
      <nav class="perfil-navegacion">
        <button 
          class="btn-logout" 
          @click="cerrarSesion"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>

    <h1>Panel de Gestión de Ventas</h1>
    
    <!-- Modal de Edición de Producto -->
    <div v-if="modalProductoVisible" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ modoEdicion ? 'Editar' : 'Agregar' }} Producto</h2>
        <form @submit.prevent="guardarProducto">
          <div class="form-grupo">
            <label>Nombre del Producto</label>
            <input 
              v-model="productoActual.nombre" 
              type="text" 
              required 
              placeholder="Nombre del producto"
            />
          </div>
          <div class="form-grupo">
            <label>Cantidad Disponible</label>
            <input 
              v-model.number="productoActual.cantidadDisponible" 
              type="number" 
              required 
              min="0"
            />
          </div>
          <div class="form-grupo">
            <label>Precio</label>
            <input 
              v-model.number="productoActual.precio" 
              type="number" 
              required 
              min="0"
            />
          </div>
          <div class="modal-acciones">
            <button 
              type="button" 
              class="btn-cancelar" 
              @click="cerrarModal"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn-guardar"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Productos Totales</h3>
        <p>{{ productosBodega.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Valor Total Inventario</h3>
        <p>{{ formatearPrecio(calcularValorInventario()) }}</p>
      </div>
      <div class="stat-card">
        <h3>Productos Bajo Stock</h3>
        <p>{{ productosBajoStock.length }}</p>
      </div>
    </div>

    <!-- Sección de Productos -->
    <section class="seccion-productos">
      <div class="seccion-header">
        <h2>Inventario de Productos</h2>
        <button 
          class="btn-agregar-producto" 
          @click="abrirModalAgregar"
        >
          + Agregar Producto
        </button>
      </div>

      <table class="tabla-productos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Valor Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="producto in productosBodega" 
            :key="producto.id"
            :class="{'bajo-stock': producto.cantidadDisponible < 10}"
          >
            <td>{{ producto.id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>
              <span 
                :class="{
                  'texto-alerta': producto.cantidadDisponible < 10,
                  'texto-normal': producto.cantidadDisponible >= 10
                }"
              >
                {{ producto.cantidadDisponible }}
              </span>
            </td>
            <td>{{ formatearPrecio(producto.precio) }}</td>
            <td>{{ formatearPrecio(producto.precio * producto.cantidadDisponible) }}</td>
            <td>
              <div class="acciones-producto">
                <button 
                  @click="editarProducto(producto)" 
                  class="btn-editar"
                >
                  Editar
                </button>
                <button 
                  @click="eliminarProducto(producto)" 
                  class="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "VendedorView",
  data() {
    return {
      modalProductoVisible: false,
      modoEdicion: false,
      productoActual: {
        id: null,
        nombre: '',
        cantidadDisponible: 0,
        precio: 0
      },
      productosBodega: [
        { 
          id: 1, 
          nombre: "Laptop Gamer", 
          cantidadDisponible: 8, 
          precio: 1200000 
        },
        { 
          id: 2, 
          nombre: "Smartphone Premium", 
          cantidadDisponible: 15, 
          precio: 800000 
        },
        { 
          id: 3, 
          nombre: "Tablet Educativa", 
          cantidadDisponible: 20, 
          precio: 350000 
        },
      ]
    };
  },
  computed: {
    productosBajoStock() {
      return this.productosBodega.filter(p => p.cantidadDisponible < 10);
    }
  },
  methods: {
    formatearPrecio(precio) {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
      }).format(precio);
    },
    calcularValorInventario() {
      return this.productosBodega.reduce(
        (total, producto) => total + (producto.precio * producto.cantidadDisponible), 
        0
      );
    },
    abrirModalAgregar() {
      this.modoEdicion = false;
      this.productoActual = {
        id: this.productosBodega.length + 1,
        nombre: '',
        cantidadDisponible: 0,
        precio: 0
      };
      this.modalProductoVisible = true;
    },
    editarProducto(producto) {
      this.modoEdicion = true;
      this.productoActual = { ...producto };
      this.modalProductoVisible = true;
    },
    guardarProducto() {
      if (this.modoEdicion) {
        // Actualizar producto existente
        const index = this.productosBodega.findIndex(
          p => p.id === this.productoActual.id
        );
        if (index !== -1) {
          this.productosBodega.splice(index, 1, { ...this.productoActual });
        }
      } else {
        // Agregar nuevo producto
        this.productosBodega.push({ ...this.productoActual });
      }
      this.cerrarModal();
    },
    eliminarProducto(producto) {
      const confirmacion = confirm(`¿Estás seguro de eliminar ${producto.nombre}?`);
      if (confirmacion) {
        const index = this.productosBodega.findIndex(p => p.id === producto.id);
        if (index !== -1) {
          this.productosBodega.splice(index, 1);
        }
      }
    },
    cerrarModal() {
      this.modalProductoVisible = false;
      this.productoActual = {
        id: null,
        nombre: '',
        cantidadDisponible: 0,
        precio: 0
      };
    },
    // 
    cerrarSesion() {
      
      
      
      
      
      
      alert('Sesión cerrada');
      
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
:root {
  --color-primario: #2c3e50;
  --color-secundario: #3498db;
  --color-fondo: #f4f6f9;
  --color-texto: #333;
  --color-alerta: #e74c3c;
  --color-exito: #2ecc71;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.perfil-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f4f4f4;
  border-bottom: 1px solid #e0e0e0;
}

.perfil-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.nombre-usuario {
  font-weight: bold;
}

.btn-logout {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background-color: #ff3333;
}

.vendedor-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: var(--color-primario);
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: var(--color-fondo);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tabla-productos {
  width: 100%;
  border-collapse: collapse;
}

.tabla-productos th, 
.tabla-productos td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.bajo-stock {
  background-color: rgba(231, 76, 60, 0.1);
}

.texto-alerta {
  color: var(--color-alerta);
  font-weight: bold;
}

.texto-normal {
  color: var(--color-texto);
}

.acciones-producto {
  display: flex;
  gap: 0.5rem;
}

.btn-editar, .btn-eliminar, .btn-agregar-producto {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-editar {
  background-color: var(--color-secundario);
  color: rgb(196, 173, 130);
}

.btn-eliminar {
  background-color: var(--color-alerta);
  color: rgb(214, 24, 24);
}

.btn-agregar-producto {
  background-color: var(--color-exito);
  color: rgb(9, 170, 57);
  margin-bottom: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-grupo {
  margin-bottom: 1rem;
}

.form-grupo label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-grupo input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn-cancelar, .btn-guardar {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancelar {
  background-color: #6c757d;
  color: rgb(236, 241, 243);
}

.btn-guardar {
  background-color: #0b891e;
  color: rgb(240, 241, 242);
}
</style>