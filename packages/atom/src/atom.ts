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
  on (event: Event, reduceFn: (prevState: T, payload?: any) => T): Atom<T>;
  reset (...events: Event[]): Atom<T>;
  updateEvent: Event;
}

export function atom <T> (initialState: T): Atom<T> {
  let state = initialState
  const resetState = initialState
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
      emitter.on(
        event.key,
        (payload: any) => atomInstance.set(() => reduceFn(state, payload))
      )

      return atomInstance
    },
    reset (...events: Event[]) {
      for (const event of events) {
        emitter.on(
          event.key,
          () => atomInstance.set(() => resetState)
        )
      }

      return atomInstance
    }
  }

  return atomInstance
}
