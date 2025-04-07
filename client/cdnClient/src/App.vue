<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import theme from './assets/theme'
const route = useRoute()


const isNavbarVisible = computed(() => {
  // Hide navbar on login and register pages
  return !['/login', '/register'].includes(route.path)
})


onMounted(() => {
  const root = document.documentElement.style
  root.setProperty('--primary', theme.primary)
  root.setProperty('--secondary', theme.secondary)
  root.setProperty('--success', theme.success)
  root.setProperty('--danger', theme.danger)
  root.setProperty('--background', theme.background)
  root.setProperty('--text', theme.text)
})

</script>

<template>
  <Navbar  v-if="isNavbarVisible" />
  <RouterView />
</template>
