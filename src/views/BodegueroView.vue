<template>
    <div class="bodeguero-container">
      <h1>Vista Bodeguero</h1>
      
      <!-- Sección para visualizar las órdenes de pedidos -->
      <section class="ver-ordenes">
        <h2>Órdenes de Pedidos</h2>
        <div v-if="pedidos.length > 0">
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pedido in pedidos" :key="pedido.id">
                <td>{{ pedido.id }}</td>
                <td>{{ pedido.cliente }}</td>
                <td>{{ pedido.producto }}</td>
                <td>{{ pedido.cantidad }}</td>
                <td>{{ pedido.estado }}</td>
                <td>
                  <button v-if="pedido.estado === 'Pendiente'" @click="aceptarPedido(pedido)">Aceptar</button>
                  <button v-if="pedido.estado === 'Aceptado'" @click="prepararPedido(pedido)">Preparar</button>
                  <button v-if="pedido.estado === 'Preparado'" @click="entregarPedido(pedido)">Entregar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else>No hay pedidos pendientes</p>
      </section>
      
      <!-- Mensajes de éxito o error -->
      <p v-if="mensaje" class="success-message">{{ mensaje }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "BodegueroView",
    data() {
      return {
        // Lista de pedidos, cada uno con un id, cliente, producto, cantidad, y estado
        pedidos: [
          { id: 1, cliente: 'Cliente A', producto: 'Producto X', cantidad: 3, estado: 'Pendiente' },
          { id: 2, cliente: 'Cliente B', producto: 'Producto Y', cantidad: 1, estado: 'Pendiente' },
          { id: 3, cliente: 'Cliente C', producto: 'Producto Z', cantidad: 5, estado: 'Aceptado' },
          // Otros pedidos...
        ],
        mensaje: ""
      };
    },
    methods: {
      aceptarPedido(pedido) {
        // Cambiar el estado del pedido a "Aceptado"
        pedido.estado = "Aceptado";
        this.mensaje = `Pedido #${pedido.id} aceptado y en proceso de preparación.`;
      },
      prepararPedido(pedido) {
        // Cambiar el estado del pedido a "Preparado"
        pedido.estado = "Preparado";
        this.mensaje = `Pedido #${pedido.id} preparado, listo para entregar.`;
      },
      entregarPedido(pedido) {
        // Cambiar el estado del pedido a "Entregado"
        pedido.estado = "Entregado";
        this.mensaje = `Pedido #${pedido.id} entregado al vendedor para despacho.`;
      }
    }
  };
  </script>
  
  <style scoped>
  .bodeguero-container {
    max-width: 1000px;
    margin: 50px auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  h2 {
    margin-top: 2rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 1rem;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .success-message {
    color: green;
    text-align: center;
    margin-top: 1rem;
  }
  </style>
  
  