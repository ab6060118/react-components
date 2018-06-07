import { IWindowProperties } from "./store_type";
import { WindowsState, IWindows } from './store_type';
import { WINDOWS_ACTION } from '../actions/action_type';

const initState = ():WindowsState => ({
  windows:{},
  order:[],
  minOrder:[]
})

export const initWindowProps = (min:number[], max:number[], title?:string, resizable?:boolean):IWindowProperties => ({
  minWidth: min[0],
  minHeight: min[1],
  maxWidth: max[0],
  maxHeight: max[1],
  title: title || '',
  resizable: resizable === undefined ? true : resizable
})

interface IWindowsAction {
  type:WINDOWS_ACTION
  id:string
  component?:string
  properties?:IWindowProperties
  metadata?:any
  key?:string
  value?:any
}

export default (state:WindowsState = initState(), action:IWindowsAction) => {
  let { windows, minOrder, order } = state
  let { type, key, id, value, component, metadata, properties } = action

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
            metadata: metadata || {},
            properties,
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
