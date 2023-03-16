import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyAgMcMz8k9Dea7bDXAa1UlxBUnktz2Y1h4",
  authDomain: "modified-fabric-350609.firebaseapp.com",
  databaseURL:
    "https://modified-fabric-350609-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "modified-fabric-350609",
  storageBucket: "modified-fabric-350609.appspot.com",
  messagingSenderId: "280440114464",
  appId: "1:280440114464:web:4fa3f0d7e7d19eab1a1b45",
  measurementId: "G-LE6BHJJ9QM",
};

// const app = initializeApp(firebaseConfig);
let messaging: any = null;
if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const requestPermission = () => {
  // Notification.requestPermission().then((permission) => {
  //   if (permission === "granted") {
  //     console.log("Notification permission granted");
  getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  }).then((currentToken) => {
    if (currentToken) {
      // console.log("currentToken", currentToken);
      localStorage.setItem("deviceToken", currentToken);
    }
  });
  //   } else {
  //     console.log("Do not have permission");
  //   }
  // });
};

export default messaging;

export const onMessaging = () => {
  return onMessage(messaging, (payload) => {
    console.log("Message received", payload);
  });
};
