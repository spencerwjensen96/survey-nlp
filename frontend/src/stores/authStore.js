import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { auth } from "../lib/firebase/firebase.app.js";
import { signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    updateEmail, 
    updatePassword,
    updateProfile } from "firebase/auth";

const initalAuthValue = browser ? JSON.parse(localStorage.authstore || null) : null;

export const authStore = writable(initalAuthValue);

authStore.subscribe((value) => {
    if(browser){
        localStorage.authstore = JSON.stringify(value)
    }
});

export const authHandlers = {
    login: async (email, password) => {
        let response = await signInWithEmailAndPassword(auth, email, password);
        if(!response.user){return;}

        const user = await fetch(`/api/users/?google_id=${response.user.uid}`)
        let user_data;
        
        if(user.status === 404){
            user_data = await fetch(`/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    google_id: response.user.uid,
                    email: response.user.email,
                    surveys: []
                })
            });
        }
        if(user.status === 200){
            user_data = await user.json();
        }

        return user_data;
    },
    signup: async (email, password) => {
        let response = await createUserWithEmailAndPassword(auth, email, password);
        if(!response.user){return;}

        const user = await fetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                google_id: response.user.uid,
                email: response.user.email,
                surveys: []
            })
        });

        return await user.json();
    },
    logout: async () => {
        if (browser) {
            localStorage.removeItem('authstore');
            localStorage.removeItem('surveystore');
        }
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
        await updateProfile(auth.currentUser, profile)
            .then(response => {
                //update mongo
            })
            .then(console.log("profile updated!"));
    }
}