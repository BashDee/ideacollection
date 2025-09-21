<script lang="ts" setup>
import { ref } from 'vue'
import { onAuthStateChanged, signOut as firebaseSignOut, getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoggedIn = ref(false)

const auth = getAuth()

// runs after firebase is initialized
onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = !!user
})

const handleSignOut = async () => {
  try {
    await firebaseSignOut(auth) // Call the Firebase signOut function with the auth instance
    console.log('User signed out successfully!')
    router.push('/sign-in') // Redirect after successful sign-out
  } catch (error) {
    console.error('Error signing out:', error)
    // You might want to show a user-friendly error message here
  }
}
</script>

<template>
  <nav>
    <span v-if="isLoggedIn">
      <router-link to="/"> Home </router-link> | <router-link to="/hitit"> Feed </router-link> |
      <button @click="handleSignOut">Logout</button>
    </span>
    <span v-else>
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Login </router-link>
    </span>
  </nav>
  <router-view />
</template>
