import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import Handlebars from "handlebars";
import { slackChannel } from "@/inngest/channels/slack";
import { decode } from "html-entities";
import ky from "ky";


Handlebars.registerHelper("json", (context) => {
    const jsonString = JSON.stringify(context, null, 2);
    const safeString = new Handlebars.SafeString(jsonString);

    return safeString;
});

type SlackData = {
    variableName?: string;
    webhookUrl?: string;
    content?: string;
};

export const slackExecutor: NodeExecutor<SlackData> = async ({
    data,
    nodeId,
    context,
    step,
    publish,
}) => {
    await publish(
        slackChannel().status({
            nodeId,
            status: "loading",
        })
    );

    if (!data.variableName) {
        await publish(
            slackChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw new NonRetriableError("Slack node: Variable name is required");
    }

    if (!data.content) {
        await publish(
            slackChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw new NonRetriableError("Slack node: Content is required");
    }

    const rawContent = Handlebars.compile(data.content)(context);
    const content = decode(rawContent);

    try {
        const result = await step.run("slack-webhook", async () => {
            if (!data.variableName) {
                await publish(
                    slackChannel().status({
                        nodeId,
                        status: "error",
                    })
                );
                throw new NonRetriableError(
                    "Slack node: Variable name is required"
                );
            }

            if (!data.webhookUrl) {
                await publish(
                    slackChannel().status({
                        nodeId,
                        status: "error",
                    })
                );
                throw new NonRetriableError(
                    "Slack node: Webhook URL is required"
                );
            }

            await ky.post(data.webhookUrl, {
                json: {
                    content: content,
                },
            });

            return {
                ...context,
                [data.variableName]: {
                    messageContent: content.slice(0, 2000),
                },
            };
        });

        await publish(
            slackChannel().status({
                nodeId,
                status: "success",
            })
        );

        return result;
    } catch (error) {
        await publish(
            slackChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw error;
    }
};
