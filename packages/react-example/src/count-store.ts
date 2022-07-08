import { atom, action } from '@atom-state/atom'

export const count = atom(0)
export const increment = action()

count.on(increment, value => value + 1)



