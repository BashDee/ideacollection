<template>
  <div class="auth-container">
    <h1>Login to Your Account</h1>
    <form @submit.prevent="signIn">
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
      <p>
        <button type="submit" :disabled="loading" class="auth-button">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '../firebaseConfig'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const signIn = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('User signed in successfully!')
    router.push('/hitit') // Redirect to home page after successful login
  } catch (error) {
    console.error('Login Error:', error)
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMsg.value = 'Invalid email or password.'
          break
        default:
          errorMsg.value = 'An unexpected error occurred. Please try again.'
          break
      }
    } else {
      errorMsg.value = 'An unexpected error occurred. Please try again.'
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
  background-color: #4caf50;
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
