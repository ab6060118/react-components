import * as React from 'react'
import Menu, { MenuDefaultItem, MenuDividerItem, MenuTitleItem, MenuSubMenuItem } from '../components/menu';

export default class TableMenu extends React.Component<any,any> {
  constructor(props:any) {
    super(props)
  }

  render() {
    let { top, left } = this.props
    let is:React.CSSProperties = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 22px',
    }

    return (
      <Menu className="exapmle-table-menu" top={top} left={left}>
        <MenuDefaultItem onClick={()=>{ console.log('ItemClick'); }}>
          <span>{'123'}</span>
        </MenuDefaultItem>
        <MenuDividerItem />
        <MenuTitleItem text="Title" />
        <MenuSubMenuItem text="Next">
          <MenuDefaultItem onClick={this.props.handleRowRemove}>
            <span>{'123'}</span>
          </MenuDefaultItem>
          <MenuDefaultItem onClick={()=>{ console.log('ItemClick'); }}>
            <span>{'123'}</span>
          </MenuDefaultItem>
          <MenuDefaultItem onClick={()=>{ console.log('ItemClick'); }}>
            <span>{'123'}</span>
          </MenuDefaultItem>
          <MenuDividerItem />
          <MenuTitleItem text="Title" />
        </MenuSubMenuItem>
      </Menu>
    )
  }
}
