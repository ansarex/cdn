<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginFunc">
      <div class="input">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <router-link to="/home">View as Guest</router-link>
        <p>
          Don't have an account?
          <router-link to="/register" class="signup-link">Sign up</router-link>
        </p>
      </div>
    </form>
    <!-- Success or Error Message -->
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { login } from '@/services/authServices'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const successMessage = ref('')
const errorMessage = ref('')

const loginFunc = async () => {
  try {
    const response = await login(email.value, password.value)
    console.log(response)
    if (response.status == 200) {
      localStorage.setItem("token", JSON.stringify(response.data));
      localStorage.setItem("login", true); // Mark user as logged in
      successMessage.value = "Login successful"

      // Navigate to the home page after login
      router.replace('/home');
    } else {
      errorMessage.value = 'Login failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred. Please try again later.'
  }
}
</script>

<style scoped>
.login {
  padding: 20px;
  text-align: center;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.input input {
  padding: 10px;
  font-size: 16px;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
.signup-link {
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}
.guest {

  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

}
.signup-link:hover {
  text-decoration: underline;
}
</style>
