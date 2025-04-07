<template>
    <div class="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage freelancer profiles and monitor platform activity.</p>
      <div v-for="freelancer in freelancers" :key="freelancer.id" class="freelancer-card">
        <h3>{{ freelancer.name }}</h3>
        <p>{{ freelancer.title }}</p>
        <button @click="viewProfile(freelancer.id)">View Profile</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const freelancers = ref([
    { id: 1, name: 'John Doe', title: 'Web Developer' },
    { id: 2, name: 'Jane Smith', title: 'Graphic Designer' },
  ]);
  
  const viewProfile = (id) => {
    console.log('Viewing profile of freelancer ID:', id);
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  .freelancer-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
  }
  </style>
  