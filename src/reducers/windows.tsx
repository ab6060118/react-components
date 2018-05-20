import { WindowsState, IWindows } from './store_type';
import { WINDOWS_ACTION } from '../actions/action_type';

const initState:WindowsState = {
  windows:{},
  order:[]
}

export default (state:WindowsState = initState, action:{type:WINDOWS_ACTION, id:string, component?:string, metadata?:any, key?:string, value?:any}) => {
  switch(action.type) {
    case WINDOWS_ACTION.CREATE_WINDOW:
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            id: action.id,
            component: action.component,
            isMined: false,
            metadata: action.metadata || {}
          }
        },
        order: [
          ...state.order,
          action.id
        ]
      }
    case WINDOWS_ACTION.DELETE_WINDOW:
      return {
        ...state,
        windows: Object.keys(state.windows).reduce((p:any, n) => {
          let result:IWindows = {}

          if(typeof p === 'string')
            state.windows.hasOwnProperty(p) ? result[p] = state.windows[p] : result = {}
          if(state.windows.hasOwnProperty(n) )
            result[n] = state.windows[n]

          return typeof p === 'string' ? {...result} : {...p, ...result}
        }),
        order: state.order.filter(id => id !== action.id)
      }
    case WINDOWS_ACTION.UPDATE_WINDOW:
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...state.windows[action.id],
            [action.key]: action.value
          }
        }
      }
    case WINDOWS_ACTION.TOP_WINDOW:
      return {
        ...state,
        order: [
          ...state.order.filter(id => id !== action.id),
          action.id
        ]
      }
    default:
      return state
  }
}
