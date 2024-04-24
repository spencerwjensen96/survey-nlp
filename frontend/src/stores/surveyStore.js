import { writable } from 'svelte/store';

export const surveyStore = writable({
    survey: {},
    responses: []
});