import db from "./mongo";

export const users = db.collection("users");

export const surveys = db.collection("surveys");

export const responses = db.collection("responses");