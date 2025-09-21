<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const title = ref('')
const error = ref('')
const message = ref('')

// In a real application, this should come from an environment variable
const API_URL = 'http://localhost:8000/api/v1/idea'

const hitIt = async () => {
  // 1. Validation before anything else
  if (!title.value) {
    error.value = 'Title cannot be empty'
    return
  }

  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const idea = {
      idea_title: title.value,
      description: title.value, // Assuming this is intentional
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idea),
    })

    const result = await response.json()

    if (!response.ok) {
      // Try to get a more specific error message from the API response
      const errorMsg = result.message || `HTTP error! status: ${response.status}`
      throw new Error(errorMsg)
    }

    message.value = 'Success!'
    console.log('Idea added:', result)

    resetForm()
  } catch (err: any) {
    error.value = err.message || 'Failed to add idea. Please try again.'
    console.error('Error adding idea:', error)
  } finally {
    loading.value = false
    // Clear success message after a few seconds
    if (message.value) {
      setTimeout(() => (message.value = ''), 3000)
    }
  }
}

const resetForm = () => {}
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="container">
        <h1>iDeas</h1>
        <form @submit.prevent="hitIt">
          <div v-if="loading">Loading...</div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="message" class="success-message">{{ message }}</div>
          <input v-model="title" placeholder="Enter something..." class="input-field" />
          <button type="submit" class="submit-btn" :disabled="loading">Hit it</button>
        </form>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Base styles (Mobile-first approach) */
.container {
  .error-message {
    color: red;
    margin-bottom: 10px;
  }

  .success-message {
    color: #0d2e0e; /* Dark green for better contrast on light green background */
    margin-bottom: 10px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #4caf50; /* Green background */
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 100vh;
}

.input-field {
  width: 80%;
  padding: 12px;
  border: 2px solid #fff;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
  background-color: #ffffff;
  color: #333333;
}

.submit-btn {
  padding: 12px 20px;
  border: none;
  background-color: #007bff; /* Blue background */
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: #5a98d6;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

/* For larger screens */
@media (min-width: 768px) {
  .container {
    width: 97%;
    height: auto;
  }

  .input-field {
    width: 70%;
  }

  .submit-btn {
    width: auto;
  }
}
</style>
