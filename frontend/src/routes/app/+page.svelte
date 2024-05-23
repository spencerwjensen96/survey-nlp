<script>
    import {onMount} from 'svelte';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    import {authStore} from '../../stores/authStore';
    import {surveyStore} from '../../stores/surveyStore';
    
    import Fa from 'svelte-fa'
    import {faEllipsis} from '@fortawesome/free-solid-svg-icons'

    export let data;

    let user_id;
    let surveys;

    if(browser){
        if(localStorage.authstore){
            const authStorage = JSON.parse(localStorage.authstore);
            user_id = authStorage.currentUser._id;
        }
        if(localStorage.surveystore && localStorage.surveystore !== 'null'){
            const surveyStorage = JSON.parse(localStorage.surveystore);
            surveys = surveyStorage.surveys;
        }
        else{
            authStore.subscribe((curr) => {
                user_id = curr?.currentUser?._id;
            });
            surveyStore.subscribe((curr) => {
                surveys = curr?.surveys;
            });
        }   
    }
    
    onMount(async () => {
        if(!surveys){
            surveys = await fetch(`/api/surveys?owner_id=${user_id}`)
                .then(async (response) => {
                    if(!response.ok){
                        console.error('Failed to fetch surveys');
                    }
                    let s = await response.json()
                    surveyStore.set({surveys: s});
                    return s;
                });
            surveyStore.set({surveys: surveys});
        }
    });
    
    async function addSurvey() {
        goto("/app/new-survey");
    }

    async function deleteSurvey(event) {
        console.log("deleting ", event.target.id);
        // await deleteDoc(doc(db, "users", userId, "surveys", event.target.id));
    }

    function copySurveyLink(event) {
        let id = event.target.id;
        event.stopPropagation();
        const link = data.app_root + "take-survey/" + id;
        // console.log(public_config.app_root + copyText);
        navigator.clipboard.writeText(link)
                .then(() => {
                    alert('Survey link (' + link + ') copied to clipboard');
                })
                .catch((error) => {
                    console.error('Failed to copy survey link to clipboard:', error);
                });        
    }

    function editSurvey(event) {
        goto("/app/survey/" + event.target.parentElement.id);
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
                {#if !surveys || surveys.length === 0}
                    <tr>
                        <button on:click={addSurvey} class='bg-blue-500 px-4 py-2 rounded text-white'>Add New Survey</button>
                    </tr>
                {:else}
                {#each surveys as survey}
                    {#if survey.status !== 'archived'}
                        <tr id={survey._id} on:click={editSurvey}>
                            <td class='p-4'>{survey.title}</td>
                            <td class='p-4'>{survey.created}</td>
                            <td class='p-4'>{survey.status}</td>
                            <td class='flex p-4 justify-end cursor-pointer'>
                                <div class="dropdown">
                                    <Fa icon={faEllipsis}></Fa>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <div class="dropdown-content">
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                                        <a id={user_id + "$" + survey._id} on:click={copySurveyLink} class="flex justify-between">
                                            <span>Share Link</span>
                                        </a>

                                        <a href="/app/survey/{survey._id}">Edit</a>
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                                        <!-- svelte-ignore a11y-missing-attribute -->
                                        <a id="{survey._id}" on:click={deleteSurvey}>Delete</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>