import { users } from '../../../db/collections.js';

export async function GET({ url }) {
    let user;
    if (url.searchParams.get('id') !== null) {
        user = await users.findOne({ _id: url.searchParams.get('id') });
    }
    if (url.searchParams.get('google_id') !== null) {
        user = await users.findOne({ google_id: url.searchParams.get('google_id') });
    }
    if (!user) {
        return new Response('User not found', { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200});
}

export async function POST({ request }) {
    const body = await request.json();
    const db_user = await users.findOne({ google_id: body.google_id });
    if (db_user) {
        return new Response('User already exists', { status: 400 });
    }
    const user = await users.insertOne(body);
    if (!user) {
        return new Response('Failed to create user', { status: 400 });
    }
    return new Response(JSON.stringify(user), { status: 201 });
}