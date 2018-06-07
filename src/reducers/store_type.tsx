export interface State {
  windows:WindowsState
}

export interface WindowsState{
  windows:IWindows
  order:string[]
  minOrder:string[]
}

export interface IWindow {
  id:string
  isMined:boolean
  metadata:any
  component:string
  properties:IWindowProperties
}

export interface IWindowProperties {
  title?:string
  minWidth:number
  minHeight:number
  maxWidth:number
  maxHeight:number
  resizable:boolean
}

export interface IWindows {
  [key:string]:IWindow
}
