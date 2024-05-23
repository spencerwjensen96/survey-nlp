import { surveys } from '../../../db/collections.js';
import { ObjectId } from 'mongodb';

export const load = async ({ params }) => {

    let userId;
    let surveyId;
    
    let paths = params.slug.split('$');
    
    userId = paths.slice(-2,-1)[0];
    surveyId = paths.slice(-1)[0];
    const survey = await surveys.findOne({owner_id: userId, _id: new ObjectId(surveyId)});

    return {
        survey: JSON.stringify(survey)
    }
}