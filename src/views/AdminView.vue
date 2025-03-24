<template>
  <div class="admin-container">
    <h1>Vista Administrador</h1>

    <!-- Cambiar contraseña -->
    <section v-if="isFirstLogin" class="cambiar-contrasena">
      <h2>Cambiar Contraseña</h2>
      <form @submit.prevent="cambiarContrasena">
        <div class="form-group">
          <label for="current-password">Contraseña actual</label>
          <input
            type="password"
            id="current-password"
            v-model="currentPassword"
            placeholder="Ingresa tu contraseña actual"
            required
          />
        </div>
        <div class="form-group">
          <label for="new-password">Nueva contraseña</label>
          <input
            type="password"
            id="new-password"
            v-model="newPassword"
            placeholder="Ingresa una nueva contraseña"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmar nueva contraseña</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirma la nueva contraseña"
            required
          />
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </section>

    <!-- Mensaje para cuando la contraseña ya se ha cambiado -->
    <section v-else>
      <p>La contraseña ha sido cambiada correctamente. Bienvenido al sistema.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage: "",
      isFirstLogin: true, // Asumimos que es el primer inicio de sesión del admin
    };
  },
  methods: {
    cambiarContrasena() {
      // Verificamos si las contraseñas coinciden
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden. Por favor, intente nuevamente.";
        return;
      }

      // Verificamos si la contraseña actual es la correcta (simulada)
      if (this.currentPassword !== "admin123") { // Simulamos la contraseña inicial
        this.errorMessage = "Contraseña actual incorrecta. Intente de nuevo.";
        return;
      }

      // Si todo está bien, cambiamos la contraseña (simulación)
      this.successMessage = "Contraseña cambiada exitosamente.";
      this.errorMessage = "";
      this.isFirstLogin = false; // Indicamos que ya no es el primer login

      // Guardamos la nueva contraseña en algún lugar, como el localStorage o base de datos (aquí solo un ejemplo)
      localStorage.setItem("adminPassword", this.newPassword);
    },
  },
};
</script>

<style scoped>
.admin-container {
  max-width: 600px;
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

.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
}
</style>

