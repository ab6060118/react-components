import * as React from 'react'
import { connect, Dispatch } from 'react-redux';
import { State, IWindows, IWindowProperties } from '../reducers/store_type';
import { initWindowProps } from '../reducers/windows';

import { openWindow } from '../actions/windows';

import Dialog from './dialog';

interface WindowsManagerProps {
  windows:IWindows
  order:string[]
  minOrder:string[]
  openWindow:any
}

class WindowsManager extends React.Component<WindowsManagerProps> {
  constructor(props:WindowsManagerProps) {
    super(props)

    this.handleOpenWindowClick = this.handleOpenWindowClick.bind(this)
  }

  handleOpenWindowClick(e:React.MouseEvent<HTMLElement>) {
    let { openWindow } = this.props

    openWindow(
      `dialog-${+new Date}`,
      'dialog',
      initWindowProps([300,200],[600,400],`dialog-${+new Date}`,false),
      {id: `dialog-${+new Date}`},
    )
  }

  render() {
    let { windows, order, minOrder } = this.props

    return (
      <div>
      <button onClick={this.handleOpenWindowClick}>{"Open dialog"}</button>
      {
        Object.keys(windows).map((id, index) => {
          let window = windows[id]
          let { isMined, metadata, properties } = window
          let WinCmp

          switch(window.component) {
            case 'dialog':
              WinCmp = Dialog
              break;
            default:
              WinCmp = undefined
          }

          return (
            <WinCmp
              {...properties}
              winId={id}
              order={order.indexOf(id)}
              minOrder={minOrder.indexOf(id)}
              isMined={isMined}
              metadata={metadata}
              key={id}/>
          )
        })
      }
      </div>
    )  
  }
}

const mapStateToProps = (state:State) => ({
  windows: state.windows.windows,
  order: state.windows.order,
  minOrder: state.windows.minOrder,
})

const mapDispatchToProps = (dispatch:any) => ({
  openWindow: (id:string, component:string, properties:IWindowProperties, metadata?:any) => dispatch(openWindow(id, component, properties, metadata))
})

export default connect(mapStateToProps, mapDispatchToProps)(WindowsManager)
