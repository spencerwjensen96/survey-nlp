import { initializeApp,getApps,getApp,deleteApp,type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from "firebase/auth";
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

let firebaseApp:FirebaseApp | undefined;
let auth: Auth;
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

let db = getFirestore(firebaseApp);

// export the firebase app
export {firebaseApp,auth,db}