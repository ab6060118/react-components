import * as React from 'react'

import './style.scss'

interface ICheckbox {
  id:string
  value:boolean
  item:any
  handleValueChange:Function
  disabled?:boolean
  className?:string
  labelElement?:JSX.Element
}

export default class Checkbox extends React.Component <ICheckbox> {
  handleValueChange(e:Event) {
    let { handleValueChange, value, item, disabled } = this.props

    if(disabled === true) return

    if(handleValueChange) handleValueChange(!this.props.value, this.props.item)
  }

  getClassName() {
    let { className:classStr, disabled } = this.props
    let className:string[] = ['checkbox']

    if(classStr !== undefined) className.push(classStr)
    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  getIconClassName() {
    let { value, disabled } = this.props
    let className:string[] = []

    if(value === true) className.push('checkbox-icon-on')
    else className.push('checkbox-icon-off')

    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { id, value, labelElement } = this.props

    return (
      <div className={this.getClassName()}>
        <input type="checkbox" id={id} style={{display: 'none'}} onChange={this.handleValueChange.bind(this)} />
        <span className={this.getIconClassName()} onClick={this.handleValueChange.bind(this)}></span>
        <label className="checkbox-label" htmlFor={id}>{labelElement}</label>
      </div>
    )
  }
}
