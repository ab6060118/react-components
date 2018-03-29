import * as React from "react";

import Scrollbar from './components/scrollbar/scrollbar';

export default class App extends React.Component<any> {
  content:any[] = [
    <div key={+new Date()} style={{fontSize: '100px'}}>345</div>
  ]


  handleAdd() {
    this.content.push(<div key={+new Date()} style={{fontSize: '100px'}}>456</div>) 
    this.forceUpdate()
  }

  handleRemove() {
    this.content.shift()
    this.forceUpdate()
  }

  render() {
    return (
      <div style={{
        maxHeight: '500px',
      }}>
        <button onClick={this.handleAdd.bind(this)}>Add</button>
        <button onClick={this.handleRemove.bind(this)}>Remove</button>
        <div style={{
          maxHeight: '500px',
          // height: '200px',
        }}>
          <Scrollbar>
            <div>
              { this.content }
            </div>
          </Scrollbar>
        </div>
      </div>
    )
  }
}
