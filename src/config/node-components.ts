import { NodeType } from "@/generated/prisma";
import type { NodeTypes } from "@xyflow/react";
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/components/stripe-trigger/node";
import { GeminiNode } from "@/features/executions/components/gemini/node";
import { AnthropicNode } from "@/features/executions/components/anthropic/node";
import { OpenAiNode } from "@/features/executions/components/openai/node";
import { DiscordNode } from "@/features/executions/components/discord/node";
import { SlackNode } from "@/features/executions/components/slack/node";


export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,
    [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
    [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
    [NodeType.GEMINI]: GeminiNode,
    [NodeType.ANTHROPIC]: AnthropicNode,
    [NodeType.OPENAI]: OpenAiNode,
    [NodeType.DISCORD]: DiscordNode,
    [NodeType.SLACK]: SlackNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
