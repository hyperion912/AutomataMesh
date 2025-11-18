import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import Handlebars from "handlebars";
import { openAiChannel } from "@/inngest/channels/openai";
import { createOpenAI} from "@ai-sdk/openai";
import { generateText } from "ai";

Handlebars.registerHelper("json", (context) => {
    const jsonString = JSON.stringify(context, null, 2);
    const safeString = new Handlebars.SafeString(jsonString);

    return safeString;
});

type OpenAiData = {
    variableName?: string;
    model?: string;
    systemPrompt?: string;
    userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async ({
    data,
    nodeId,
    context,
    step,
    publish,
}) => {
    await publish(
        openAiChannel().status({
            nodeId,
            status: "loading",
        })
    );

    if(!data.variableName){
        await publish(
            openAiChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw new NonRetriableError("Variable name is required");
    }

    if(!data.userPrompt){
        await publish(
            openAiChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw new NonRetriableError("User prompt is required");
    }

    const systemPrompt = data.systemPrompt
        ? Handlebars.compile(data.systemPrompt)(context)
        : "You are a helpful assistant.";
    const userPrompt = Handlebars.compile(data.userPrompt)(context);

    const credentialValue = process.env.OPENAI_API_KEY;

    const openai = createOpenAI({
        apiKey: credentialValue,
    });

    try {
        const { steps } = await step.ai.wrap(
            "openai-generate-text",
            generateText,
            {
                model: openai(data.model || "gpt-4"),
                system: systemPrompt,
                prompt: userPrompt,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                },
            }
        );

        const text =
            steps[0].content[0].type === "text" ? steps[0].content[0].text : "";
        await publish(
            openAiChannel().status({
                nodeId,
                status: "success",
            })
        );
        return {
            ...context,
            [data.variableName]: {
                text,
            },
        };
    } catch(error) {
        await publish(
            openAiChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw error;
    }
};
