function createEventEmitter () {
  const events: Record<string, Function[]> = Object.create(null)

  const off = (name: string, fn: Function): void => {
    if (events[name]) {
      events[name] = events[name].filter(eventFn => eventFn !== fn)
    }
  }

  const on = (name: string, fn: Function): Function => {
    if (!events[name]) {
      events[name] = []
    }

    events[name].push(fn)

    return () => {
      off(name, fn)
    }
  }

  const emit = (name: string, ...args: any[]): void => {
    if (events[name]) {
      for (const fn of events[name]) {
        fn(...args)
      }
    }
  }

  return {
    events,
    on,
    off,
    emit
  }
}

export const emitter = Object.freeze(createEventEmitter())
