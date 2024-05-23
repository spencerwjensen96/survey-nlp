import { surveys } from '../../../db/collections.js';
import { ObjectId } from 'mongodb';

export async function GET({ url }) {
    let response;
    if (url.searchParams.get('owner_id')){
        response = await surveys
        .find({owner_id: url.searchParams.get('owner_id')})
        .toArray();
    }
    if (url.searchParams.get('id')){
        response = await surveys.findOne({ _id: new ObjectId(url.searchParams.get('id')) });
    }

    if (!response){
        return new Response('Survey(s) not found', { status: 404 });
    }

	return new Response(JSON.stringify(response), { status: 200 });
}

export async function POST({ request }) {
    const body = await request.json();
    const survey = await surveys.insertOne(body);
    if (!survey) {
        return new Response('Failed to create survey', { status: 400 });
    }
    return new Response(JSON.stringify(survey), { status: 201 });
}