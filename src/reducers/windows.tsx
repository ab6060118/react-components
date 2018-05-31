import { WindowsState, IWindows } from './store_type';
import { WINDOWS_ACTION } from '../actions/action_type';

const initState:WindowsState = {
  windows:{},
  order:[],
  minOrder:[]
}

export default (state:WindowsState = initState, action:{type:WINDOWS_ACTION, id:string, component?:string, metadata?:any, key?:string, value?:any}) => {
  let { windows, minOrder, order } = state
  let { type, key, id, value, component, metadata } = action

  switch(type) {
    case WINDOWS_ACTION.CREATE_WINDOW:
      return {
        ...state,
        windows: {
          ...windows,
          [id]: {
            id: id,
            component: component,
            isMined: false,
            metadata: metadata || {}
          }
        },
        order: [
          ...order,
          id
        ]
      }
    case WINDOWS_ACTION.DELETE_WINDOW:
      return {
        ...state,
        windows: Object.keys(windows).reduce((p, n) => {
          return n === action.id ? p : {
            ...p,
            [n]: {...windows[n]}
          }
        }, {}),
        order: order.filter(winId => winId !== id),
        minOrder: minOrder.filter(winId => winId !== id)
      }
    case WINDOWS_ACTION.UPDATE_WINDOW:
      return {
        ...state,
        windows: {
          ...windows,
          [id]: {
            ...windows[id],
            [key]: value
          }
        },
        minOrder: key === 'isMined' ? (
          value ? [...minOrder, id] : minOrder.filter(winId => winId !== id)
        ) : minOrder
      }
    case WINDOWS_ACTION.TOP_WINDOW:
      return {
        ...state,
        order: [
          ...order.filter(winId => winId !== id),
          id
        ]
      }
    case WINDOWS_ACTION.UPDATE_METADATA:
      return {
        ...state,
        windows: {
          ...windows,
          [id]: {
            ...windows[id],
            metadata: {
              ...windows[id].metadata,
              [key]: value,
            }
          }
        }
      }
    default:
      return state
  }
}
