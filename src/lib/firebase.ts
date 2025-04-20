import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuration Firebase (utilise les infos de ton projet)
const firebaseConfig = {
  apiKey: 'AIzaSyDV2Mc_BaYSRsHZFrnSCy3KyWeqSf7r8KU',
  authDomain: 'mex-1-6ed97.firebaseapp.com',
  projectId: 'mex-1-6ed97',
  storageBucket: 'mex-1-6ed97.appspot.com',
  messagingSenderId: '672541607256',
  appId: '1:672541607256:web:08399c672961996d0bd12d',
  measurementId: 'G-V4BPT0CCWZ',
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export du module d'authentification
export const auth = getAuth(app);
