export class Task {
  constructor(
    readonly name: string,
    readonly enabled: boolean,
    readonly task: () => Promise<void>,
  )
  {
    // nop
  }

  async execute() {
    try {
      if (this.enabled) {
        await this.task();
      }

    } catch (e) {
      if (e instanceof Error) {
        throw Error(`${this.name} failed: ${e.message}`);
      } else {
        throw Error(`${this.name} failed: ${JSON.stringify(e)}`);
      }
    }
  }
}
