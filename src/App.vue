<script lang="ts" setup></script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="container">
        <h1>Idiaz</h1>
        <form>
          <input placeholder="Enter something..." class="input-field" />
          <button class="submit-btn">Hit it</button>
        </form>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Base styles (Mobile-first approach) */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #28a745; /* Green background */
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
  background-color: transparent;
  color: #fff;
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
    width: 100%;
    height: auto;
  }

  .input-field {
    width: 70%;
  }

  .submit-btn {
    width: 70%;
  }
}
</style>
