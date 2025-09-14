// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-E3WCJECxjmbA196TrvqR_HrzigtEmNI',
  authDomain: 'idea-faabe.firebaseapp.com',
  projectId: 'idea-faabe',
  storageBucket: 'idea-faabe.firebasestorage.app',
  messagingSenderId: '662270976092',
  appId: '1:662270976092:web:4bf26d80bc561e7151c699',
  measurementId: 'G-QYRVC99QQP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
