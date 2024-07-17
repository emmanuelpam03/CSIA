// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBuc5MUucK6pL95aH7vz-5KjZOO46HZ9rA",
    authDomain: "csia-84b81.firebaseapp.com",
    projectId: "csia-84b81",
    storageBucket: "csia-84b81.appspot.com",
    messagingSenderId: "582632041945",
    appId: "1:582632041945:web:b08d48988a0b395d547dc8",
    measurementId: "G-G9HV24RTZE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);
const provider = new GoogleAuthProvider();

let googleBtn = document.querySelector("#google-btn");
let emailAddress = document.querySelector("#email");
let password = document.querySelector("#password");
let logInBtn = document.getElementById("loginbtn");

let signInUser = evnt=>{
    evnt.preventDefault();

    signInWithEmailAndPassword(auth, emailAddress.value, password.value)
    .then((credentials) => {
        get(child(dbref, `userAuthList/${credentials.user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                localStorage.setItem("user-info", JSON.stringify({
                    firstName: snapshot.val().firstname,
                    lastName: snapshot.val().lastname
                }));
                localStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = "../homepage.html";
            } 
        })
    })
    .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        alert(errorMessage)
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
    })
}

logInBtn.addEventListener("click", signInUser);
