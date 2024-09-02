export async function withTracing<T>(
  step: string,
  callback: () => Promise<T>,
): Promise<T> {
  const tracingEnabled = false;
  if (tracingEnabled) {
    try {
      console.log(`start: ${step}`);
      const result = await callback();
      console.log(`stop : ${step}`);
      return result;
    } catch (e) {
      console.log(`error: ${step}`);
      throw e;
    }
  } else {
    return callback();
  }
}
