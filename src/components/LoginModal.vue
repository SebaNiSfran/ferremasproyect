<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Iniciar Sesión</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              placeholder="tu-correo@ejemplo.com"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required 
              placeholder="Contraseña"
            />
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-login">Iniciar Sesión</button>
            <p class="register-link">
              ¿No tienes cuenta? 
              <a @click="$emit('switch-to-register')">Regístrate</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginModal',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Aquí iría la lógica de autenticación
        // Por ejemplo, llamada a un servicio de backend
        const usuario = {
          nombre: 'Usuario',
          email: this.email,
          avatar: '/path/to/default/avatar.png'
        };
        
        // Simular autenticación exitosa
        this.$emit('login-exitoso', usuario);
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #888;
  }
  
  .login-form .form-group {
    margin-bottom: 1rem;
  }
  
  .login-form label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .login-form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .btn-login {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .register-link {
    text-align: center;
    margin-top: 1rem;
  }
  
  .register-link a {
    color: #007bff;
    cursor: pointer;
  }
  </style>