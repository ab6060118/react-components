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
    this.handleClearClick = this.handleClearClick.bind(this)
  }

  handleUpdate(e:React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value

    this.setState({
      value: value,
      invalid: value.includes('a')
    })
  }

  handleClearClick(e:React.MouseEvent<HTMLElement>) {
    this.setState({
      value: '',
    })
  }

  render() {
    let { value, invalid } = this.state

    return (
      <Input 
        clearable={true}
        handleClearClick={this.handleClearClick}
        value={value}
        invalid={invalid}
        labelElement={<span>Example</span>}
        onClick={undefined}
        onChange={this.handleUpdate}
        id='example-input' />
    )
  }
}
