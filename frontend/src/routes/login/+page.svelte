<script>
    import { authStore, authHandlers } from "../../stores/authStore";
  
      let email = '';
      let password = '';
      let error = '';
  
      async function handleSubmit(event) {
        try {
            await authHandlers.login(email, password);
        }
        catch {
            error = 'Authentication Error. Please try again later.';
        }
        if ($authStore.currentUser) {
            window.location.href = '/app';
        }
      }
    
</script>

<div class="flex items-center justify-center h-screen bg-blue-100">
    <div class="flex-col p-8 bg-white w-2/5">
        <div class="flex-col text-center space-y-4">
            <h1 class="text-4xl justify-center w-full">Login</h1>
            <p>Don't have an account? <a href="/signup" class="">Sign-up</a></p>
        </div>
        {#if error !== ''}
            <p class="text-red-700">{error}</p>
        {/if}
        <form class="my-4 space-y-4">
            <div>
                <input bind:value={email} type="text" id="email" name="email" placeholder="Email" class="p-2 w-full">
            </div> 
            <div>
                <input bind:value={password} type="password" id="password" name="password" placeholder="Password" class="p-2 w-full">
            </div>
            <button on:click={handleSubmit} type="submit" class="w-full mt-4 p-2 content-center bg-blue-600 rounded text-white">Login</button>
        </form>
    </div>
</div>