<template>
  <div class="profile-container">
    <h1>Freelancer Profile</h1>


    <!-- Profile Information -->
    <div class="profile-details">
      <label>Username:</label>
      <input v-model="profile.username" :disabled="!isEditing" />

      <label>Email:</label>
      <input v-model="profile.email" :disabled="!isEditing" />

      <label>Phone Number:</label>
      <input v-model="profile.phone" :disabled="!isEditing" />

      <label>Skillsets:</label>
      <textarea v-model="profile.skills" :disabled="!isEditing"></textarea>

      <label>Hobbies:</label>
      <textarea v-model="profile.hobbies" :disabled="!isEditing"></textarea>
    </div>
    <button @click="toggleEdit">{{ isEditing ? 'Save' : 'Edit Profile' }}</button>
    <button @click="deleteButton" class="delete-btn">Delete Account</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProfile, updateProfile, deleteAccount } from '@/services/authServices'

const router = useRouter()



const profile = ref({
  username: '',
  email: '',
  phone: '',
  skills: '',
  hobbies: '',

})

const isEditing = ref(false)

const toggleEdit = async () => {
  if (isEditing.value) {
    // Handle Save Profile
    await saveProfile()
  } else {
    // Allow editing
    isEditing.value = !isEditing.value
  }
}

// Function to Upload Image
// const uploadImage = (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     const reader = new FileReader()
//     reader.onload = () => {
//       profile.value.image = reader.result
//     }
//     reader.readAsDataURL(file)
//   }
// }

const saveProfile = async () => {
  try {
    const formData = new FormData()

    // Append form fields
    formData.append('username', profile.value.username)
    formData.append('email', profile.value.email)
    formData.append('phoneNumber', profile.value.phone)
    formData.append('skillsets', profile.value.skills)
    formData.append('hobby', profile.value.hobbies)

    // Append the profile image if available
    if (profile.value.image) {
      const blob = dataURLtoBlob(profile.value.image)
      formData.append('profileImage', blob, 'profile.jpg')
    }
    await updateProfile(formData)

    isEditing.value = false // Disable editing after save
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

// Helper function to convert base64 to blob
const dataURLtoBlob = (dataURL) => {
  const byteString = atob(dataURL.split(',')[1])
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}

onMounted(() => {
  // Fetch user profile data to pre-fill the form
  fetchProfile()
})

const fetchProfile = async () => {
  try {
    const data = await getProfile()
    profile.value = {
      username: data.username,
      email: data.email,
      phone: data.phoneNumber,
      skills: data.skillsets,
      hobbies: data.hobby,
      // image: data.profileImage || '',  // If the profileImage exists, use it. Otherwise, it will default to ''
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}

const deleteButton = async () => {
  try {
    const confirmation = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.',
    )
    if (confirmation) {
      // Send request to delete the account
      await deleteAccount()

      // Clear user data (like localStorage or any other state)
      localStorage.clear()

      // Redirect to login or homepage after deletion
      router.push('/login')
    }
  } catch (error) {
    console.error('Error deleting account:', error)
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-image {
  text-align: center;
  margin-bottom: 15px;
}

.profile-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-image input {
  margin-top: 10px;
}

.profile-details {
  display: flex;
  flex-direction: column;
}

.profile-details label {
  font-weight: bold;
  margin-top: 10px;
}

.profile-details input,
.profile-details textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

.delete-btn {
  background-color: #e74c3c;
  margin-top: 20px;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
