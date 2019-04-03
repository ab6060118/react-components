import * as React from 'react'

import Input from '../components/input'

export default class InputContainer extends React.PureComponent<any, any> {
  private inputRef:React.RefObject<Input>

  constructor(props:any) {
    super(props)
    this.state = {
      value: 'test',
    }

    this.inputRef = React.createRef()

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
  }

  handleUpdate(e:React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value

    this.setState({
      value: value,
    })
  }

  handleClearClick(e:React.MouseEvent<HTMLElement>) {
    this.setState({
      value: '',
    })
  }

  render() {
    let { value } = this.state

    return (
      <Input 
        ref={this.inputRef}
        clearable={true}
        handleClearClick={this.handleClearClick}
        type='password'
        value={value}
        labelElement={<span>Example</span>}
        onClick={undefined}
        onChange={this.handleUpdate}
        validator={(v:string) => {
          let reg = /^\d*$/
          if(!reg.test(v)) {
            return 'error'
          }
          return true
        }}
        id='example-input' />
    )
  }
}
