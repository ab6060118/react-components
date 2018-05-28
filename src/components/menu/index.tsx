import * as React from 'react'
import Menu from './menu';
import MenuDefaultItem from './menu_default_item';
import MenuSubMenuItem from './menu_sub_menu_item';

import './style.scss'

class MenuDividerItem extends React.PureComponent {
  render() {
    return (
      <div className="menu-item-divider">
        <div className="menu-item-divider-item"></div>
      </div>
    )
  }
}

class MenuTitleItem extends React.PureComponent<{text:string}> {
  render() {
    return (
      <div className="menu-item-title">
        <span className="menu-item-title-content">{this.props.text}</span>
      </div>
    )
  }
}

export {
  MenuTitleItem,
  MenuDefaultItem,
  MenuDividerItem,
  MenuSubMenuItem,
}

export default Menu
