export interface State {
  windows:WindowsState
}

export interface WindowsState{
  windows:IWindows
  order:string[]
}

export interface IWindow {
  id:string
  isMined:boolean
  metadata:any
  component:string
}

export interface IWindows {
  [key:string]:IWindow
}
