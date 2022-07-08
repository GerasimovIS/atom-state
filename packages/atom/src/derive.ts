import { emitter } from './event-emitter'
import { atom, Atom } from './atom'

const getFn = <T> (atom: Atom<T>): T => atom.get()
export type DeriveFn <T> = (get: typeof getFn) => T

// @ts-ignore
window.derive = derive
export function derive <T> (deriveFn: DeriveFn<T>): Atom<T> {
  const deps = new Set<Atom<any>>()
  const state = deriveFn(atom => {
    deps.add(atom)
    return getFn(atom)
  })

  const derivedAtom = atom(state)

  for (const dep of deps) {
    derivedAtom.addDep(dep)
    emitter.on(dep.key, () => derivedAtom.set(_ => deriveFn(getFn)))
  }

  return derivedAtom
}
