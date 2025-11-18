"use server";

import { geminiChannel } from "@/inngest/channels/gemini";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";

export type GeminiToken = Realtime.Token<typeof geminiChannel, ["status"]>;
export async function fetchGeminiRealtimeToken(): Promise<GeminiToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: geminiChannel(),
        topics: ["status"],
    });

    return token;
}
