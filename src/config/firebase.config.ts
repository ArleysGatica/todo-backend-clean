import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string)
  ),
});

export const db = admin.firestore();
export const auth = admin.auth();