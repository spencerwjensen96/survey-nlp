<script>
    import { authStore, authHandlers } from "../../../stores/authStore";

    let email;
    let photoURL;
    let displayName;
    let newName = false;
    let created;
    let lastLogin;
    authStore.subscribe((curr) => {
        email = curr?.currentUser?.email;
        photoURL = curr?.currentUser?.photoURL;
        displayName = curr?.currentUser?.displayName;
        created = curr?.currentUser?.metadata.creationTime;
        lastLogin = curr?.currentUser?.metadata.lastSignInTime;
    });

    function updateName(){
        newName = true;
    }

    async function handleSubmit(){
        if(newName){
            await authHandlers.updateProfile({displayName: displayName});
        }
    }
</script>
<div class="flex w-full content-center justify-center">
    <div class="flex-col align-middle w-1/3 my-12 p-4">
        <h1 class="text-center text-4xl">User Settings</h1>
        <div class="h-16"></div>
        <div class="place-content-center">
            {#if photoURL}
                <img src={photoURL} alt="Avatar" class="w-12 h-12 rounded-full mr-2">
            {:else}
                <img src="../../avatar-black.svg" alt="Avatar" class="w-12 h-12 rounded-full mr-2">
            {/if}
            
        </div>
        <div class="flex-col">
            <label for="displayName">Display Name</label>
            <input id="displayName" bind:value={displayName} on:change={updateName} placeholder="Change" class="p-2">
            <p>{email}</p>
            <div class="h-8"></div>
            <label for="created">Account Created Date:</label>
            <p id="created" class="opacity-50">{created}</p>
            <label for="loginDate">Last Login Date:</label>
            <p id="loginDate" class="opacity-50">{lastLogin}</p>
        </div>

        <button on:click={handleSubmit} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </div>
</div>


