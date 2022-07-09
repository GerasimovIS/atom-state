import { atom, event } from '@atom-state/atom'

export const count = atom(0)
export const increment = event()

count.on(increment, value => value + 1)



