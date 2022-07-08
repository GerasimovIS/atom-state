import { emitter } from './event-emitter'
import { getUid } from './uid'
import { Action } from './action'

export type Atom <T> = {
  key: string;
  get (): T;
  set (reduceFn: (value: T) => T): void;
  addDep (dep: Atom<T>): void;
  deps: Set<Atom<any>>;
  watch (fn: (value: T) => void): Function;
  on (action: Action, reduceFn: (prevState: T, payload?: any) => T): Function;
}

// @ts-ignore
window.atom = atom
export function atom <T> (initialState: T): Atom<T> {
  let state = initialState
  const key = `atom-${getUid()}`
  const deps = new Set<Atom<any>>()

  return {
    key,
    get () {
      return state
    },
    set (reduceFn: (prevState: T, payload?: any) => T) {
      state = reduceFn(state)
      emitter.emit(key, state)
    },
    addDep (dep: Atom<T>) {
      deps.add(dep)
    },
    watch (watchFn: (value: T) => void) {
      return emitter.on(key, watchFn)
    },
    on (action: Action, reduceFn: (prevState: T, payload?: any) => T) {
      return emitter.on(action.key, (payload: any) => this.set(() => reduceFn(state, payload)))
    },
    deps
  }
}
