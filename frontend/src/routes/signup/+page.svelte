<script>
    import { goto } from '$app/navigation';
    import { authStore, authHandlers } from "../../stores/authStore";

    let email = '';
    let password = '';
    let passwordConfirm = '';
    let error = '';

    async function handleSubmit(event) {

        if (password !== passwordConfirm) {
            error = 'Passwords do not match';
            return;
        }
        try {
            const user = await authHandlers.signup(email, password);
            
            if (!user){
                error = 'Authentication Error. Please try again later.';
                return;
            }
            // let userData = {
            //     email: user.email,
            //     user_id: user.uid
            // }
            
            authStore.set({currentUser: user, isLoggedIn: true});
            goto('/app');
        }
        catch {
            error = 'Authentication Error. Please try again later.';
        }
    }
    
</script>

<div class="flex items-center justify-center h-screen bg-blue-100">
    <div class="flex-col p-8 bg-white w-2/5">
        <div class="flex-col text-center space-y-4">
            <h1 class="text-4xl justify-center w-full">Signup</h1>
            <p>Already have an account? <a href="/login" class="">Login</a></p>
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
            <div>
                <input bind:value={passwordConfirm} type="password" id="password-confirm" name="password-confirm" placeholder="Confirm Password" class="p-2 w-full">
            </div>
            <button on:click={handleSubmit} type="submit" class="w-full mt-4 p-2 content-center bg-blue-600 rounded text-white">Signup</button>
        </form>
    </div>
</div>