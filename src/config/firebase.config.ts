import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT as string,
) as admin.ServiceAccount & { private_key?: string };

const key = serviceAccount.private_key ?? serviceAccount.privateKey;
if (key) {
  const fixed = key.replace(/\\n/g, '\n');
  if ('private_key' in serviceAccount) {
    serviceAccount.private_key = fixed;
  } else {
    serviceAccount.privateKey = fixed;
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
