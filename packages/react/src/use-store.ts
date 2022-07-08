import { useState, useEffect } from 'react'
import { Atom } from '@atom-state/atom'

export function useStore<T> (store: Atom<T>): T {
  const [state, setState] = useState(store.get())

  useEffect(() => {
    const unsubscribe = store.watch(value => setState(value))
    return () => unsubscribe()
  }, [])

  return state
}
