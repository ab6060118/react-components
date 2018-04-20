import * as React from 'react'
import './function_info.scss'
import Scrollbar from '../scrollbar/scrollbar';

interface FunctionInfoProps {
  element:JSX.Element
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

    let el = this.refs['text-box']
    let appBounding = document.querySelector('#App').getBoundingClientRect()
    let parentBounding = (el.parentNode as HTMLElement).getBoundingClientRect()
    let iconBounding = this.refs['info-icon'].getBoundingClientRect()

    el.style.top = parentBounding.top + 'px'
    el.style.left = iconBounding.left + iconBounding.width + 10 + 'px'
    
    if(el.offsetLeft + 300 > appBounding.width) {
      el.style.left = (iconBounding.left - 300- 10) + 'px'
    }

    if(el.offsetTop + el.offsetHeight > appBounding.height) {
      el.style.top = appBounding.height - el.offsetHeight - 10 + 'px';
    }
  }

  closeBox() {
    this.setState({
      isOpen: false
    })

    document.removeEventListener('mousedown', this.handleOutClick)
  }

  render() {
    let { className } = this.props

    return (
      <div className={["function-info", className].join(' ')}>
        {this.props.children}
        <span className="function-info-icon" onClick={this.handleIconClick.bind(this)} ref='info-icon'></span>
      {this.state.isOpen === true &&
        <div className="function-info-box" ref='text-box'>
          <span className="function-info-window-close-icon" onClick={this.closeBox.bind(this)}></span>
          {this.props.element}
        </div>
      }
      </div>
    )
  }
}
