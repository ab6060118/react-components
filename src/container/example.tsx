import * as React from 'react'
import Dropdown from './dropdown';
import FunctionInfo from './function_info';
import Table from './table'
import Window from './window'
import Dialog from './dialog'

interface ExampleState {
  element:number[]
}

export default class Example extends React.Component<any,ExampleState> {
  constructor(props:any) {
    super(props)
    this.state = {
      element: [4,5,6,1,2,3,4,5,6,1,2,3,4,5,6],
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
    console.log('example render');

    return (
      <div style={{padding: '30px' }}>
        <Dialog />
        <FunctionInfo />
        <div style={{marginTop: '20px'}}></div>
        <Table />
        <div style={{ marginTop: '30px' }}>
          <button onClick={this.handleAddClick.bind(this)}>Add</button>
          <button onClick={this.handleRemoveClick.bind(this)}>Delete</button>
        </div>
        <div>
          {this.state.element.map((e,index:number) => <div key={index}>{e}</div>)}
        </div>
      </div>
    )
  }
}
