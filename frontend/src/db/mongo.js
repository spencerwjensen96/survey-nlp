import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

// Atlas
// const uri = "mongodb+srv://" 
//     + process.env['MONGODB_USER'] + ":"
//     + process.env['MONGODB_PASSWORD'] + "@"
//     + process.env['MONGODB_URL']
//     + "/" + process.env['MONGODB_DB']
//     + "?retryWrites=true&w=majority&appName="
//     + process.env['MONGODB_APP_NAME'];

const uri = "mongodb://localhost:27017/surveynlp";

if (!uri) {
    throw new Error('Please add your Mongo URI to .env')
}

const client = new MongoClient(uri)

export async function start_mongo() {
    await client.connect()
}

export default client.db();