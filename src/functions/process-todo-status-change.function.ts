/**
 * Firebase Function que procesa en segundo plano los cambios de estado de TODOs.
 * Se ejecuta cuando se publica un mensaje en el tema configurado en .env.
 * Al finalizar (éxito o error) notifica guardando en Firestore.
 */

import { onMessagePublished } from 'firebase-functions/v2/pubsub';
import * as logger from 'firebase-functions/logger';
import admin from 'firebase-admin';
import { TODO_STATUS_CHANGED_TOPIC } from '../config/pubsub.config';

const NOTIFICATIONS_COLLECTION = 'todo_processing_notifications';

interface TodoStatusChangeEvent {
  todoId: string;
  previousStatus: string;
  newStatus: string;
  title: string;
  timestamp: string;
}

interface ProcessingNotification {
  todoId: string;
  success: boolean;
  message?: string;
  error?: string;
  event: TodoStatusChangeEvent;
  processedAt: string;
}

async function saveNotification(notification: ProcessingNotification): Promise<void> {
  const db = admin.firestore();
  await db.collection(NOTIFICATIONS_COLLECTION).add(notification);
}

export const processTodoStatusChange = onMessagePublished(
  { topic: TODO_STATUS_CHANGED_TOPIC },
  async (event) => {
    let data: TodoStatusChangeEvent;

    try {
      data = event.data.message.json as TodoStatusChangeEvent;
    } catch (e) {
      logger.error('Error parseando mensaje Pub/Sub', e);
      await saveNotification({
        todoId: 'unknown',
        success: false,
        error: 'Mensaje inválido o no es JSON',
        event: {} as TodoStatusChangeEvent,
        processedAt: new Date().toISOString(),
      });
      return;
    }

    const { todoId, previousStatus, newStatus, title } = data;

    logger.info('Procesando cambio de estado en segundo plano', {
      todoId,
      previousStatus,
      newStatus,
      title,
    });

    try {
      // Simular proceso asíncrono (ej: sincronizar con otro sistema, validar reglas, etc.)
      // Aquí puedes agregar tu lógica de negocio
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Proceso completado exitosamente
      await saveNotification({
        todoId,
        success: true,
        message: `Estado actualizado de ${previousStatus} a ${newStatus}`,
        event: data,
        processedAt: new Date().toISOString(),
      });

      logger.info('Proceso completado', { todoId, newStatus: newStatus });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('Error procesando cambio de estado', { todoId, error: errorMessage as string });

      await saveNotification({
        todoId,
        success: false,
        error: errorMessage,
        event: data,
        processedAt: new Date().toISOString(),
      });
    }
  },
);
