<template>
  <div class="login-container">
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Ingresa tu correo electrónico"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>

    <!-- Toast -->
    <div v-if="showToast" class="toast">{{ toastMessage }}</div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      showToast: false, // Para poder controlar la visibilidad del toast
      toastMessage: "",
      userRole: "", // Variable para manejar el rol del usuario
    };
  },
  methods: {
    handleLogin() {
      // Simulando un login exitoso con roles específicos
      if (this.email === "admin@empresa.com" && this.password === "admin123") {
        this.userRole = "admin"; // Asignamos el rol de administrador
        this.toastMessage = "Inicio de sesión como Administrador correctamente";
      } else if (this.email === "vendedor@empresa.com" && this.password === "vendedor123") {
        this.userRole = "vendedor"; // Asignamos el rol de vendedor
        this.toastMessage = "Inicio de sesión como Vendedor correctamente";
      } else if (this.email === "cliente@empresa.com" && this.password === "cliente123") {
        this.userRole = "cliente"; // Asignamos el rol de cliente
        this.toastMessage = "Inicio de sesión como Cliente correctamente";
      } else {
        this.errorMessage = "Correo o contraseña incorrectos"; // Mostrar error
        return;
      }

      this.showToast = true; // Mostrando el toast
      setTimeout(() => {
        this.showToast = false; // Ocultar el toast después de 3 segundos

        // Guardamos el estado de login y rol en localStorage
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userRole", this.userRole);

        // Redirigir según el rol del usuario
        if (this.userRole === "admin") {
          this.$router.push("/admin"); // Redirigir al panel de administración
        } else if (this.userRole === "vendedor" || this.userRole === "cliente") {
          this.$router.push("/catalogo"); // Redirigir al catálogo
        }
      }, 100);
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

/* Estilos del Toast */
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background-color: #28a745;
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
