import * as React from 'react'
import { connect, Dispatch } from 'react-redux';
import { State, IWindows } from '../reducers/store_type';

import { openWindow } from '../actions/windows';

import Dialog from './dialog';

interface WindowsManagerProps {
  windows:IWindows
  order:string[]
  openWindow:(id:string, component:string, metadata?:any) => Dispatch
}

class WindowsManager extends React.PureComponent<WindowsManagerProps> {
  constructor(props:WindowsManagerProps) {
    super(props)

    this.handleOpenWindowClick = this.handleOpenWindowClick.bind(this)
  }

  handleOpenWindowClick(e:React.MouseEvent<HTMLElement>) {
    let { openWindow } = this.props

    openWindow(`dialog-${+new Date}`, 'dialog', {id: `dialog-${+new Date}`})
  }

  render() {
    let { windows, order } = this.props
    let minOrder:number = 0

    return (
      <div>
      <button onClick={this.handleOpenWindowClick}>{"Open dialog"}</button>
      {
        order.map((id) => {
          let window = windows[id]
          if(window === undefined) return undefined
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
              minOrder={isMined === true ? minOrder++ : undefined}
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
})

const mapDispatchToProps = (dispatch:Dispatch) => ({
  openWindow: (id:string, component:string, metadata?:any) => dispatch(openWindow(id, component, metadata))
})

export default connect(mapStateToProps, mapDispatchToProps)(WindowsManager)
