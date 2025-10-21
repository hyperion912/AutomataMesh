// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a25ad7ccef31cca85865d94c5b5b3a03@o4510225994940416.ingest.de.sentry.io/4510226040029264",

  integrations: [
  // Add the Vercel AI SDK integration to sentry.server.config.ts
  Sentry.vercelAIIntegration({
    recordInputs: true,
    recordOutputs: true,
  }),

  Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],


  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
});
