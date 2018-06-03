import * as React from 'react'

import Input from '../components/input'

export default class InputContainer extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      value: 'test',
      invalid: false,
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.validator = this.validator.bind(this)
  }

  handleUpdate(e:React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value

    this.setState({
      value: value,
      invalid: value.includes('a')
    })
  }

  validator() {
    let { value } = this.state
    return 
  }

  render() {
    let { value, invalid } = this.state

    return (
      <Input 
        value={value}
        invalid={invalid}
        labelElement={<span>Example</span>}
        onChange={this.handleUpdate}
        id='example-input' />
    )
  }
}
