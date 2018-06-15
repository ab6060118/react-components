import * as React from 'react'

interface MenuItemDefaultProps {
  onClick:React.MouseEventHandler<HTMLElement>
}

export default class MenuItemDefault extends React.PureComponent<MenuItemDefaultProps> {
  render() {
    let { children, onClick } = this.props

    return (
      <div className="menu-item-default" onClick={onClick}>
      {children}
      </div>
    )
  }
}
