import * as React from 'react'

export interface Option {
  value:any
  disabled?:boolean
  selectAble?:boolean
}

export interface DropdownItemNormalProps extends Option{
  handleSelect?:React.MouseEventHandler<HTMLElement>
}

export default class DropdownItemNormal extends React.PureComponent<DropdownItemNormalProps> {
  getClassName() {
    let { disabled } = this.props
    let className:string[] = ['dropdown-item-normal']

    if(disabled) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { children, selectAble, disabled, value, handleSelect } = this.props

    return (
      <label className={this.getClassName()} htmlFor={`dropdown-item-normal-${value}`}>
        <input style={{display: 'none'}} id={`dropdown-item-normal-${value}`} onClick={handleSelect} disabled={disabled || selectAble === false} data-value={value} readOnly/>
        {children}
      </label>
    )
  }
}

