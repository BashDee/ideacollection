<template>
  <div>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'

const email = ref('')
const password = ref('')

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    alert('User registered successfully!')
  } catch (error) {
    console.error(error.message)
  }
}
</script>
