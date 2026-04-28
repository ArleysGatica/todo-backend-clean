# Todo Backend - Pub/Sub Status Change

## Cambio de estado con Pub/Sub

Cuando cambias el estado de una tarea (`PATCH /api/todos/:id/status`), el flujo es:

1. **HTTP**: Se actualiza el estado en Firestore y se responde de inmediato.
2. **Pub/Sub**: Se publica un evento en el topic configurado en `.env`.
3. **Segundo plano**: La Firebase Function `processTodoStatusChange` procesa el evento de forma asíncrona.
4. **Notificación**: Al terminar (éxito o error) se guarda en la colección Firestore `todo_processing_notifications`.

### Variables de entorno (.env)

| Variable | Descripción |
|----------|-------------|
| `TODO_STATUS_CHANGED_TOPIC` | Topic Pub/Sub (ruta completa o nombre). Ej: `projects/PROJECT/topics/todo-status-changed` |
| `TODO_STATUS_CHANGED_SUBSCRIPTION` | Subscription para pull (opcional). Ej: `projects/PROJECT/subscriptions/todo-status-changed-sub` |
| `GOOGLE_CLOUD_PROJECT` | ID del proyecto GCP |
| `SERVICE_ACCOUNT_JSON` | Credenciales Firebase (para Firestore y Pub/Sub) |

### Endpoints

- `PATCH /api/todos/:id/status` – Actualizar estado (body: `{ "status": "COMPLETED" }`).
- Estados válidos: `PENDING`, `COMPLETED`, `IN_PROGRESS`, `CANCELLED`, `ON_HOLD`, `CREATED`.

### Notificaciones

Las notificaciones se guardan en `todo_processing_notifications` con:

- `todoId`, `success`, `message` (éxito), `error` (fallo), `event`, `processedAt`

Puedes escucharlas en tiempo real con `onSnapshot` de Firestore.

### Crear el topic de Pub/Sub

```bash
# Usa las variables de .env automáticamente
node scripts/create-pubsub-topic.js
```

O con gcloud: `gcloud pubsub topics create todo-status-changed --project=tu-proyecto`

### Despliegue en GCP

Para producción, configura en Cloud Console → Cloud Functions → tu función → Variables de entorno:

- `TODO_STATUS_CHANGED_TOPIC` = `projects/medicall-15e2c/topics/todo-status-changed`

### Emulador local

```bash
firebase emulators:start --only functions,pubsub
```
