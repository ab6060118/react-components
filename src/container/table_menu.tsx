import * as React from 'react'
import Menu, { MenuItemDefault, MenuItemDivider, MenuItemTitle, MenuItemSubMenu } from '../components/menu';

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
        <MenuItemDefault onClick={()=>{ console.log('ItemClick'); }}>
          <span>{'123'}</span>
        </MenuItemDefault>
        <MenuItemDivider />
        <MenuItemTitle text="Title" />
        <MenuItemSubMenu text="Next">
          <MenuItemDefault onClick={this.props.handleRowRemove}>
            <span>{'123'}</span>
          </MenuItemDefault>
          <MenuItemDefault onClick={()=>{ console.log('ItemClick'); }}>
            <span>{'123'}</span>
          </MenuItemDefault>
          <MenuItemDefault onClick={()=>{ console.log('ItemClick'); }}>
            <span>{'123'}</span>
          </MenuItemDefault>
          <MenuItemDivider />
          <MenuItemTitle text="Title" />
          <MenuItemSubMenu text="Next">
            <MenuItemDefault onClick={this.props.handleRowRemove}>
              <span>{'123'}</span>
            </MenuItemDefault>
            <MenuItemDefault onClick={()=>{ console.log('ItemClick'); }}>
              <span>{'123'}</span>
            </MenuItemDefault>
            <MenuItemDefault onClick={()=>{ console.log('ItemClick'); }}>
              <span>{'123'}</span>
            </MenuItemDefault>
            <MenuItemDivider />
            <MenuItemTitle text="Title" />
          </MenuItemSubMenu>
        </MenuItemSubMenu>
      </Menu>
    )
  }
}
