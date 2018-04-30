import * as React from 'react'
import Menu from './menu';
import MenuSubMenuItem from './menu_sub_menu_item';

import './style.scss'

class MenuDividerItem extends React.Component {
  render() {
    return (
      <div className="menu-item-divider">
        <div className="menu-item-divider-item"></div>
      </div>
    )
  }
}

const MenuTitleItem = ({text}:{text:string}) => (
  <div className="menu-item-title">
    <span className="menu-item-title-content">{text}</span>
  </div>
)

export {
  MenuTitleItem,
  MenuDividerItem,
  MenuSubMenuItem
}

export default Menu
