import * as React from 'react';

import './style.scss'

interface RadionProps {
  value:any
  handleClick:Function
  checked?:boolean
  disabled?:boolean
  className?:string
}

export default class Radio extends React.Component<RadionProps> {
  constructor(props:RadionProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let { handleClick, value, disabled } = this.props

    if(disabled === true) return

    if(handleClick !== undefined) {
      handleClick(value)
    }
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
    let { children } = this.props

    return (
      <div className={this.getClassName()}>
        <span className={this.getIconClassName()} onClick={this.handleClick}></span>
        <label className="radio-label" onClick={this.handleClick}>{children}</label>
      </div>
    )
  }
}
