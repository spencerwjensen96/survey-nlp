<script>
    import {onMount} from 'svelte';
    import {authStore} from '../../../stores/authStore';
    import {db} from '../../../lib/firebase/firebase.app';
    import {addDoc, collection} from 'firebase/firestore';
    import Modal from '$lib/components/Modal.svelte';
    import { v4 as uuidv4 } from 'uuid';


    let showModal = false;
    let surveyQuestions = [];
    let userId;
    let surveysRef;

    onMount(async () => {
        authStore.subscribe((curr)=>{
            userId = curr?.currentUser?.uid;
        })
        surveysRef = collection(db, "users", userId, "surveys");
    });

    function addQuestion(){
        const questionType = document.getElementById('questionType').value;
        const questionPrompt = document.getElementById('questionPrompt').value;

        surveyQuestions = [...surveyQuestions, {id: uuidv4(), questionType: questionType, questionPrompt: questionPrompt, order: surveyQuestions.length + 1}];
        showModal = false;
    }

    async function createSurvey(){
        await addDoc(surveysRef, {
            title: document.getElementById('surveyName').value,
            description: document.getElementById('surveyDescription').value,
            questions: surveyQuestions,
            created: new Date().toISOString(),
            status: 'in-progress'
        });
        window.location.href = '/app';
    }
</script>


<div class="flex w-full content-center justify-center">
    <div class="flex-col w-4/5 align-middle my-12 p-4">
        <h1 class="text-4xl my-8 text-center">New Survey</h1>
        <div class="flex-col">
            <label for="surveyName">Survey Name</label>
            <input id="surveyName" placeholder="Survey Name" class="py-2">
        </div>
        <div class="flex-col">
            <label for="surveyDescription">Survey Description</label>
            <textarea id="surveyDescription" placeholder="Survey Description" class="py-2"></textarea>
        </div>
        <div class="flex justify-between">
            <label for="surveyQuestions">Survey Questions</label>
            <button on:click={() => (showModal = true)} class="px-4 py-2 bg-blue-500 text-white rounded">New Question</button>
        </div>
        {#if surveyQuestions.length === 0}
            <p>No questions added yet</p>
        {:else}
        <table class="my-8">
            <thead class="bg-slate-500 text-white text-left">
                <th>Order</th>
                <th>Prompt</th>
                <th>Type</th>
            </thead>
            <tbody>
            {#each surveyQuestions as question, index}
                <tr>
                    <td>{index}</td>
                    <td>{question.questionPrompt}</td>
                    <td>{question.questionType}</td>
                </tr>
            {/each}
            </tbody>
        
        </table>
        {/if}   

        <Modal bind:showModal>
            <span slot="header">
                New Question
            </span>
            <div class="flex-col gap-2">
                
                <div class="gap-4">
                    <label for="questionType" class="">Question Type</label>
                    <select id="questionType">
                        <option value="text">Text</option>
                        <option value="slider">Slider</option>
                    </select>
                </div>

                <div class="flex-col">
                    <label for="questionPrompt" class="">Question Prompt</label>
                    <input id="questionPrompt" placeholder="Question Prompt" class="py-2" type="text">
                </div>
            </div>
            <span slot="buttons">
                <button on:click={addQuestion} class='bg-blue-500 px-4 py-2 rounded text-white'>Save</button>
            </span>
            
        </Modal>
        <button on:click={createSurvey} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Create</button>
    </div>
</div>