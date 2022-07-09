import { getUid } from './uid'
import { emitter } from './event-emitter'

export type Event = (() => void) & {key: string}

export function event () {
  const key = `event-${getUid()}`
  return Object.assign(
    (payload?: any) => emitter.emit(key, payload),
    { key }
  )
}
