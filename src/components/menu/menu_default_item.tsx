import * as React from 'react'

interface MenuDefaultItemProps {
  onClick:(e:React.MouseEvent<HTMLDivElement>)=>void
}

export default class MenuDefaultItem extends React.Component<MenuDefaultItemProps> {
  render() {
    let { children, onClick } = this.props

    return (
      <div className="menu-item-default" onClick={onClick}>
      {children}
      </div>
    )
  }
}
