type TraceLevel = 'off' | 'trace' | 'error' | 'all';

const tracingEnabled: TraceLevel = 'off';

export async function withTracing<T>(
  step: string,
  callback: () => Promise<T>,
): Promise<T> {

  if (tracingEnabled === 'off') {
    return callback();
  }

  try {
    on('trace', () => console.log(`start: ${step}`));
    const result = await callback();
    on('trace', () => console.log(`stop : ${step}`));
    return result;
  } catch (e) {
    on('error', () => console.log(`error: ${step}`));
    throw e;
  }

  function on(level: TraceLevel, levelCallback: () => void): void {
    if ((tracingEnabled === level) || (tracingEnabled === 'all')) {
      levelCallback();
    }
  }
}

