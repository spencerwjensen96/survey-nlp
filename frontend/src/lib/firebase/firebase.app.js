import { initializeApp,getApps,getApp,deleteApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

/**
* Your firebase client SDK config goes here
*/
const config = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID
}

let firebaseApp;
let auth;
// create singleton of firebase client app
if(!getApps().length){
    firebaseApp = initializeApp(config);
}
else{
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(config);
}

auth = getAuth(firebaseApp);

// export the firebase app
export {firebaseApp,auth}