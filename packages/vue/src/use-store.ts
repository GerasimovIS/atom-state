import { shallowRef, onUnmounted, readonly } from 'vue'

import { Atom } from '@atom-state/atom'

export function useStore <T> (store: Atom<T>) {
  const _ = shallowRef(store.get())
  const unsubscribe = store.watch(value => {
    _.value = value
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return readonly(_)
}
