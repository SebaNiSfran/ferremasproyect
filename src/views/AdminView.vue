<template>
  <div class="admin-layout">
    <!-- barra de navegacion -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <img 
          :src="userAvatar" 
          alt="Admin Avatar" 
          class="sidebar-avatar"
        />
        <div class="user-info">
          <h3>{{ userName }}</h3>
          <p>Administrador</p>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <button 
          v-for="item in menuItems" 
          :key="item.id"
          @click="changeActiveView(item.id)"
          :class="['nav-button', { 'active': activeView === item.id }]"
        >
          <i :class="item.icon"></i>
          {{ item.label }}
        </button>
      </nav>
      
      <button 
        class="logout-button" 
        @click="logout"
      >
        <i class="fas fa-sign-out-alt"></i>
        Cerrar Sesión
      </button>
    </aside>

    <!-- contenido main -->
    <main class="main-content">
      <!-- cambio de contraseña -->
      <section 
        v-if="activeView === 'cambiar-contrasena'" 
        class="change-password-section"
      >
        <h1>Cambiar Contraseña</h1>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="current-password">Contraseña Actual</label>
            <input 
              type="password" 
              id="current-password"
              v-model="passwordForm.currentPassword"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="new-password">Nueva Contraseña</label>
            <input 
              type="password" 
              id="new-password"
              v-model="passwordForm.newPassword"
              :class="{ 'invalid': passwordError }"
              required
            />
            <small 
              v-if="passwordError" 
              class="error-text"
            >
              {{ passwordError }}
            </small>
          </div>
          
          <div class="form-group">
            <label for="confirm-password">Confirmar Nueva Contraseña</label>
            <input 
              type="password" 
              id="confirm-password"
              v-model="passwordForm.confirmPassword"
              required
            />
          </div>
          
          <button 
            type="submit" 
            class="submit-button"
          >
            Actualizar Contraseña
          </button>
        </form>
      </section>

      <!-- Dashboard -->
      <section 
        v-if="activeView === 'dashboard'" 
        class="dashboard-section"
      >
        <h1>Panel de Administración</h1>
        <div class="dashboard-grid">
          <div class="dashboard-card">
            <i class="fas fa-users"></i>
            <h3>Usuarios</h3>
            <p>Total: {{ userStats.total }}</p>
          </div>
          <div class="dashboard-card">
            <i class="fas fa-chart-bar"></i>
            <h3>Estadísticas</h3>
            <p>Crecimiento: {{ userStats.growth }}%</p>
          </div>
          <div class="dashboard-card">
            <i class="fas fa-cog"></i>
            <h3>Configuraciones</h3>
            <p>Sistema actualizado</p>
          </div>
        </div>
      </section>

      <!-- vistas de usuario -->
      <section 
        v-if="activeView === 'user-management'" 
        class="user-management-section"
      >
        <h1>Gestión de Usuarios</h1>
        <div class="user-list">
          <div 
            v-for="user in users" 
            :key="user.id" 
            class="user-card"
          >
            <img :src="user.avatar" :alt="user.name" />
            <div class="user-details">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
              <div class="user-actions">
                <button 
                  @click="editUser(user)" 
                  class="edit-button"
                >
                  Editar
                </button>
                <button 
                  @click="deleteUser(user.id)" 
                  class="delete-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sistema vision -->
      <section 
        v-if="activeView === 'system-logs'" 
        class="system-logs-section"
      >
        <h1>Registros del Sistema</h1>
        <table class="logs-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Evento</th>
              <th>Usuario</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in systemLogs" :key="log.id">
              <td>{{ log.date }}</td>
              <td>{{ log.event }}</td>
              <td>{{ log.user }}</td>
              <td>{{ log.description }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      userName: 'Juan Pérez',
      userAvatar: 'https://ui-avatars.com/api/?name=Juan+Perez',
      activeView: 'dashboard',
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordError: '',
      menuItems: [
        { 
          id: 'dashboard', 
          label: 'Panel Principal', 
          icon: 'fas fa-home' 
        },
        { 
          id: 'cambiar-contrasena', 
          label: 'Cambiar Contraseña', 
          icon: 'fas fa-lock' 
        },
        {
          id: 'user-management',
          label: 'Gestión de Usuarios',
          icon: 'fas fa-users-cog'
        },
        {
          id: 'system-logs',
          label: 'Registros del Sistema',
          icon: 'fas fa-clipboard-list'
        }
      ],
      userStats: {
        total: 245,
        growth: 15
      },
      users: [
        {
          id: 1,
          name: 'María Rodríguez',
          email: 'maria@ejemplo.com',
          avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez'
        },
        {
          id: 2,
          name: 'Carlos Gómez',
          email: 'carlos@ejemplo.com',
          avatar: 'https://ui-avatars.com/api/?name=Carlos+Gomez'
        }
      ],
      systemLogs: [
        {
          id: 1,
          date: '2024-03-24 10:15:00',
          event: 'Inicio de Sesión',
          user: 'Juan Pérez',
          description: 'Acceso al panel de administración'
        },
        {
          id: 2,
          date: '2024-03-24 11:30:00',
          event: 'Cambio de Contraseña',
          user: 'Juan Pérez',
          description: 'Actualización de credenciales de acceso'
        }
      ]
    }
  },
  methods: {
    changeActiveView(viewId) {
      this.activeView = viewId;
     
      this.resetPasswordForm();
    },
    changePassword() {
      // Validando cambio de contraseña
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.passwordError = 'Las contraseñas no coinciden';
        return;
      }

      // reglas de elc ambio de contraseña
      if (this.passwordForm.newPassword.length < 8) {
        this.passwordError = 'La contraseña debe tener al menos 8 caracteres';
        return;
      }

      // cambio de contraseña
      try {
        // en un futuro usaremos base de datos
        localStorage.setItem('userPassword', this.passwordForm.newPassword);
        
        // correcto
        this.passwordError = '';
        this.resetPasswordForm();
        alert('Contraseña cambiada exitosamente');
      } catch {
        this.passwordError = 'Error al cambiar la contraseña';
      }
    },
    resetPasswordForm() {
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
      this.passwordError = '';
    },
    logout() {
      // cierre de sesion
      localStorage.removeItem('userToken');
      // redirigiendo al login
      this.$router.push('/login');
    },
    editUser(user) {
      // logica de edicion
      alert(`Editar usuario: ${user.name}`);
    },
    deleteUser(userId) {
      // logica de eliminar
      this.users = this.users.filter(user => user.id !== userId);
      alert(`Usuario eliminado: ID ${userId}`);
    }
  }
}
</script>

