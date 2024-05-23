<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import {surveyStore} from '../../../../stores/surveyStore';

    export let data;
    let s;
    let r;
    let loaded = false;

    onMount(async () => {

        const survey = await fetch(`/api/surveys?id=${data.slug}`);
        s = await survey.json();
        let responsesCount;
        if (survey.ok) {
            const responses = await fetch(`/api/responses?id=${s._id}`);
            r = await responses.json();
            const responsesCount = resizeTo.length;
        }

        surveyStore.update((curr) => {
            return { ...curr, currentSurvey: s, responses: r, responsesCount: responsesCount}
        });
        loaded = true;
    });
</script>
{#if loaded}
    
<div class='flex w-full content-center justify-center'>
    <div class='flex-col w-4/5 align-middle my-12 p-4'>
        <h1 class="text-4xl">{s.title}</h1>
        <p>{s.description}</p>
        {#each s.questions as question}
            <div class="gap-4">
                <p>{question.order}</p>
                <h2>{question.questionPrompt}</h2>
                <p>{question.questionType}</p>
            </div>
        {/each}
        <div>{r.length} Responses</div>
    </div>
</div>
{/if}


