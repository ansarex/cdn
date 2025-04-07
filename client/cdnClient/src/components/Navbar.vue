<template>
  <nav v-if="!isLoginPage" class="navbar">
    <div class="nav-logo">
      <router-link to="/">Complete Developer Network</router-link>
    </div>

    <button class="menu-btn" @click="toggleMenu">☰</button>

    <ul :class="{ 'nav-links': true, 'nav-active': isMenuOpen }">
      <li>
        <router-link to="/" active-class="active">Home</router-link>
      </li>

      <!-- Profile link with condition to show popup if not logged in -->
      <li v-if="isLoggedIn">
        <router-link :to="`/profile/${userId}`" active-class="active">Profile</router-link>
      </li>
      <li v-else>
        <button @click="showLoginPopup">Profile (Login Required)</button>
      </li>

      <li v-if="isLoggedIn">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>

  <div v-if="isLoginPopupVisible" class="popup-overlay">
    <div class="popup-content">
      <p>You need to log in to view your profile.</p>
      <button @click="closeLoginPopup">Close</button>
      <button class="login-btn" @click="goToLogin">Go to Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const isLoggedIn = ref(true)
const router = useRouter()
const route = useRoute()

const isLoginPage = computed(() => route.path === '/login')

// State to control the popup visibility
const isLoginPopupVisible = ref(false)

onMounted(() => {
  const userData = localStorage.getItem('login')
  if (userData) {
    isLoggedIn.value = true

  } else {
    isLoggedIn.value = false
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {


  localStorage.clear()
  router.push('/login')
}


const showLoginPopup = () => {
  isLoginPopupVisible.value = true
}


const closeLoginPopup = () => {
  isLoginPopupVisible.value = false
}


const goToLogin = () => {
  router.push('/login')
  closeLoginPopup()
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: var(--primary);
  color: white;
}

.nav-logo a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-links a,
.nav-links button {
  color: white;
  text-decoration: none;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.nav-links .active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    background: #222;
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
    padding: 15px;
  }

  .nav-active {
    display: flex;
  }
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 300px;
}

.popup-content button {
  padding: 10px 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.popup-content .login-btn {
  margin-left: 20px;
  background-color: var(--secondary); /* Blue background for the 'Go to Login' button */
}

.popup-content button:hover {
  background-color: #333;
}
</style>
