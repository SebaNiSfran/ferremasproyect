<template>
    <div class="contador-container">
      <h1>Vista Contador</h1>
      
      <section class="confirmar-pagos">
        <h2>Confirmar Pagos por Transferencia</h2>
        <form @submit.prevent="confirmarPago">
          <div class="form-group">
            <label for="numeroTransferencia">Número de Transferencia</label>
            <input
              type="text"
              id="numeroTransferencia"
              v-model="numeroTransferencia"
              placeholder="Ingresa el número de transferencia"
              required
            />
          </div>
          <div class="form-group">
            <label for="montoTransferencia">Monto de Transferencia</label>
            <input
              type="number"
              id="montoTransferencia"
              v-model="montoTransferencia"
              placeholder="Ingresa el monto de la transferencia"
              required
            />
          </div>
          <button type="submit">Confirmar Pago</button>
        </form>
        <p v-if="confirmacionMessage" class="success-message">{{ confirmacionMessage }}</p>
      </section>
      
      <section class="registrar-entrega">
        <h2>Registrar Entrega de Productos</h2>
        <form @submit.prevent="registrarEntrega">
          <div class="form-group">
            <label for="producto">Producto</label>
            <input
              type="text"
              id="producto"
              v-model="producto"
              placeholder="Ingresa el nombre del producto"
              required
            />
          </div>
          <div class="form-group">
            <label for="cliente">Cliente</label>
            <input
              type="text"
              id="cliente"
              v-model="cliente"
              placeholder="Ingresa el nombre del cliente"
              required
            />
          </div>
          <div class="form-group">
            <label for="fechaEntrega">Fecha de Entrega</label>
            <input
              type="date"
              id="fechaEntrega"
              v-model="fechaEntrega"
              required
            />
          </div>
          <button type="submit">Registrar Entrega</button>
        </form>
        <p v-if="entregaMessage" class="success-message">{{ entregaMessage }}</p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContadorView",
    data() {
      return {
        // Datos para la confirmación de pagos
        numeroTransferencia: "",
        montoTransferencia: "",
        confirmacionMessage: "",
  
        // Datos para el registro de entrega de productos
        producto: "",
        cliente: "",
        fechaEntrega: "",
        entregaMessage: "",
      };
    },
    methods: {
      confirmarPago() {
        // Simulamos la confirmación del pago
        if (this.numeroTransferencia && this.montoTransferencia) {
          // Lógica para confirmar el pago aquí (en un proyecto real, esto sería una llamada a una API o a una base de datos)
          this.confirmacionMessage = `Pago confirmado con el número de transferencia: ${this.numeroTransferencia} y monto: ${this.montoTransferencia}`;
          // Limpiar campos
          this.numeroTransferencia = "";
          this.montoTransferencia = "";
        } else {
          this.confirmacionMessage = "Por favor ingresa todos los datos correctamente.";
        }
      },
      registrarEntrega() {
        // Simulamos el registro de la entrega del producto
        if (this.producto && this.cliente && this.fechaEntrega) {
          // Lógica para registrar la entrega aquí (en un proyecto real, esto sería una llamada a una API o a una base de datos)
          this.entregaMessage = `Entrega registrada para el producto: ${this.producto}, cliente: ${this.cliente}, fecha: ${this.fechaEntrega}`;
          // Limpiar campos
          this.producto = "";
          this.cliente = "";
          this.fechaEntrega = "";
        } else {
          this.entregaMessage = "Por favor ingresa todos los datos correctamente.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .contador-container {
    max-width: 800px;
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
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
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
  