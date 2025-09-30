import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { env } from "@/env";

Sentry.init({
	dsn: env.SENTRY_DSN, // Sentry DSN
	sendDefaultPii: true,
	integrations: [
		nodeProfilingIntegration(),
		Sentry.consoleLoggingIntegration({
			levels: ["error", "info"],
		}),
		Sentry.postgresIntegration(),
	],
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
	enableLogs: true,
});
