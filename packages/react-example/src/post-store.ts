import { atom, effect } from '@atom-state/atom'

export const fetchPostEffect = effect(async (postId: number) => {
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)).json()
  return data
})

export const post = atom(null)
export const isPostLoading  = atom(false)

post.on(fetchPostEffect.dataDone, (_, post) => post)
isPostLoading.on(fetchPostEffect.runningAction, (_, isLoading) => isLoading)
