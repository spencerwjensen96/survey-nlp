<script lang="ts">
    import "../app.pcss";
    import { onMount } from "svelte";
    import { authStore } from "../stores/authStore.js";
    import { auth, db } from "../lib/firebase/firebase.app";
	import { doc, getDoc, setDoc } from "firebase/firestore";
    
	let unprotectedRoutes = ['/', '/login', '/signup'];

    onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			let currentPath = window.location.pathname;

			if(!user){return;}

			if(!user && !unprotectedRoutes.includes(currentPath)){
				window.location.href = '/login';
				return
			}

			if(user && currentPath === '/'){
				window.location.href = '/app';
				return
			}

			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			let dataToStore;
			if(!docSnap.exists()){
				const userRef = doc(db, 'users', user.uid);
				dataToStore = {
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
						uid: user.uid
					}
				await setDoc(userRef, dataToStore, {merge: true});
			}
			else {
				dataToStore = docSnap.data();
			}

			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user, userData: dataToStore };
			});
		});
		return unsubscribe;
	});
</script>

<slot></slot>