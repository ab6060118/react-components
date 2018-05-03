import * as React from 'react'
import './style.scss'
import Scrollbar from '../scrollbar';

interface FunctionInfoProps {
  wrapElement:JSX.Element
  className?:string
}

interface FunctionInfoState {
  isOpen:boolean
}

export default class FunctionInfo extends React.Component<FunctionInfoProps, FunctionInfoState> {
  refs:{[key:string]:HTMLElement}

  constructor(props:FunctionInfoProps) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.handleOutClick = this.handleOutClick.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.closeBox = this.closeBox.bind(this)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutClick)
  }

  componentDidUpdate(){
    if(this.state.isOpen === true) {
      this.updateTextBoxOpsition()
    }
  }

  handleIconClick() {
    if(this.state.isOpen === true) {
      this.closeBox()
      return 
    }

    this.setState({
      isOpen: true
    })

    document.addEventListener('mousedown', this.handleOutClick)
  }

  handleOutClick(e:MouseEvent) {
    if(!this.state.isOpen || this.refs['text-box'].contains(e.target as HTMLElement) || e.target === this.refs['info-icon']) {
      return 
    }

    this.closeBox()
  }

  updateTextBoxOpsition() {
    if(!this.refs['text-box']) return

    let { 'text-box':el } = this.refs
    let { innerHeight, innerWidth } = window
    let iconBounding = this.refs['info-icon'].getBoundingClientRect()

    el.style.top = iconBounding.top + 'px'
    
    if(iconBounding.left + iconBounding.width + el.offsetWidth + 10 > innerWidth) {
      el.style.left = (iconBounding.left - el.offsetWidth - 10) + 'px'
    }
    else {
      el.style.left = iconBounding.left + iconBounding.width + 10 + 'px'
    }

    if(el.offsetTop + el.offsetHeight > innerHeight) {
      el.style.top = innerHeight - el.offsetHeight - 10 + 'px';
    }
  }

  closeBox() {
    this.setState({
      isOpen: false
    })

    document.removeEventListener('mousedown', this.handleOutClick)
  }

  render() {
    let { className, wrapElement, children } = this.props

    return (
      <div className={["function-info", className].join(' ')}>
      {this.state.isOpen === true &&
        <div className="function-info-box" ref='text-box'>
          <span className="function-info-window-close-icon" onClick={this.closeBox}></span>
          {children}
        </div>
      }
        {wrapElement}
        <span className="function-info-icon" onClick={this.handleIconClick} ref='info-icon'></span>
      </div>
    )
  }
}
