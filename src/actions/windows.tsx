import { WINDOWS_ACTION } from './action_type';
import { IWindowProperties } from "../reducers/store_type";

const createWindow = (id:string, component:string, properties:IWindowProperties, metadata:any) => ({type: WINDOWS_ACTION.CREATE_WINDOW, id, component, properties, metadata})

const deleteWindow = (id:string) => ({type: WINDOWS_ACTION.DELETE_WINDOW, id})

const updateWindow = (id:string, key:string, value:any) => ({type: WINDOWS_ACTION.UPDATE_WINDOW, id, key, value})

export const updateMetadata = (id:string, key:string, value:any) => ({type: WINDOWS_ACTION.UPDATE_METADATA, id, key, value})

export const openWindow = (id:string, component:string, properties:IWindowProperties, metadata?:any) => (dispatch:any) => {
  dispatch(createWindow(id, component, properties, metadata || {}))
}

export const minRestoreWindow = (id:string) => (dispatch:any, getStore:Function) => {
  let currentIsMined = getStore().windows.windows[id].isMined
  dispatch(updateWindow(id, 'isMined', !currentIsMined))

  if(!currentIsMined === false) dispatch(topWindow(id))
}

export const closeWindow = (id:string) => (dispatch:any) => {
  dispatch(deleteWindow(id))
}

export const topWindow = (id:string) => (dispatch:any, getStore:Function) => {
  let { order, windows } = getStore().windows

  if(order.indexOf(id) === order.length - 1 || windows[id].isMined === true) return

  dispatch({type: WINDOWS_ACTION.TOP_WINDOW, id})
}
