import * as React from 'react'

export interface Option {
  value:any
  disabled?:boolean
  selectAble?:boolean
}

interface DropdownItemNormalProps extends Option{
  handleSelect?:Function
}

export default class DropdownItemNormal extends React.PureComponent<DropdownItemNormalProps> {
  constructor(props:DropdownItemNormalProps) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e:React.MouseEvent<HTMLElement>) {
    let { value, disabled, selectAble, handleSelect } = this.props

    if(disabled === true || selectAble === false) {
      e.stopPropagation()

      return
    }

    handleSelect(value)
  }

  getClassName() {
    let { disabled } = this.props
    let className:string[] = ['dropdown-item-normal']

    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { children } = this.props

    return (
      <div className={this.getClassName()} onClick={this.handleSelect}>
      {children}
      </div>
    )
  }
}

