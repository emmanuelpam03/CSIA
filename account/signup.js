import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const db = getDatabase();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let emailAddress = document.querySelector("#email");
let password = document.querySelector("#password");
let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let mainForm = document.querySelector("#myform");
let signUpBtn = document.querySelector("#signup");

let registerUser = evnt=>{
    evnt.preventDefault();

    // Clear previous error states
    emailAddress.classList.remove("error-border");
    password.classList.remove("error-border");
    firstName.classList.remove("error-border");
    lastName.classList.remove("error-border");

    let hasError = false;

    // Basic form validation
    if (!emailAddress.value) {
        emailAddress.classList.add("error-border");
        hasError = true;
    }
    if (!password.value) {
        password.classList.add("error-border");
        hasError = true;
    }
    if (!firstName.value) {
        firstName.classList.add("error-border");
        hasError = true;
    }
    if (!lastName.value) {
        lastName.classList.add("error-border");
        hasError = true;
    }

    if (hasError) {
        return; // Exit if there are validation errors
    }

    createUserWithEmailAndPassword(auth, emailAddress.value, password.value)
    .then((credentials) => {
        // Signed in 
        console.log(credentials);
        set(ref(db,`userAuthList/${credentials.user.uid}`), {
            firstname: firstName.value,
            lastname: lastName.value,
            email: emailAddress.value
        }).then(() => {
            window.location.href = "./login.html"
        })
        

    }).catch(error => {
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

signUpBtn.addEventListener("click", registerUser);

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

let googleLogin = document.querySelector("#google-btn");
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(credential);
        console.log(user);
        windows.close = false
        window.location.href = "../homepage.html";
        
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // alert(errorMessage)
        // ...
    })
});