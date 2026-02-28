import admin from 'firebase-admin';
import dotenv from 'dotenv';

const isFirebaseEnv = process.env.FUNCTIONS_EMULATOR === 'true' || !!process.env.K_SERVICE;

function fixPrivateKey(serviceAccount: admin.ServiceAccount & { private_key?: string }) {
  const key = serviceAccount.private_key ?? serviceAccount.privateKey;
  if (!key) return;

  const fixed = key.replace(/\\n/g, '\n');
  if ('private_key' in serviceAccount) {
    serviceAccount.private_key = fixed;
  } else {
    serviceAccount.privateKey = fixed;
  }
}

if (!admin.apps.length) {
  if (isFirebaseEnv) {
    // Firebase Functions: emulador o producción
    admin.initializeApp();
  } else {
    // Local standalone (node server.ts)
    dotenv.config();

    const serviceAccount = JSON.parse(
      process.env.SERVICE_ACCOUNT_JSON as string,
    ) as admin.ServiceAccount & { private_key?: string };

    fixPrivateKey(serviceAccount);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
