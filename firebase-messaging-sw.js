importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAhKWmOxd_I16u_seOQ-Or976o2eclxokw",
  authDomain: "holly-echo.firebaseapp.com",
  projectId: "holly-echo",
  storageBucket: "holly-echo.firebasestorage.app",
  messagingSenderId: "1084649454187",
  appId: "1:1084649454187:web:4d69048a7bbe1a38204f2e",
});

const messaging = firebase.messaging();
