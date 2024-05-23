import { responses } from '../../../db/collections.js';

export async function GET({ url }) {
    const response = await responses.find({surveyId: url.searchParams.get('id')}).toArray();

    if (!response) {
        return new Response('Reponses not found', { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200});
}

export async function POST({ request }) {
    const body = await request.json();
    const response = await responses.insertOne(body);
    if (!response) {
        return new Response('Failed to save responses', { status: 400 });
    }
    return new Response(JSON.stringify(response), { status: 201 });
}