import * as React from 'react'

import './style.scss'

interface InputProps {
  id:string
  value:any
  onClick:React.MouseEventHandler<HTMLElement>
  onChange:React.ChangeEventHandler<HTMLInputElement>
  handleClearClick?:React.MouseEventHandler<HTMLElement>
  clearable?:boolean
  handleEnter?:Function
  className?:string
  type?:string
  labelElement?:JSX.Element
  invalid?:boolean
  disabled?:boolean
}

interface InputState {
  showPwd:boolean
} 

export default class Input extends React.Component<InputProps, InputState> {
  constructor(props:InputProps) {
    super(props)

    this.state = {
      showPwd: false
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleShowPwdClick = this.handleShowPwdClick.bind(this)
  }

  handleShowPwdClick(e:React.MouseEvent<HTMLElement>) {
    this.setState({
      showPwd: !this.state.showPwd,
    })
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
    let { id, labelElement, type, value, disabled, onClick, onChange, handleClearClick, clearable } = this.props
    let { showPwd } = this.state

    return (
      <label className={this.getClassName()} htmlFor={id}>
        {labelElement}
        <div className='input-field'>
          <input
            type={(showPwd || !type) ? 'text' : type}
            id={id}
            onClick={onClick}
            onChange={onChange}
            onKeyDown={this.handleKeyDown}
            value={value}
            disabled={disabled} />
        {(!type && clearable) &&
          <span className="input-icon-delete" onClick={handleClearClick}></span>
        }
        {type === 'password' &&
          <span className={`input-icon-eye ${showPwd ? 'active' : ''}`} onClick={this.handleShowPwdClick}></span>
        }
      </div>
      </label>
    )
  }
}
