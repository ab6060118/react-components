import * as React from 'react'
import Menu from './menu';

interface MenuSubMenuItemProps {
  text:string
}

interface MenuSubMenuItemState {
  isHover:boolean
  isSubMentOpened:boolean
  subMenuTop:number
  subMenuLeft:number
}

export default class MenuSubMenuItem extends React.Component<MenuSubMenuItemProps, MenuSubMenuItemState> {
  refs:{[key:string]:HTMLDivElement}

  constructor(props:MenuSubMenuItemProps) {
    super(props)

    this.state = {
      isHover: false,
      isSubMentOpened: false,
      subMenuTop:0,
      subMenuLeft:0,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter(e:React.MouseEvent<HTMLDivElement>) {
    setTimeout(() => {
      if(this.state.isHover === true && this.state.isSubMentOpened === false) {
        let { left, top, width } = this.refs.menu.getBoundingClientRect()

        this.setState({
          isSubMentOpened: true,
          subMenuTop: top,
          subMenuLeft: left + width,
        })
      }
    }, 300)

    this.setState({
      isHover: true
    })
  }

  handleMouseLeave(e:React.MouseEvent<HTMLDivElement>) {
    setTimeout(() => {
      if(this.state.isHover === false && this.state.isSubMentOpened === true) {
        this.setState({
          isSubMentOpened: false
        })
      }
    }, 300)

    this.setState({
      isHover: false,
    })
  }

  render() {
    let { text, children} = this.props
    let { isSubMentOpened, subMenuTop, subMenuLeft } = this.state

    return (
      <div className="menu-item-sub-menu" 
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref="menu">
        <span className="menu-item-sub-menu-content">{text}</span>
        <span className="menu-icon-next"></span>
        {isSubMentOpened === true &&
          <Menu top={subMenuTop} left={subMenuLeft} isSubMenu={true}>
          {children}
          </Menu>
        }
      </div>
    )
  }
}
