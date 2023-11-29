import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const orchestrator = () => {}

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("orchestrator", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('orchestrator', {
    connection: 'azureQueueConnection',
    queueName: '33212162-31623221-52e8b7039aa80e8d76ce',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});