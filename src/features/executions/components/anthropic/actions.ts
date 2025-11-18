"use server";

import { anthropicChannel } from "@/inngest/channels/anthropic";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";

export type AnthropicToken = Realtime.Token<typeof anthropicChannel, ["status"]>;
export async function fetchAnthropicRealtimeToken(): Promise<AnthropicToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: anthropicChannel(),
        topics: ["status"],
    });

    return token;
}
