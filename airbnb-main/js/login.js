import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  linkWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const signInButton = document.getElementById("signInButton");

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "./homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
const githubLogin = document.getElementById("github-login-btn");
githubLogin.addEventListener("click", function () {
  signInWithPopup(auth, gitHubProvider)
    .then((result) => {
      // Successful sign-in
      const user = result.user;
      console.log(user);
      if (user && user.providerData.length > 1) {
        linkWithPopup(user, gitHubProvider)
          .then((linkResult) => {
            // Account linking successful
            console.log("Account linked successfully");
            // Navigate to the homepage
            window.location.href = "./homepage.html";
          })
          .catch((linkError) => {
            // Handle account linking error
            console.error("Error linking account", linkError);
          });
      } else {
        // No need for account linking, navigate to the homepage
        window.location.href = "homepage.html";
      }
    })
    .catch((error) => {
      // Handle other sign-in errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
});
signInButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value; // Add this line to get the role from the form

  if (!email || !password || !role) {
    alert("Please fill in both email, password, and select your role");
    return;
  }

  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Check the user's role
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userRole = userDoc.data().role;

    // Redirect based on the user's role
    if (userRole === role) {
      alert("Sign in successful!");
      // Redirect or perform other actions after successful sign-in
      if (role === "traveler") {
        window.location.href = "./homepage.html";
      } else if (role === "host") {
        window.location.href = "./add_unit.html";
      }
    } else {
      alert("Invalid role selected for this user");
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    alert(errorMessage);
  }
});

const forgotPasswordButton = document.getElementById("forgotPasswordButton");

forgotPasswordButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email address");
    return;
  }

  try {
    // Send a password reset email
    await sendPasswordResetEmail(auth, email);

    alert("Password reset email sent. Please check your inbox.");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    alert(errorMessage);
  }
});
