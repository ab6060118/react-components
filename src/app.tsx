import * as React from "react";

import Scrollbar from './components/scrollbar/scrollbar';
import App2 from './app2';

export default class App extends React.Component<any, any> {

  constructor(props:any) {
    super(props)
    this.state = {
      content:[
        <div key={+new Date()} style={{fontSize: '100px'}}>123</div>
      ]
    }
  }

  handleAdd() {
    this.setState({
      content: [...this.state.content, <div key={+new Date()} style={{fontSize: '100px'}}>123</div> ]
    })
  }

  handleRemove() {
  }

  render() {
    return (
      <div style={{
        maxHeight: '500px',
      }}>
        <button onClick={this.handleAdd.bind(this)}>Add</button>
        <button onClick={this.handleRemove.bind(this)}>Remove</button>
        <Scrollbar>
          <div style={{
            padding: '50px',
          }}>
            { this.state.content }
            <App2 />
          </div>
        </Scrollbar>
      </div>
    )
  }
}
