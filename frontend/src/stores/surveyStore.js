import { writable } from 'svelte/store';
import { browser } from '$app/environment';


const initalSurveyValue = browser ? JSON.parse(localStorage.surveystore || null) : null;

export const surveyStore = writable(initalSurveyValue);

surveyStore.subscribe((value) => {
    if(browser){
        localStorage.surveystore = JSON.stringify(value)
    }
}); 