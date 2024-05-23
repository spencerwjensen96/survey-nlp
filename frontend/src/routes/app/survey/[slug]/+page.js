// import { surveyStore } from "../../../../stores/surveyStore";
// import { authStore } from "../../../../stores/authStore";
// import { APP_ROOT } from "$env/static/private";

export const load = async ({ params }) => {

//     const survey = await fetch(`/api/surveys?id=${params.slug}`);
//     const surveyJson = await survey.json();

//     if (survey.ok) {
//         const responses = await fetch(`/api/responses?survey_id=${surveyJson._id}`);
//         const responsesJson = await responses.json();
//         const responsesCount = responsesJson.length;
//     }

//     surveyStore.update((curr) => {
//         return { ...curr, currentSurvey: surveyJson, responses: responsesJson, responsesCount: responsesCount}
//     });
    return {
        slug: params.slug
    }
}