import * as React from 'react';

import './style.scss'

interface RadionProps {
  id:string
  value:any
  onChange:React.ChangeEventHandler<HTMLElement>
  checked:boolean
  disabled?:boolean
  className?:string
}

export default class Radio extends React.Component<RadionProps> {
  constructor(props:RadionProps) {
    super(props)
  }

  getClassName() {
    let { disabled, className:classStr } = this.props
    let className:string[] = ['radio']

    if(classStr !== undefined) className.push(classStr)
    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  getIconClassName() {
    let { disabled, checked } = this.props
    let className:string[] = []

    checked === true ? className.push('radio-icon-checked') : className.push('radio-icon-normal')
    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { children, disabled, checked, onChange, id, value } = this.props

    return (
      <label className={this.getClassName()} htmlFor={id}>
        <input type="radio" id={id} disabled={disabled} checked={checked} onChange={onChange} style={{display:'none'}} value={value}/>
        <span className={this.getIconClassName()}></span>
        {children}
      </label>
    )
  }
}
