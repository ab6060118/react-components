import * as React from 'react'

import './style.scss'

interface InputProps {
  id:string
  value:any
  handleUpdate:Function
  handleEnter?:Function
  className?:string
  type?:string
  labelElement?:JSX.Element
  error?:boolean
  disabled?:boolean
}

interface InputState {
} 

export default class Input extends React.Component<InputProps> {
  handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
    let { handleUpdate } = this.props

    if(handleUpdate) handleUpdate(e.target.value)
  }

  handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    let { handleEnter } = this.props

    if(e.keyCode === 13 && handleEnter) handleEnter()
  }

  getClassName() {
    let className:string[] = ['input']
    let { disabled, error, className:classStr } = this.props

    if(className !== undefined) className.push(classStr)
    if(error === true) className.push('error')
    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { id, labelElement, type, value } = this.props

    return (
      <div className={this.getClassName()}>
      {labelElement !== undefined &&
        <label className='input-label' htmlFor={id}>{labelElement}</label>
      }
        <input
          className='input-field'
          type={type || 'text'}
          id={id}
          onChange={this.handleInputChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          value={value} />
      </div>
    )
  }
}
