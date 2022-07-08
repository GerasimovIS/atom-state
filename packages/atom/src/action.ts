import { getUid } from './uid'
import { emitter } from './event-emitter'

export type Action = (() => void) & {key: string}

// @ts-ignore
window.action = action
export function action () {
  const key = `action-${getUid()}`
  return Object.assign((payload?: any) => emitter.emit(key, payload), { key })
}
