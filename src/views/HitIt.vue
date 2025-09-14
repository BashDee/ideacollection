<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { analytics } from './firebaseConfig'
// console.log('Firebase analytics initialized example:', analytics)

const loading = ref(false)
const form = reactive({
  title: '',
  error: '',
})
const hitIt = async (e: Event) => {
  e.preventDefault()
  try {
    loading.value = true
    const idea = {
      idea_title: form.title,
      description: form.title,
    }

    if (!form.title) {
      form.error = 'Title cannot be empty'
      return
    }

    const response = await fetch('http://localhost:8000/api/v1/idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idea),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Idea added:', result)

    resetForm()
    form.error = ''
  } catch (error) {
    form.error = 'Failed to add idea. Please try again.'
    console.error('Error adding idea:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.title = ''
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="container">
        <h1>iDeas</h1>
        <form>
          <div v-if="loading">Loading...</div>
          <div v-if="form.error" class="error-message">{{ form.error }}</div>
          <input v-model="form.title" placeholder="Enter something..." class="input-field" />
          <button class="submit-btn" @click="hitIt">Hit it</button>
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

.submit-btn:hover {
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
