import * as React from 'react'
import { connect, Dispatch } from 'react-redux';
import { State, IWindows } from '../reducers/store_type';

import { openWindow } from '../actions/windows';

import Dialog from './dialog';

interface WindowsManagerProps {
  windows:IWindows
  order:string[]
  minOrder:string[]
  openWindow:(id:string, component:string, metadata?:any) => void
}

class WindowsManager extends React.Component<WindowsManagerProps> {
  constructor(props:WindowsManagerProps) {
    super(props)

    this.handleOpenWindowClick = this.handleOpenWindowClick.bind(this)
  }

  handleOpenWindowClick(e:React.MouseEvent<HTMLElement>) {
    let { openWindow } = this.props

    openWindow(`dialog-${+new Date}`, 'dialog', {id: `dialog-${+new Date}`})
  }

  render() {
    let { windows, order, minOrder } = this.props

    return (
      <div>
      <button onClick={this.handleOpenWindowClick}>{"Open dialog"}</button>
      {
        Object.keys(windows).map((id, index) => {
          let window = windows[id]
          let { isMined, metadata } = window
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
              winId={id}
              order={order.indexOf(id)}
              minOrder={minOrder.indexOf(id)}
              isMined={isMined}
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
  openWindow: (id:string, component:string, metadata?:any) => dispatch(openWindow(id, component, metadata))
})

export default connect(mapStateToProps, mapDispatchToProps)(WindowsManager)