<style scoped>
/* Estilos de animacion */
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #f4f6f9;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info h3 {
  margin: 0;
  font-size: 18px;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #a0a0a0;
}

.sidebar-nav {
  flex-grow: 1;
}

.nav-button {
  width: 100%;
  text-align: left;
  padding: 12px 15px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px;
  border-radius: 5px;
}

.nav-button:hover, .nav-button.active {
  background-color: #34495e;
}

.nav-button i {
  margin-right: 10px;
}

.logout-button {
  width: 100%;
  padding: 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}

.change-password-section, 
.dashboard-section {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-text {
  color: #e74c3c;
  font-size: 0.9em;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dashboard-card {
  background-color: #f1f2f6;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.dashboard-card i {
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #3498db;
}

/* Nuevos estilos para gestión de usuarios */
.user-management-section {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  background-color: #f1f2f6;
  border-radius: 10px;
  padding: 15px;
}

.user-card img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-details h3 {
  margin: 0 0 5px;
}

.user-details p {
  margin: 0;
  color: #666;
}

.user-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.edit-button, .delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #3498db;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

/* Estilos para registros del sistema */
.system-logs-section {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logs-table {
  width: 100%;
  border-collapse: collapse;
}

.logs-table th, .logs-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.logs-table th {
  background-color: #f1f2f6;
}
</style>