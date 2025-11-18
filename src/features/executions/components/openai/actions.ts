"use server";

import { openAiChannel } from "@/inngest/channels/openai";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";

export type OpenAiToken = Realtime.Token<typeof openAiChannel, ["status"]>;
export async function fetchOpenAiRealtimeToken(): Promise<OpenAiToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: openAiChannel(),
        topics: ["status"],
    });

    return token;
}
