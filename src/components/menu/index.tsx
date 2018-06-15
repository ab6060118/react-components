import * as React from 'react'
import Menu from './menu';
import MenuItemDefault from './menu_item_default';
import MenuItemSubMenu from './menu_item_sub_menu';

import './style.scss'

class MenuItemDivider extends React.PureComponent {
  render() {
    return (
      <div className="menu-item-divider">
        <div className="menu-item-divider-item"></div>
      </div>
    )
  }
}

class MenuItemTitle extends React.PureComponent<{text:string}> {
  render() {
    return (
      <div className="menu-item-title">
        <span className="menu-item-title-content">{this.props.text}</span>
      </div>
    )
  }
}

export {
  MenuItemTitle,
  MenuItemDefault,
  MenuItemDivider,
  MenuItemSubMenu,
}

export default Menu
