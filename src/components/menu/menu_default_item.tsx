import * as React from 'react'

interface MenuDefaultItemProps {
  onClick:React.MouseEventHandler<HTMLElement>
}

export default class MenuDefaultItem extends React.PureComponent<MenuDefaultItemProps> {
  render() {
    let { children, onClick } = this.props

    return (
      <div className="menu-item-default" onClick={onClick}>
      {children}
      </div>
    )
  }
}
