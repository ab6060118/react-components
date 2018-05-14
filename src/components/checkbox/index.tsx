import * as React from 'react'

import './style.scss'

interface ICheckbox {
  id:string
  checked:boolean
  handleClick:Function
  item?:any
  disabled?:boolean
  className?:string
}

export default class Checkbox extends React.Component <ICheckbox> {
  handleValueChange(e:Event) {
    let { handleClick, checked, item, disabled } = this.props

    if(disabled === true) return

    if(handleClick) handleClick(!checked, item)
  }

  getClassName() {
    let { className:classStr, disabled } = this.props
    let className:string[] = ['checkbox']

    if(classStr !== undefined) className.push(classStr)
    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  getIconClassName() {
    let { checked, disabled } = this.props
    let className:string[] = []

    if(checked === true) className.push('checkbox-icon-on')
    else className.push('checkbox-icon-off')

    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { id, children } = this.props

    return (
      <div className={this.getClassName()}>
        <input type="checkbox" id={id} style={{display: 'none'}} onChange={this.handleValueChange.bind(this)} />
        <span className={this.getIconClassName()} onClick={this.handleValueChange.bind(this)}></span>
        <label className="checkbox-label" htmlFor={id}>{children}</label>
      </div>
    )
  }
}
