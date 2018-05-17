import * as React from 'react'
import Dialog from './dialog';

interface IWindow {
  id:string
  component:any
  isMined:boolean
  metadata:any
}

interface WindowsManagerState {
  windows: {[key:string]:IWindow}
  order:string[]
}

export default class WindowsManager extends React.Component<any, WindowsManagerState> {
  constructor(props:any) {
    super(props)

    this.state = {
      windows: {
        'dialog-1': { id: 'dialog-1', component: Dialog, isMined: false, metadata: {} },
        'dialog-2': { id: 'dialog-2', component: Dialog, isMined: false, metadata: {} },
        'dialog-3': { id: 'dialog-3', component: Dialog, isMined: false, metadata: {} },
        'dialog-4': { id: 'dialog-4', component: Dialog, isMined: false, metadata: {} },
        'dialog-5': { id: 'dialog-5', component: Dialog, isMined: false, metadata: {} },
      },
      order: [ 'dialog-1', 'dialog-2', 'dialog-3', 'dialog-4', 'dialog-5' ]
    }

    this.handleTopClick = this.handleTopClick.bind(this)
    this.handleUpdateMetadata = this.handleUpdateMetadata.bind(this)
  }

  handleTopClick(id:string) {
    let { order, windows } = this.state
    let index = order.indexOf(id)

    if(index < 0 || windows[id].isMined === true || index === order.length - 1) return

    order.splice(index, 1)

    console.log(`top ${id}`);

    this.setState({
      order: [...order, id]
    })
  }

  handleUpdateMetadata() {
    let { windows } = this.state

    this.setState({
      windows: {
        ...windows,
        'dialog-1': {
          ...windows['dialog-1'],
          metadata: {
            ...windows['dialog-1'].metadata,
            tt: +new Date(),
          }
        }
      }
    })
  }

  render() {
    let { windows, order } = this.state

    return (
      <div>
      <button onClick={this.handleUpdateMetadata}>'123'</button>
      {
        order.map((winId) => {
          let window = windows[winId]
          return (
            <window.component
              handleTopClick={this.handleTopClick}
              winId={window.id}
              isMined={window.isMined}
              metadata={window.metadata}
              key={window.id}/>
          )
        })
      }
      </div>
    )  
  }
}
