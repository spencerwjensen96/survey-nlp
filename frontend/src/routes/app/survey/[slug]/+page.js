import { surveyStore } from "../../../../stores/surveyStore";
import { authStore } from "../../../../stores/authStore";
import { db } from "../../../../lib/firebase/firebase.app";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";

export const load = async ({ params }) => {
    let userId;
    authStore.subscribe((curr)=>{
        userId = curr?.currentUser?.uid;
    })

    let responsesRef;
    let surveyRef;

    if (!userId) {
        return { error: "error" };
    }

    surveyRef = doc(db, "users", userId, "surveys", params.slug);
    responsesRef = collection(db, "users", userId, "surveys", params.slug, "responses");

    const survey = await getDoc(surveyRef);
    const responses = await getDocs(responsesRef);

    surveyStore.update((curr) => {
        return { ...curr, survey: survey.data(), responses: responses.docs.map(doc => doc.data())}
    });
    return {
        slug: params.slug
    }
}