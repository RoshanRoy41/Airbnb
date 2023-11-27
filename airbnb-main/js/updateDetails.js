import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMrlyczLc4b-Te5JB_vhxJCKmKq_lIQME",
  authDomain: "airbnb-clone-f9979.firebaseapp.com",
  projectId: "airbnb-clone-f9979",
  storageBucket: "airbnb-clone-f9979.appspot.com",
  messagingSenderId: "92486974171",
  appId: "1:92486974171:web:bdee85f178cf7c9fdf6afe",
  measurementId: "G-WSTSPRJY31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

function updateUserProfile(user) {
  const userName = user.displayName;
  const userEmail = user.email;
  const userProfilePicture = user.photoURL;

  document.getElementById("userName").textContent = userName;
  // document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserProfile(user);
    const uid = user.uid;
    return uid;
  } else {
    if (window.location.pathname !== "/login.html") {
      // Redirect to login.html if not already on the login page
      window.location.href = "/login.html";
    }
  }
});
console.log("signOut function:", typeof firebaseSignOut);
// Function to sign out
function signOut() {
  firebaseSignOut(auth)
    .then(() => {
      console.log("User signed out");

      // Redirect to login.html
      window.location.href = "/login.html";
      // You can redirect or perform additional actions after sign-out
    })
    .catch((error) => {
      console.error("Sign-out error", error);
    });
}

const signOutButton = document.querySelector("#signOutClick");
if (signOutButton) {
  signOutButton.addEventListener("click", signOut);
}
