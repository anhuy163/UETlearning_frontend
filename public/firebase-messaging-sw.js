importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyAgMcMz8k9Dea7bDXAa1UlxBUnktz2Y1h4",
  authDomain: "modified-fabric-350609.firebaseapp.com",
  projectId: "modified-fabric-350609",
  storageBucket: "modified-fabric-350609.appspot.com",
  messagingSenderId: "280440114464",
  appId: "1:280440114464:web:4fa3f0d7e7d19eab1a1b45",
});

messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  // Customize notification here
  const notificationTitle = "Bạn có 1 thông báo mới";
  const notificationOptions = {
    body: "Thông báo mới",
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
