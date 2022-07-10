import { atom, derive, event } from '@atom-state/atom'

export const addNumberEvent = event()
export const cleartNumbersEvent = event()

export const $numbers = atom<number[]>([])
  .on(addNumberEvent, (numbers, payload: number) => [...numbers, payload])
  .reset(cleartNumbersEvent)

export const $doubledNumbers = derive(get => get($numbers).map(n => n * 2))
export const $onlyOddNumbers = derive(get => get($numbers).filter(n => n % 2 === 0))
