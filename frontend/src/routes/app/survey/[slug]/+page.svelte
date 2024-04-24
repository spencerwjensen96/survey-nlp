<script>
  import { onMount } from 'svelte';
    import {surveyStore} from '../../../../stores/surveyStore';
    export let data;

    let survey;
    let responses;
    surveyStore.subscribe((curr) => {
        survey = curr.survey;
        responses = curr.responses;
    });
    console.log(responses);
    onMount(async () => {
        if(data.error){
            window.location.href = '/app';
        }
    });
</script>
<div class='flex w-full content-center justify-center'>
    <div class='flex-col w-4/5 align-middle my-12 p-4'>
        <h1 class="text-4xl">{survey.title}</h1>
        <p>{survey.description}</p>
        {#each survey.questions as question}
            <div class="gap-4">
                <p>{question.order}</p>
                <h2>{question.questionPrompt}</h2>
                <p>{question.questionType}</p>
            </div>
        {/each}
        <div>{responses.length} Responses</div>
    </div>
</div>


