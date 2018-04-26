import * as React from 'react'

import Input from '../components/input'

export default class InputContainer extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      value: 'test'
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(value:any) {
    this.setState({value:value})
  }

  render() {
    let { value } = this.state

    return (
      <Input 
        value={value}
        labelElement={<span>Example</span>}
        handleUpdate={this.handleUpdate}
        id='example-input' />
    )
  }
}
