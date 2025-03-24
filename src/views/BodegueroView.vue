<template>
  <div class="bodeguero-dashboard">
    <!-- Perfil Header -->
    <header class="perfil-header">
      <div class="perfil-info">
        <img 
          :src="userAvatar" 
          alt="Avatar de usuario" 
          class="avatar"
        />
        <span class="nombre-usuario">{{ userName }}</span>
      </div>
      <nav class="perfil-navegacion">
        <button 
          class="btn-logout" 
          @click="logout"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>

    <div class="bodeguero-container">
      <h1>Panel de Control - Bodeguero</h1>
      
      <!-- Estadísticas Rápidas -->
      <section class="dashboard-stats">
        <div class="stat-card">
          <i class="fas fa-box"></i>
          <div class="stat-content">
            <h3>Pedidos Pendientes</h3>
            <p>{{ pedidosPendientes.length }}</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-check-circle"></i>
          <div class="stat-content">
            <h3>Pedidos Procesados Hoy</h3>
            <p>{{ pedidosProcesadosHoy }}</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-truck"></i>
          <div class="stat-content">
            <h3>Pedidos Entregados</h3>
            <p>{{ pedidosEntregados.length }}</p>
          </div>
        </div>
      </section>
      
      <!-- visualizar las órdenes de pedidos -->
      <section class="ver-ordenes">
        <h2>Órdenes de Pedidos</h2>
        
        <!-- Filtros de Búsqueda -->
        <div class="filtros">
          <select v-model="filtroEstado">
            <option value="">Todos los Estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aceptado">Aceptado</option>
            <option value="Preparado">Preparado</option>
            <option value="Entregado">Entregado</option>
          </select>
          <input 
            type="text" 
            v-model="busquedaCliente" 
            placeholder="Buscar por cliente"
          />
        </div>

        <div v-if="pedidosFiltrados.length > 0">
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="pedido in pedidosFiltrados" 
                :key="pedido.id"
                :class="getRowClass(pedido.estado)"
              >
                <td>{{ pedido.id }}</td>
                <td>{{ pedido.cliente }}</td>
                <td>{{ pedido.producto }}</td>
                <td>{{ pedido.cantidad }}</td>
                <td>
                  <span :class="getEstadoClass(pedido.estado)">
                    {{ pedido.estado }}
                  </span>
                </td>
                <td>{{ formatFecha(pedido.fecha) }}</td>
                <td class="acciones">
                  <button 
                    v-if="pedido.estado === 'Pendiente'" 
                    @click="aceptarPedido(pedido)"
                    class="btn-aceptar"
                  >
                    Aceptar
                  </button>
                  <button 
                    v-if="pedido.estado === 'Aceptado'" 
                    @click="prepararPedido(pedido)"
                    class="btn-preparar"
                  >
                    Preparar
                  </button>
                  <button 
                    v-if="pedido.estado === 'Preparado'" 
                    @click="entregarPedido(pedido)"
                    class="btn-entregar"
                  >
                    Entregar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="no-pedidos">No hay pedidos que coincidan con los filtros</p>
      </section>
      
      <!-- Notificaciones -->
      <div 
        v-if="mensaje" 
        :class="['notificacion', tipoNotificacion]"
      >
        {{ mensaje }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BodegueroView",
  data() {
    return {
      userName: 'Carlos Bodega',
      userAvatar: 'https://ui-avatars.com/api/?name=Carlos+Bodega',
      filtroEstado: '',
      busquedaCliente: '',
      mensaje: '',
      tipoNotificacion: 'success',
      pedidos: [
        { 
          id: 1, 
          cliente: 'Cliente A', 
          producto: 'Producto X', 
          cantidad: 3, 
          estado: 'Pendiente',
          fecha: new Date('2024-03-24T10:30:00')
        },
        { 
          id: 2, 
          cliente: 'Cliente B', 
          producto: 'Producto Y', 
          cantidad: 1, 
          estado: 'Pendiente',
          fecha: new Date('2024-03-24T11:15:00')
        },
        { 
          id: 3, 
          cliente: 'Cliente C', 
          producto: 'Producto Z', 
          cantidad: 5, 
          estado: 'Aceptado',
          fecha: new Date('2024-03-24T09:45:00')
        }
      ]
    };
  },
  computed: {
    pedidosFiltrados() {
      return this.pedidos.filter(pedido => {
        const coincideEstado = !this.filtroEstado || pedido.estado === this.filtroEstado;
        const coincideCliente = pedido.cliente.toLowerCase().includes(this.busquedaCliente.toLowerCase());
        return coincideEstado && coincideCliente;
      });
    },
    pedidosPendientes() {
      return this.pedidos.filter(p => p.estado === 'Pendiente');
    },
    pedidosEntregados() {
      return this.pedidos.filter(p => p.estado === 'Entregado');
    },
    pedidosProcesadosHoy() {
      return this.pedidos.filter(p => 
        p.estado === 'Entregado' && 
        this.esHoy(p.fecha)
      ).length;
    }
  },
  methods: {
    aceptarPedido(pedido) {
      pedido.estado = "Aceptado";
      this.mostrarNotificacion(`Pedido #${pedido.id} aceptado y en proceso de preparación.`);
    },
    prepararPedido(pedido) {
      pedido.estado = "Preparado";
      this.mostrarNotificacion(`Pedido #${pedido.id} preparado, listo para entregar.`);
    },
    entregarPedido(pedido) {
      pedido.estado = "Entregado";
      this.mostrarNotificacion(`Pedido #${pedido.id} entregado al vendedor para despacho.`);
    },
    mostrarNotificacion(texto, tipo = 'success') {
      this.mensaje = texto;
      this.tipoNotificacion = tipo;
      
      // notificación después de 3 segundos
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    esHoy(fecha) {
      const hoy = new Date();
      const fechaComparar = new Date(fecha);
      return fechaComparar.getDate() === hoy.getDate() &&
             fechaComparar.getMonth() === hoy.getMonth() &&
             fechaComparar.getFullYear() === hoy.getFullYear();
    },
    getRowClass(estado) {
      return {
        'pendiente-row': estado === 'Pendiente',
        'aceptado-row': estado === 'Aceptado',
        'preparado-row': estado === 'Preparado',
        'entregado-row': estado === 'Entregado'
      };
    },
    getEstadoClass(estado) {
      return `estado-${estado.toLowerCase()}`;
    },
    logout() {
      //  cierre de sesión
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.bodeguero-dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f9;
}

.perfil-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.perfil-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.bodeguero-container {
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stat-card i {
  font-size: 2.5rem;
  margin-right: 1rem;
  color: #3498db;
}

.stat-content h3 {
  margin: 0;
  color: #555;
  font-size: 1rem;
}

.stat-content p {
  margin: 0.5rem 0 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.filtros {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filtros select,
.filtros input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.acciones button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-aceptar {
  background-color: #28a745;
  color: white;
}

.btn-preparar {
  background-color: #ffc107;
  color: black;
}

.btn-entregar {
  background-color: #17a2b8;
  color: white;
}

.notificacion {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #dc3545;
  color: white;
}

/* Clases para estados de pedidos */
.pendiente-row {
  background-color: #fff3cd;
}

.aceptado-row {
  background-color: #d1ecf1;
}

.preparado-row {
  background-color: #d4edda;
}

.entregado-row {
  background-color: #e2e3e5;
}

.estado-pendiente {
  color: #ffc107;
  font-weight: bold;
}

.estado-aceptado {
  color: #17a2b8;
  font-weight: bold;
}

.estado-preparado {
  color: #28a745;
  font-weight: bold;
}

.estado-entregado {
  color: #6c757d;
  font-weight: bold;
}

.no-pedidos {
  text-align: center;
  color: #6c757d;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
}
</style>