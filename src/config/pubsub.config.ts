import dotenv from 'dotenv';
import { PubSub } from '@google-cloud/pubsub';

dotenv.config();

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const isFirebaseEnv = process.env.FUNCTIONS_EMULATOR === 'true' || !!process.env.K_SERVICE;

function getPubSubOptions(): ConstructorParameters<typeof PubSub>[0] {
  const options: ConstructorParameters<typeof PubSub>[0] = projectId ? { projectId } : {};

  // En desarrollo local: usar SERVICE_ACCOUNT_JSON (PubSub no usa ADC por defecto)
  if (!isFirebaseEnv && process.env.SERVICE_ACCOUNT_JSON) {
    try {
      const sa = JSON.parse(process.env.SERVICE_ACCOUNT_JSON) as {
        private_key?: string;
        privateKey?: string;
      };
      const key = sa.private_key ?? sa.privateKey;
      if (key) {
        sa.private_key = key.replace(/\\n/g, '\n');
        sa.privateKey = sa.private_key;
      }
      options.credentials = sa;
    } catch {
      // Si falla el parse, PubSub usará ADC
    }
  }

  return options;
}

export const pubsubClient = new PubSub(getPubSubOptions());

/** Topic: nombre corto o ruta completa (ej: projects/PROJECT/topics/todo-status-changed) */
export const TODO_STATUS_CHANGED_TOPIC =
  process.env.TODO_STATUS_CHANGED_TOPIC ?? 'todo-status-changed';

/** Subscription: ruta completa para pull (ej: projects/PROJECT/subscriptions/todo-status-changed-sub) */
export const TODO_STATUS_CHANGED_SUBSCRIPTION = process.env.TODO_STATUS_CHANGED_SUBSCRIPTION ?? '';
