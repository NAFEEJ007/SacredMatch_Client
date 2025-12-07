import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX939R1EhX80FXxOQOCVS1pD98kHH8qoc",
  authDomain: "sacredmatch-e8a72.firebaseapp.com",
  projectId: "sacredmatch-e8a72",
  storageBucket: "sacredmatch-e8a72.firebasestorage.app",
  messagingSenderId: "360299016320",
  appId: "1:360299016320:web:0f3ebb0601c3a853237665",
  measurementId: "G-C9SJS477GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
