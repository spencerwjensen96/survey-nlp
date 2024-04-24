<script>
    import {onMount} from 'svelte';
    import {authStore} from '../../stores/authStore';
    import {db} from '../../lib/firebase/firebase.app';
    import {doc, getDocs, collection, addDoc, deleteDoc} from 'firebase/firestore';
    import Fa from 'svelte-fa'
    import {faEllipsis} from '@fortawesome/free-solid-svg-icons'

    let userId;
    let surveysRef;
    let surveys = [];

    onMount(async () => {
        authStore.subscribe((curr)=>{
            console.log("CURR1", curr);
            userId = curr?.currentUser?.uid;
        })
        surveysRef = collection(db, "users", userId, "surveys");
        // console.log(subColRef)
	    const docs = await getDocs(surveysRef);
        
        authStore.update((curr) => {
            return { ...curr, surveys: docs.docs.map(doc => ({ ...doc.data(), id: doc.id }))};
        });
    });

    authStore.subscribe((curr) => {
        surveys = curr.surveys;
    });
    async function addSurvey() {
        window.location.href = "/app/new-survey";
    }

    async function deleteSurvey(event) {
        console.log("deleting ", event.target.id);
        await deleteDoc(doc(db, "users", userId, "surveys", event.target.id));
    }

</script>
<div class='flex w-full content-center justify-center'>
    <div class='flex-col w-4/5 align-middle my-12 p-4'>
        <div class='flex-row justify-between my-8'>
            <h1 class='text-4xl'>Current Surveys</h1>
            <button on:click={addSurvey} class='bg-blue-500 px-4 py-2 rounded text-white'>+ New</button>
        </div>
        
        <table class='table-auto w-full border-collapse border-slate-600'>
            <thead class='text-left bg-slate-300'>
                <tr>
                    <th class='p-4'>Title</th>
                    <th class='p-4'>Start Date</th>
                    <th class='p-4'>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each surveys as survey}
                    {#if survey.status !== 'archived'}
                        <tr>
                            <td class='p-4'>{survey.title}</td>
                            <td class='p-4'>{survey.created}</td>
                            <td class='p-4'>{survey.status}</td>
                            <td class='flex p-4 justify-end cursor-pointer'>
                                <div class="dropdown">
                                    <Fa icon={faEllipsis}></Fa>
                                    <div class="dropdown-content">
                                        <a href="/app/survey/{survey.id}">Edit</a>
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                                        <!-- svelte-ignore a11y-missing-attribute -->
                                        <a id="{survey.id}" on:click={deleteSurvey}>Delete</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>