import { emitter } from './event-emitter'
import { getUid } from './uid'
import { Event, event } from './event'

export type Atom <T> = {
  key: string;
  get (): T;
  set (reduceFn: (value: T) => T): void;
  addDep (dep: Atom<T>): void;
  deps: Set<Atom<any>>;
  watch (fn: (value: T) => void): Function;
  on (event: Event, reduceFn: (prevState: T, payload?: any) => T): Function;
  updateEvent: Event;
}

export function atom <T> (initialState: T): Readonly<Atom<T>> {
  let state = initialState
  const key = `atom-${getUid()}`
  const deps = new Set<Atom<any>>()
  const updateEvent = event()

  const atomInstance = {
    key,
    deps,
    updateEvent,
    get () {
      return state
    },
    set (reduceFn: (prevState: T, payload?: any) => T) {
      state = reduceFn(state)
      updateEvent(state)
    },
    addDep (dep: Atom<T>) {
      deps.add(dep)
    },
    watch (watchFn: (value: T) => void) {
      return emitter.on(updateEvent.key, watchFn)
    },
    on (event: Event, reduceFn: (prevState: T, payload?: any) => T) {
      return emitter.on(
        event.key,
        (payload: any) => this.set(() => reduceFn(state, payload))
      )
    }
  }

  return Object.freeze(atomInstance)
}
