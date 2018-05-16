import * as React from 'react'
import Dialog from './dialog';

interface IWindow {
  id:string
  component:any
  isMined:boolean
  metadata:any
}

interface WindowsManagerProps {
  windows: IWindow[]
}

export default class WindowsManager extends React.Component<any, WindowsManagerProps> {
  constructor(props:any) {
    super(props)

    this.state = {
      windows: [
        { id: 'dialog-1', component: Dialog, isMined: false, metadata: {} },
        { id: 'dialog-2', component: Dialog, isMined: false, metadata: {} },
        { id: 'dialog-3', component: Dialog, isMined: false, metadata: {} },
        { id: 'dialog-4', component: Dialog, isMined: false, metadata: {} },
        { id: 'dialog-5', component: Dialog, isMined: false, metadata: {} },
      ]
    }

    this.handleTopClick = this.handleTopClick.bind(this)
  }

  handleTopClick = (id:string) => () => {
    let newWindows = [...this.state.windows]
    let index = newWindows.findIndex((window) => window.id === id)

    if(index < 0 || newWindows[index].isMined === true) return

    let targetWindow:IWindow = newWindows.splice(index, 1)[0]

    console.log(`top ${id}`);

    this.setState({windows: [...newWindows, targetWindow]})
  }

  render() {
    let { windows } = this.state

    console.log(windows);

    return windows.map((window, index) => <window.component handleTopClick={this.handleTopClick(window.id)} key={window.id}/>)
  }
}
