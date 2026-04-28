/**
 * Script para crear el topic de Pub/Sub.
 * Ejecutar: node scripts/create-pubsub-topic.js
 *
 * Usa .env: TODO_STATUS_CHANGED_TOPIC, GOOGLE_CLOUD_PROJECT
 * Si TODO_STATUS_CHANGED_TOPIC tiene formato projects/X/topics/Y, usa Y como nombre.
 */

require('dotenv').config();

const { PubSub } = require('@google-cloud/pubsub');

async function createTopic() {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT;
  const pubsub = new PubSub(projectId ? { projectId } : {});

  let topicName = process.env.TODO_STATUS_CHANGED_TOPIC || 'todo-status-changed';
  if (topicName.includes('/topics/')) {
    topicName = topicName.split('/topics/').pop();
  }

  try {
    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic "${topicName}" creado correctamente.`);
  } catch (err) {
    if (err.code === 6) {
      // ALREADY_EXISTS
      console.log(`El topic "${topicName}" ya existe.`);
    } else {
      throw err;
    }
  }
}

createTopic().catch(console.error);
