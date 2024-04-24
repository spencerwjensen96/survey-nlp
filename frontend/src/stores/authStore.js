import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase.app.ts";
import { signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    updateEmail, 
    updatePassword,
    updateProfile } from "firebase/auth";

export const authStore = writable({
    isLoading: true,
    currentUser: null,
    userData: {},
    surveys: []
});

export const authHandlers = {
    login: async (email, password) => {
        //console.log(email, password);
        await signInWithEmailAndPassword(auth, email, password);
    },
    signup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    },
    logout: async () => {
        await signOut(auth);
    },
    resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
    },
    updateEmail: async (email) => {
        await updateEmail(auth, email);
    },
    updatePassword: async (password) => {
        await updatePassword(auth, password);
    },
    updateProfile: async (profile) => {
        // console.log(profile);
        // // displayName = profile.displayName;
        // console.log("displayName");
        // console.log(displayName);
        await updateProfile(auth.currentUser, profile).then(console.log("profile updated!"));
    }
}