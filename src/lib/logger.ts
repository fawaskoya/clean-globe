type LogContext = Record<string, unknown>;

function log(level: "error" | "warn" | "info", message: string, context?: LogContext) {
  const entry = { level, message, ...context, ts: new Date().toISOString() };
  if (level === "error") console.error(JSON.stringify(entry));
  else if (level === "warn") console.warn(JSON.stringify(entry));
  else console.log(JSON.stringify(entry));
}

export const logger = {
  error: (message: string, context?: LogContext) => log("error", message, context),
  warn: (message: string, context?: LogContext) => log("warn", message, context),
  info: (message: string, context?: LogContext) => log("info", message, context),
};
