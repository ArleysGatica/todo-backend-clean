import { injectable } from 'tsyringe';
import { pubsubClient, TODO_STATUS_CHANGED_TOPIC } from '../../../../config/pubsub.config';
import {
  TodoStatusChangeEvent,
  TodoStatusChangePublisher,
} from '../../domain/services/todo-status-change.publisher';

@injectable()
export class PubSubTodoStatusChangePublisher implements TodoStatusChangePublisher {
  async publish(event: TodoStatusChangeEvent): Promise<void> {
    const topic = pubsubClient.topic(TODO_STATUS_CHANGED_TOPIC);
    const dataBuffer = Buffer.from(JSON.stringify(event));
    await topic.publishMessage({ data: dataBuffer });
  }
}
