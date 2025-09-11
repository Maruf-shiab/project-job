// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
//const Sentry = require("@sentry/node");
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://b2ff74ff350a942e32d7376a5ac79bc5@o4510000384442368.ingest.us.sentry.io/4510000389029888",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [

    Sentry.mongooseIntegration()

  ],
  sendDefaultPii: true,
});