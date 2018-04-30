import * as React from 'react'
import Menu, { MenuDividerItem, MenuTitleItem, MenuSubMenuItem } from '../components/menu';

export default class TableMenu extends React.Component<any,any> {
  constructor(props:any) {
    super(props)
    this.handleOneClick = this.handleOneClick.bind(this)
  }

  handleOneClick() {
    console.log(this.props.ids);
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
      <Menu
        className="exapmle-table-menu"
        top={top}
        left={left}
        items={[
          <div style={is} onClick={this.handleOneClick}><span>1111111</span></div>,
          <div style={is}><span>2</span></div>,
          <MenuDividerItem />,
          <MenuTitleItem text="Title" />,
          <MenuSubMenuItem 
            text="Next"
            items={[
              <div style={is}><span>3</span></div>,
              <div style={is}><span>4</span></div>
            ]}/>,
        ]}/> 
    )
  }
}
