import * as React from 'react'

import './style.scss'

interface InputProps {
  id:string
  value:any
  onChange:React.ChangeEventHandler<HTMLInputElement>
  handleEnter?:Function
  className?:string
  type?:string
  labelElement?:JSX.Element
  invalid?:boolean
  disabled?:boolean
}

interface InputState {
} 

export default class Input extends React.Component<InputProps> {
  constructor(props:InputProps) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    let { handleEnter } = this.props

    if(e.keyCode === 13 && handleEnter) handleEnter()
  }

  getClassName() {
    let className:string[] = ['input']
    let { disabled, invalid, className:classStr } = this.props

    if(classStr) className.push(classStr)
    if(invalid) className.push('invalid')
    if(disabled) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { id, labelElement, type, value, disabled, onChange } = this.props

    return (
      <label className={this.getClassName()} htmlFor={id}>
        {labelElement}
        <input
          className='input-field'
          type={type || 'text'}
          id={id}
          onChange={onChange}
          onKeyDown={this.handleKeyDown}
          value={value}
          disabled={disabled} />
      </label>
    )
  }
}
