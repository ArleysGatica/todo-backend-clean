import { PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();

export const publishEvent = async (topicName: string, data: any) => {
  const topic = pubsub.topic(topicName);
  await topic.publishMessage({
    data: Buffer.from(JSON.stringify(data)),
  });
};