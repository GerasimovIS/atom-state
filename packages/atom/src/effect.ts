import { action } from './action'

export function effect (effectFn: Function) {
  const dataDone = action()
  const runningAction = action()
  const doneAction = action()
  const failedAction = action()

  async function execute (...args: any[]) {
    try {
      runningAction(true)
      const data = await effectFn(...args)
      dataDone(data)
    } catch (e) {
      failedAction()
      throw e
    } finally {
      doneAction()
      runningAction(false)
    }
  }

  return Object.assign(execute, { dataDone, runningAction, doneAction, failedAction })
}
