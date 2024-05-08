// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAPF5JC9DBiGvoOmEgn6l6Qo2Xx8Q9sR6M',
  authDomain: 'invuentory.firebaseapp.com',
  projectId: 'invuentory',
  storageBucket: 'invuentory.appspot.com',
  messagingSenderId: '415755236738',
  appId: '1:415755236738:web:fb77d11a4fcea24efa8b9b',
  measurementId: 'G-2CK1YP0LWC'
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
