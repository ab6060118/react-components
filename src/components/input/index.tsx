import * as React from 'react'

import './style.scss'

interface InputProps {
  id:string
  value:any
  onClick:React.MouseEventHandler<HTMLElement>
  onChange:React.ChangeEventHandler<HTMLInputElement>
  handleClearClick?:React.MouseEventHandler<HTMLElement>
  validator?:Function
  clearable?:boolean
  handleEnter?:Function
  className?:string
  type?:string
  labelElement?:JSX.Element
  disabled?:boolean
}

interface InputState {
  showPwd: boolean
  isValid: (boolean|string)
  errorMessage: string
} 

export default class Input extends React.Component<InputProps, InputState> {
  constructor(props:InputProps) {
    super(props)

    this.state = {
      showPwd: false,
      isValid: true,
      errorMessage: undefined,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShowPwdClick = this.handleShowPwdClick.bind(this)
    this.getClassName = this.getClassName.bind(this)
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

  handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    let { validator, onChange } = this.props

    this.isValid(e.target.value)

    onChange(e)
  }

  isValid(value:any) {
    let { validator } = this.props

    if(!validator) {
      return true
    }

    let valid = validator(value)
    let isValid = (typeof valid === 'boolean') ? valid : false

    this.setState({
      isValid: isValid,
      errorMessage: (typeof valid === 'string') ? valid : undefined,
    })

    return isValid
  }

  getClassName() {
    let className:string[] = ['input']
    let { disabled, className:classStr } = this.props
    let { isValid } = this.state

    if(classStr) className.push(classStr)
    if(!isValid) className.push('invalid')
    if(disabled) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { id, labelElement, type, value, disabled, onClick, handleClearClick, clearable, validator } = this.props
    let { showPwd, isValid, errorMessage } = this.state

    return (
      <label className={this.getClassName()} htmlFor={id}>
        {labelElement}
        <div className='input-field'>
          <input
            type={(showPwd || !type) ? 'text' : type}
            id={id}
            onClick={onClick}
            onChange={this.handleChange}
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
        {(validator && !isValid) && 
        <div className="input-error-message">
          {errorMessage}
        </div>
        }
      </label>
    )
  }
}
