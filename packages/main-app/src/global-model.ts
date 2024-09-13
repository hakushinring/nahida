import { createModel, createContext } from './utils/create-context'

interface ModelState {
}
const initState: ModelState = {
}

const GlobalContext = createContext<ModelState>(initState)
export { GlobalContext }

export default createModel(initState, {
  init () {
    return { ...initState }
  },
})
