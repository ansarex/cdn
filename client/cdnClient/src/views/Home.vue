<template>
  <div class="home">
    <header>
      <h1>Find Your Resources Here!</h1>
      <p>Connecting talent with opportunities.</p>
      <div class="search-container">
        <select v-model="selectedSkill" id="skill-filter">
          <option value="">All Skillsets</option>
          <option v-for="skill in uniqueSkillsets" :key="skill" :value="skill">
            {{ skill }}
          </option>
        </select>
      </div>
    </header>

    <section>
      <h2>Community for Freelancers</h2>
      <div class="freelancer-list">
        <div v-for="freelancer in filteredFreelancers" :key="freelancer.id" class="freelancer-card">
          <h3>{{ freelancer.username }}</h3>
          <p>Email: {{ freelancer.email }}</p>
          <p>Phone: {{ freelancer.phoneNumber }}</p>
          <p>Skillsets: {{ freelancer.skillsets || 'Not specified' }}</p>
          <p>Hobby: {{ freelancer.hobby || 'Not specified' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usersList, getSkillsets } from '@/services/authServices' // Assume getSkillsets() fetches skillsets

const freelancers = ref([])
const skillsets = ref([])
const selectedSkill = ref('')

// Fetch freelancers and skillsets
const fetchData = async () => {

  try {
    const freelancersData = await usersList()
    freelancers.value = freelancersData.items // Access the 'items' array from the data

    const skillsetsData = await getSkillsets() // Fetch skillsets from API
    skillsets.value = skillsetsData // Assume it returns a list of skillsets

    console.log(freelancers.value, skillsets.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()


const uniqueSkillsets = computed(() => {
  return Array.from(new Set(skillsets.value)) 
})


const filteredFreelancers = computed(() => {
  if (selectedSkill.value === '') {
    return freelancers.value
  }
  return freelancers.value.filter(freelancer => freelancer.skillsets?.includes(selectedSkill.value))
})

</script>


<style scoped>
.home {
  
  text-align: center;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

/* Header */
h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #666;
}

.search-container select {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 50%;
}

.search-container input {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-container button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #45a049;
}

/* Freelancer Cards */
.freelancer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.freelancer-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.freelancer-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.view-profile {
  display: inline-block;
  margin-top: 10px;
  background-color: var(--secondary);
  color: white;
  border: none;
  text-decoration: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.view-profile:hover {
  background-color: var(--success);
}
</style>
