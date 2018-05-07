import * as React from 'react'
import Dropdown from './dropdown';
import FunctionInfo from './function_info';
import Table from './table'
import Window from './window'
import Input from './input';
import Checkbox from './checkbox';
import Radios from './radios';

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
      <div className="example">
        <Radios />
        <Checkbox />
        <Input />
        <FunctionInfo />
        <Dropdown />
        <div style={{marginTop: '20px'}}></div>
        <Table />
      </div>
    )
  }
}
