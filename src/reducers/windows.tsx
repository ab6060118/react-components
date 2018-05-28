import { WindowsState, IWindows } from './store_type';
import { WINDOWS_ACTION } from '../actions/action_type';

const initState:WindowsState = {
  windows:{},
  order:[],
  minOrder:[]
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
        windows: Object.keys(state.windows).reduce((p, n) => {
          return n === action.id ? p : {
            ...p,
            [n]: {...state.windows[n]}
          }
        }, {}),
        order: state.order.filter(id => id !== action.id),
        minOrder: state.minOrder.filter(id => id !== action.id)
      }
    case WINDOWS_ACTION.UPDATE_WINDOW:
      let { key, id, value } = action
      let { windows, minOrder } = state
      return {
        ...state,
        windows: {
          ...windows,
          [id]: {
            ...state.windows[id],
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
          ...state.order.filter(id => id !== action.id),
          action.id
        ]
      }
    default:
      return state
  }
}
