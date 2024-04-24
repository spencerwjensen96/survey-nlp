import { db } from "../../../lib/firebase/firebase.app";
import { collection, doc, getDoc, } from "firebase/firestore";

export const load = async ({ params }) => {

    let userId;
    let surveyId;
    let surveyRef;
    let responsesRef;
    let paths;
    
    paths = params.slug.split('$');
    
    userId = paths.slice(-2,-1)[0];
    surveyId = paths.slice(-1)[0];
    surveyRef = doc(db, "users", userId, "surveys", surveyId);
    responsesRef = collection(db, "users", userId, "surveys", surveyId, "responses");
    console.log(surveyRef);
    const survey = await getDoc(surveyRef);
    // console.log(survey.data());

    return {
        survey: survey.data(),
        responsesRef: responsesRef
    }
}