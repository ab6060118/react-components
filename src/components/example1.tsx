import * as React from 'react';
import Scrollbar from './scrollbar/scrollbar';

interface ExampleState {
  element:number[]
}

export default class Example extends React.Component<any,ExampleState> {
  constructor(props:any) {
    super(props)
    this.state = {
      element: [1,2,3,4,5,61,2,3,4,5,61,2,3,4,5,61,2,3,4,5,6]
    }
  }

  handleAddClick() {
    this.setState({
      element: [...this.state.element, +new Date()]
    })
  }

  handleRemoveClick() {
    let result = [...this.state.element]

    result.shift()

    this.setState({
      element: result
    })
  }

  render() {
    return (
      <div style={{padding: '30px'}}>
        <div>
          <button onClick={this.handleAddClick.bind(this)}>Add</button>
          <button onClick={this.handleRemoveClick.bind(this)}>Delete</button>
        </div>
        <div>
          {this.state.element.map((e,index:number) => <div key={index + '2'}>{e}</div>)}
        </div>
      </div>
    )
  }
}
