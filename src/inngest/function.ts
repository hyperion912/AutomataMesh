import { inngest } from "./client";
import { prisma } from "@/lib/db";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import * as Sentry from "@sentry/nextjs";



export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) =>{
    await step.sleep("pretend-sleep", "5s")

    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })

    
    const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text", generateText, {
      system: "You are a helpful assistant that generates text based on user prompts.",
      model: google("gemini-2.5-flash"),
      prompt: "what is 2+2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },

    })

    const { steps: openAiSteps } = await step.ai.wrap("openai-generate-text", generateText, {
      system: "You are a helpful assistant that generates text based on user prompts.",
      model: openai("gpt-4"),
      prompt: "what is 2+2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },

    })

    const { steps: anthropicSteps } = await step.ai.wrap("anthropic-generate-text", generateText, {
      system: "You are a helpful assistant that generates text based on user prompts.",
      model: anthropic("claude-3-5-haiku-latest"),
      prompt: "what is 2+2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },      
    })

    return { geminiSteps, openAiSteps, anthropicSteps }
  },
);
