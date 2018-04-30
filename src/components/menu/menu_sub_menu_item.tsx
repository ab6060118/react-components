import * as React from 'react'
import Menu from './menu';

interface MenuSubMenuItemProps {
  text:string
  items:JSX.Element[]
}

interface MenuSubMenuItemState {
  isHover: boolean
  isSubMentOpened: boolean
}

export default class MenuSubMenuItem extends React.Component<MenuSubMenuItemProps, MenuSubMenuItemState> {
  constructor(props:MenuSubMenuItemProps) {
    super(props)

    this.state = {
      isHover: false,
      isSubMentOpened: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter(e:React.MouseEvent<HTMLDivElement>) {
    setTimeout(() => {
      if(this.state.isHover === true && this.state.isSubMentOpened === false) {
        this.setState({
          isSubMentOpened: true
        })
      }
    }, 300)

    this.setState({
      isHover: true
    })
  }

  handleMouseLeave(e:React.MouseEvent<HTMLDivElement>) {
    this.setState({
      isHover: false,
      isSubMentOpened: false
    })
  }

  render() {
    let { text, items } = this.props
    let { isSubMentOpened } = this.state

    console.log(this.state);

    return (
      <div className="menu-item-next" 
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <span className="menu-item-next-content">{text}</span>
        <span className="menu-icon-next"></span>
        {isSubMentOpened === true &&
          <Menu items={items} top={400} left={300}/>
        }
      </div>
    )
  }
}
