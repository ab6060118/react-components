import * as React from 'react'

interface MenuProps {
  items:JSX.Element[]
  top:number
  left:number
  className?:string
  isSubMenu?:boolean
}

export default class Menu extends React.Component<MenuProps>{
  refs:{[key:string]:HTMLElement}

  componentDidMount() {
    this.updateMenuPosition()
  }

  componentDidUpdate() {
    this.updateMenuPosition()
  }

  updateMenuPosition() {
    let { menu } = this.refs

    let { innerHeight, innerWidth} = window
    let { top, left, height, width } = menu.getBoundingClientRect()
    let paddingSpace:number = 10

    if(height + top > innerHeight) menu.style.top = innerHeight - height - paddingSpace + 'px'
    if(width + left > innerWidth) menu.style.left = innerWidth - width - paddingSpace + 'px'
  }

  getClassName() {
    let { className:classStr } = this.props
    let className:string[] = ['menu']

    if(className !== undefined) className.push(classStr)

    return className.join(' ')
  }

  getItemClassName(componentName:string) {
    let className:string[] = ['menu-item']

    if(componentName === 'MenuDividerItem') className.push('divider')

    return className.join(' ')
  }

  render() {
    let { items, top, left } = this.props
    let menuStyle:React.CSSProperties = {
      top: top,
      left: left,
    }

    return (
      <div className={this.getClassName()} style={menuStyle} ref="menu">
      {items.map((element, index) => (
        <div className={this.getItemClassName((element.type as any).name)} key={index}>{element}</div>
      ))
      }
      </div>
    )
  }
}
