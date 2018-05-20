import { WINDOWS_ACTION } from './action_type';
import { Dispatch } from 'react-redux';

const createWindow = (id:string, component:string, metadata:any) => ({type: WINDOWS_ACTION.CREATE_WINDOW, id, component, metadata})

const deleteWindow = (id:string) => ({type: WINDOWS_ACTION.DELETE_WINDOW, id})

const updateWindow = (id:string, key:string, value:any) => ({type: WINDOWS_ACTION.UPDATE_WINDOW, id, key, value})

export const openWindow = (id:string, component:string, metadata?:any) => (dispatch:Dispatch) => {
  dispatch(createWindow(id, component, metadata || {}))
}

export const minRestoreWindow = (id:string) => (dispatch:Dispatch, getStore:Function) => {
  let currentIsMined = getStore().windows.windows[id].isMined
  dispatch(updateWindow(id, 'isMined', !currentIsMined))
}

export const closeWindow = (id:string) => (dispatch:Dispatch) => {
  dispatch(deleteWindow(id))
}

export const topWindow = (id:string) => (dispatch:Dispatch, getStore:Function) => {
  let { order, windows } = getStore().windows

  if(order.indexOf(id) === order.length - 1 || windows[id].isMined === true) return

  dispatch({type: WINDOWS_ACTION.TOP_WINDOW, id})
}
