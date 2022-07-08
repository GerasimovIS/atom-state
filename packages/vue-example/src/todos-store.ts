import { atom, derive, action, effect } from '@atom-state/atom'

type Todo = {
  id: number;
  isDone: boolean;
  text: string;
}

// @ts-ignore
export const addTodoAction = window.addTodoAction = action()
// @ts-ignore
export const toggleDoneAction = window.toggleDoneAction = action()

// @ts-ignore
export const todos = window.todos = atom<Todo[]>([])
todos.on(addTodoAction, (todos, todo) => [...todos, todo])
todos.on(toggleDoneAction, (todos, todoId) => todos.map(t => {
    if (t.id === todoId) return { ...t, isDone: !t.isDone }
    return t
  }))

// @ts-ignore
export const todosCount = window.todosCount = derive(get => get(todos).length)

// @ts-ignore
export const fetchPostEffect = window.fetchPostEffect = effect(async (postId: number) => {
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)).json()
  return data
})

// @ts-ignore
export const post = window.post = atom(null)
export const isPostLoading  = atom(false)
post.on(fetchPostEffect.dataDone, (_, post) => post)
isPostLoading.on(fetchPostEffect.runningAction, (_, isLoading) => isLoading)
