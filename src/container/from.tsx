import * as React from 'react'
import Dropdown from './dropdown';
import FunctionInfo from './function_info';
import Input from './input';
import Checkbox from './checkbox';
import Radios from './radios';
import Carouse from './carousel';

export default class Form extends React.Component<any> {
  input:React.RefObject<Input> = React.createRef()

  handleSubmit = () => {
    let t:{a:Function} = {a:undefined}
    let { children } = this.props
    this.isValid()
  }

  isValid = () => {
    console.log(this.input.current.isValid());
  }

  render() {
    return (
      <div>
        <Carouse />
        <FunctionInfo />
        <Dropdown />
        <Checkbox />
        <Input ref={this.input}/>
        <Radios />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
