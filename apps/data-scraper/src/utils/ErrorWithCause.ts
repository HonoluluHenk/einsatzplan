import { hasValue } from '@einsatzplan/shared-util/nullish';

export class ErrorWithCause extends Error {

  constructor(message: string, readonly cause: unknown) {
    const msg = parseMessage(message, cause);
    super(msg);

  }
}

function parseMessage(message: string, cause: unknown): string {
  if (cause instanceof Error) {
    return (`${message} (cause: ${cause.message})`);
  }
  if (hasValue(cause)) {
    return `${message} (cause: ${JSON.stringify(cause)})`;
  }

  return message;
}

