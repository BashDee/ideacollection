<template>
  <div class="auth-container">
    <form @submit.prevent="register">
      <p><input v-model="email" type="email" placeholder="Email" required class="auth-input" /></p>
      <p>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="auth-input"
        />
      </p>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>
      <p>
        <button type="submit" :disabled="loading" class="auth-button">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { FirebaseError } from 'firebase/app'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const loading = ref(false)

const register = async () => {
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    successMsg.value = 'User registered successfully! Redirecting...'
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    console.error('Registration Error:', error)
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid email format.'
          break
        case 'auth/email-already-in-use':
          errorMsg.value = 'Email is already in use.'
          break
        case 'auth/weak-password':
          errorMsg.value = 'Password should be at least 6 characters.'
          break
        default:
          errorMsg.value = 'An error occurred during registration.'
          break
      }
    } else {
      errorMsg.value = 'An unexpected error occurred during registration.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.auth-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.auth-button:disabled {
  background-color: #aaa;
}
</style>
