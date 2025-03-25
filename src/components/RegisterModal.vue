<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Registrarse</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="register" class="register-form">
          <div class="form-group">
            <label for="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              v-model="nombre" 
              required 
              placeholder="Tu nombre completo"
            />
          </div>
          
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
          
          <div class="form-group">
            <label for="confirm-password">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirm-password" 
              v-model="confirmPassword" 
              required 
              placeholder="Confirma tu contraseña"
            />
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-register">Registrarse</button>
            <p class="login-link">
              ¿Ya tienes cuenta? 
              <a @click="$emit('switch-to-login')">Iniciar Sesión</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterModal',
    data() {
      return {
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      register() {
        // Validar que las contraseñas coincidan
        if (this.password !== this.confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
        
        // Aquí iría la lógica de registro
        // Por ejemplo, llamada a un servicio de backend
        const usuario = {
          nombre: this.nombre,
          email: this.email,
          avatar: '/path/to/default/avatar.png'
        };
        
        // Simular registro exitoso
        this.$emit('registro-exitoso', usuario);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Los estilos son muy similares al LoginModal, puedes reutilizarlos */
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
  
  /* Resto de los estilos igual que en LoginModal */
  </style>