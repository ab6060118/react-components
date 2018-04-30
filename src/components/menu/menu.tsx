import * as React from 'react'

interface MenuProps {
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
    let { isSubMenu } = this.props
    let { innerHeight, innerWidth} = window
    let { top, left, height, width } = menu.getBoundingClientRect()
    let paddingSpace:number = 10

    if(isSubMenu === true) {
      let { left:parentLeft, width:parentWidth } = menu.parentElement.getBoundingClientRect()

      if(height + top > innerHeight) menu.style.top = innerHeight - height - paddingSpace+ 'px'
      if(width + left > innerWidth) menu.style.left = parentLeft - parentWidth - 2 + 'px'
    }
    else {
      if(height + top > innerHeight) menu.style.top = innerHeight - height - paddingSpace + 'px'
      if(width + left > innerWidth) menu.style.left = innerWidth - width - paddingSpace + 'px'
    }
  }

  getClassName() {
    let { className:classStr } = this.props
    let className:string[] = ['menu']

    if(className !== undefined) className.push(classStr)

    return className.join(' ')
  }

  render() {
    let { top, left, children } = this.props
    let menuStyle:React.CSSProperties = {
      top: top,
      left: left,
    }

    return (
      <div className={this.getClassName()} style={menuStyle} ref="menu">
      {children}
      </div>
    )
  }
}
