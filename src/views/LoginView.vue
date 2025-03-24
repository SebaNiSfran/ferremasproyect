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
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    
    <!-- Toast -->
    <div v-if="showToast" class="toast">
      <p>{{ toastMessage }}</p>
    </div>
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
      showToast: false,
      toastMessage: ""
    };
  },
  methods: {
    handleLogin() {
      // Simulando un login con roles 
      if (this.email === "admin@empresa.com" && this.password === "admin123") {
        // Guardar estado de login y rol en localStorage
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userRole", "admin");
        this.userRole = "admin"; // Asignando el rol al usuario

        // Redirigiendo inmediatamente después del login
        this.$router.push("/admin");

        // Mostrando el toast con retraso
        this.toastMessage = "Inicio de sesión exitoso como Administrador";
        setTimeout(() => {
          this.showToast = true;
        }, 3000); // Aparecerá después de 3 segundos
      } else if (this.email === "vendedor@empresa.com" && this.password === "vendedor123") {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userRole", "vendedor");
        this.userRole = "vendedor"; // Asignar el rol al usuario

        // Redirige inmediatamente después del login
        this.$router.push("/catalogo");

        // Mostramos el toast con retraso
        this.toastMessage = "Inicio de sesión exitoso como Vendedor";
        setTimeout(() => {
          this.showToast = true;
        }, 3000); // Aparecerá después de 3 segundos
      } else if (this.email === "cliente@empresa.com" && this.password === "cliente123") {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userRole", "cliente");
        this.userRole = "cliente"; // Asignamos el rol al usuario

        // Redirigimos inmediatamente después del login
        this.$router.push("/catalogo");

        // Mostrando el toast con retraso
        this.toastMessage = "Inicio de sesión exitoso como Cliente";
        setTimeout(() => {
          this.showToast = true;
        }, 2000); // Aparecerá después de 3 segundos
      } else if (this.email === "bodeguero@empresa.com" && this.password === "bodeguero123") {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userRole", "bodeguero");
        this.userRole = "bodeguero"; 

        
        this.$router.push("/bodeguero");

        // Mostrar el toast con retraso
        this.toastMessage = "Inicio de sesión exitoso como Bodeguero";
        setTimeout(() => {
          this.showToast = true;
        }, 3000); 
      } else if (this.email === "contador@empresa.com" && this.password === "contador123") {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userRole", "contador");
        this.userRole = "contador"; // Asignar el rol al usuario

        
        this.$router.push("/contador");

        
        this.toastMessage = "Inicio de sesión exitoso como Contador";
        setTimeout(() => {
          this.showToast = true;
        }, 3000); 
      } else {
        this.errorMessage = "Correo o contraseña incorrectos"; // Mostrará el mensaje de error
      }
    }
  }
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

/* Estilos para el toast */
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}
</style>