<script>
    import {onMount} from 'svelte';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { authStore, authHandlers } from "../../stores/authStore";

    let displayName;
    let photoURL;
    let isLoading = true;

    onMount(() => {
        if(browser && localStorage.authstore){
            const authStorage = JSON.parse(localStorage.authstore);
            photoURL = authStorage.currentUser.photoURL;
            displayName = authStorage.currentUser.displayName;
        }
        else{
            authStore.subscribe((curr)=>{
                photoURL = curr?.currentUser?.photoURL;
                displayName = curr?.currentUser?.displayName;
            });
        }
       isLoading = false;
    });

    async function logout() {
        await authHandlers.logout();
        goto('/login');
    }    
    
</script>
{#if !isLoading}
<div class="flex p-4 bg-blue-500 text-white ">
    <div>
        <p class="p-2"><a href="/app" class="text-white">Home</a></p>
    </div>
    <div class="grow">

    </div>
    
    <!-- <button on:click={logout} class="p-2">Logout</button> -->
    <!-- <div class="justify-end flex-row "> -->
        {#if displayName}
        <p class="p-2">{displayName}</p>
        {/if}
        <div class="flex items-center">
            <div class="dropdown">
            {#if photoURL}
                <img id="avatar" src={photoURL} alt="Avatar" class="w-8 h-8 rounded-full mr-2">
            {:else}
                <img id="avatar" src="../avatar-white.svg" alt="Avatar" class="w-8 h-8 rounded-full mr-2 dropbtn">
            {/if} 
                <div class="dropdown-content">
                    <a href="/app/settings">Settings</a>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a on:click={logout} class="cursor-pointer">Logout</a>
                </div>
            </div>   
        <!-- </div> -->
    </div>
</div>

<slot></slot>
{/if}