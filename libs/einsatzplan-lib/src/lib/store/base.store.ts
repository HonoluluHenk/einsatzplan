import type { Signal, WritableSignal} from "@angular/core";
import {signal} from "@angular/core";
import {produce} from "immer";

export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;

export interface JsonMap {
  [key: string]: AnyJson;
}

export type JsonArray = Array<AnyJson>


export abstract class BaseStore<State> {
  readonly #state: WritableSignal<State>;
  protected readonly state: Signal<State>;

  protected constructor(
    initialValue: State
  ) {
    this.#state = signal(initialValue);
    this.state = this.#state.asReadonly();
  }

  protected patchState(patch: (state: State) => State | void): void {
    this.#state.update(state => produce(state, (draft: State) => patch(draft)));
  }

}
