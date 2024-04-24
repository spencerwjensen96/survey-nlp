<script>
    import { db } from '../../../lib/firebase/firebase.app';
    import {addDoc, collection} from 'firebase/firestore';  
    export let data;
    const survey = data.survey;
    const responsesRef = data.responsesRef;
    let responses = [];

    async function handleSubmit(event) {
        const inputs = Array.from(document.querySelectorAll('input'));
        console.log(inputs)
        inputs.forEach(input => {
            responses.push({
                questionId: input.id,
                response: input.value
            })
        })
        await addDoc(responsesRef,{
            responses: responses
        })
    }
</script>

<div class="w-full content-center justify-center">
    <div class="flex-col w-3/5">
        <p>{survey.title}</p>
        {#each survey.questions as question}
            {#if question.questionType === 'text'}
                <h2>{question.questionPrompt}</h2>
                <input id={question.id} type="text" />
            {/if}
        {/each}
        <button on:click={handleSubmit} class="mt-4 p-2 content-center bg-blue-600 rounded text-white">Submit</button>
    </div>
    
</div>