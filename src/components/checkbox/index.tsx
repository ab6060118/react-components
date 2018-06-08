import * as React from 'react'

import './style.scss'

interface ICheckbox {
  id:string
  checked:boolean
  value:string
  onClick:React.MouseEventHandler<HTMLElement>
  disabled?:boolean
  className?:string
}

export default class Checkbox extends React.PureComponent <ICheckbox> {
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
    let { id, children, onClick, disabled, value } = this.props

    return (
      <div className={this.getClassName()}>
        <input type="checkbox" id={id} style={{display: 'none'}} onClick={onClick} disabled={disabled} data-value={value}/>
        <label className="checkbox-label" htmlFor={id}>
          <span className={this.getIconClassName()}></span>
          {children}
        </label>
      </div>
    )
  }
}
