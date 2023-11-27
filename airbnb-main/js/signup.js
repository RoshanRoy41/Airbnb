import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
const db = getFirestore(app);

const signupButton = document.getElementById("signupButton");

signupButton.addEventListener("click", async function (event) {
  event.preventDefault(); // Prevents the form from submitting in a traditional way

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;

  if (
    !name ||
    !email ||
    !dob ||
    !phone ||
    !password ||
    !confirmPassword ||
    !role
  ) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const auth = getAuth();

  try {
    // Create user in authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Set the user's role in Firestore or any other storage mechanism
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      dob: dob,
      phone: phone,
      role: role,
    });
    await updateProfile(user, {
      displayName: name,
      photoURL: "/images/account-icon2.png",
    });

    // Redirect based on the user's role
    if (role === "traveler") {
      window.location.href = "./homepage.html";
    } else if (role === "host") {
      window.location.href = "./add_unit.html";
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    alert(errorMessage);
  }
});
