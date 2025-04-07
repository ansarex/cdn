import axios from 'axios'

const API_URL = 'http://localhost:5220/api/'

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}Users/register`, {
      Username: name,
      Email: email,
      Password: password,
      PhoneNumber: '',
      Skillsets: '',
      Hobby: '',
    })
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response?.data)
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}Auth/login`, {
      Email: email,
      Password: password,
    })
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.response?.data)
  }
}

export const usersList = async () => {
  try {
    const response = await axios.get(`${API_URL}Users/freelancers`)
    console.log(response.data) // Logs the users list
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
export const getProfile = async () => {
  const tokenData = JSON.parse(localStorage.getItem('token'))
  console.log(tokenData)
  const token = tokenData.accessToken
  try {
    // Set the Authorization header with the Bearer token
    const response = await axios.get(`${API_URL}Users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(response.data) // Logs the user's profile data
    return response.data
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

export const updateProfile = async (formData) => {
  const tokenData = JSON.parse(localStorage.getItem('token'))
  console.log(tokenData)
  const token = tokenData.accessToken
  const response = await axios.put(`${API_URL}Users/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getSkillsets = async () => {
  try {
    const response = await axios.get(`${API_URL}Users/skillsets`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const deleteAccount = async () => {
  const tokenData = JSON.parse(localStorage.getItem('token'))
  console.log(tokenData)
  const token = tokenData.accessToken
  try {
    const response = await axios.delete(`${API_URL}Users/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
