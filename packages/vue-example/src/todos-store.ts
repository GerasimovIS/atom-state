import { atom, derive, event, effect } from '@atom-state/atom'

type Todo = {
  id: number;
  isDone: boolean;
  text: string;
}

export const addTodoEvent = event()
export const toggleDoneEvent = event()

export const todos = atom<Todo[]>([])
todos.on(addTodoEvent, (todos, todo) => [...todos, todo])
todos.on(toggleDoneEvent, (todos, todoId) => todos.map(t => {
    if (t.id === todoId) return { ...t, isDone: !t.isDone }
    return t
  }))

export const todosCount = derive(get => get(todos).length)

export const fetchPostEffect = effect(async (postId: number) => {
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)).json()
  return data
})

export const post = atom(null)
export const isPostLoading  = atom(false)
post.on(fetchPostEffect.dataDone, (_, post) => post)
isPostLoading.on(fetchPostEffect.running, (_, isLoading) => isLoading)
