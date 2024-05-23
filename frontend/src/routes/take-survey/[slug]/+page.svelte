<script>
    import { goto } from '$app/navigation';

    export let data;
    const survey = JSON.parse(data.survey);
    let error;
    let responses = [];

    async function handleSubmit(event) {
        const inputs = Array.from(document.querySelectorAll('input'));
        inputs.forEach(input => {
            responses.push({
                questionId: input.id,
                response: input.value
            })
        })
        try{
            await fetch('/api/responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    surveyId: survey._id,
                    responses: responses
                })
            }).then(response => {
                if (!response.ok){
                    error = 'Error submitting survey';
                    return;
                }
            });
            goto('/take-survey/success');
        }
        catch{
            error = 'Error submitting survey';
        }
    }
</script>

<div class="flex items-center justify-center h-screen bg-blue-100">
    <div class="flex-col p-8 bg-white w-3/5">
<!-- <div class="w-full content-center justify-center"> -->
    <div class="flex-col">
        {#if error}
            <p class="text-red">{error}</p>
        {/if}
        <p class="text-4xl text-center">{survey.title}</p>
        {#each survey.questions as question}
            {#if question.questionType === 'text'}
            <div class="flex-col my-4">
                <h2>{question.questionPrompt}</h2>
                <input id={question.id} type="text" class="p-2 grow"/>
            </div>
            {/if}
            {#if question.questionType === 'slider'}
            <div class="flex-col my-4">
                <h2>{question.questionPrompt}</h2>
                <input id={question.id} type="range" min="1" max="100" value="50" class="p-2 grow"/>
            </div>
            {/if}
        {/each}
        <button on:click={handleSubmit} class="mt-4 p-2 content-center bg-blue-600 rounded text-white">Submit</button>
    </div>
    
<!-- </div> -->
</div>
</div>