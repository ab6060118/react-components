import * as React from 'react'
import Dropdown from './dropdown';
import FunctionInfo from './function_info';
import Input from './input';
import Checkbox from './checkbox';
import Radios from './radios';
import Carouse from './carousel';

export default class Form extends React.Component<any> {
  render() {
    return (
      <div>
        <Carouse />
        <FunctionInfo />
        <Dropdown />
        <Checkbox />
        <Input />
        <Radios />
      </div>
    )
  }
}
