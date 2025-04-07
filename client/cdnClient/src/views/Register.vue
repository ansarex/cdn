<template>
  <div class="register">
    <h1>Register as a Freelancer</h1>
    <form @submit.prevent="regButton">
      <div class="input">
        <input type="text" v-model="name" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Sign up</button>
        <p>
          Already have an account?
          <router-link to="/login" class="login-link">Sign In</router-link>
        </p>
      </div>
    </form>

    <!-- Success or Error Message -->
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { register } from '@/services/authServices'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const regButton = async () => {
  try {

    const response = await register(name.value, email.value, password.value)
    console.log(response)
    if (response.status == 200) {
      successMessage.value = response.data
      setTimeout(() => {
        router.push('/login') // Redirect after success
      }, 2000)
    } else {
      errorMessage.value = 'Registration failed. Please try again.'
    }
  } catch (error) {

    errorMessage.value = error.message || 'An error occurred. Please try again later.'
  }
}
</script>

<style scoped>
.register {
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

.login-link {
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}

.login-link:hover {
  text-decoration: underline;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  font-weight: bold;
}

.error-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border-radius: 5px;
  font-weight: bold;
}
</style>
