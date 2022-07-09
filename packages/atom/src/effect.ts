import { event } from './event'

export function effect (effectFn: Function) {
  const dataDone = event()
  const running = event()
  const done = event()
  const failed = event()

  async function execute (...args: any[]) {
    try {
      running(true)
      const data = await effectFn(...args)
      dataDone(data)
    } catch (e) {
      failed(e)
      throw e
    } finally {
      done()
      running(false)
    }
  }

  return Object.assign(
    execute,
    { dataDone, running, done, failed }
  )
}
