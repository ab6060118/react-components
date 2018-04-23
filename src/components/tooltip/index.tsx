import * as React from 'react'

import './style.scss'

interface TooltipProps {
  text: string
}

interface TooltipState {
  isHover:boolean
  isShow: boolean
}

export default class Tooltip extends React.Component<TooltipProps,TooltipState> {
  refs:{[key:string]:HTMLElement}
  tooltipBox:HTMLElement

  constructor(props:TooltipProps) {
    super(props)

    this.state = {
      isHover: false,
      isShow: false
    }
  }

  componentWillMount() {
    let tooltip = document.createElement('span')

    tooltip.textContent = this.props.text
    tooltip.className = 'tooltip-box'

    this.tooltipBox = tooltip
  }

  handleMouseEnter(e:React.MouseEvent<HTMLElement>) {
    let top = e.clientY
    let left = e.clientX

    setTimeout(() => {
      if(this.state.isHover === true && this.state.isShow === false) {
        this.refs.child.appendChild(this.tooltipBox)

        this.setState({
          isShow: true
        }, () => {
          this.updateTipboxPosition(top, left)
        })
      }
    }, 500)

    this.setState({
      isHover: true 
    })
  }

  handleMouseLeave() {
    if(this.state.isShow === true) this.refs.child.removeChild(this.tooltipBox)

    this.setState({
      isShow: false,
      isHover: false 
    })
  }

  handleMouseMove(e:MouseEvent) {
    this.updateTipboxPosition(e.pageY, e.pageX)
  }

  updateTipboxPosition(top:number, left:number) {
    if(this.state.isShow === true && this.tooltipBox) {
      this.tooltipBox.style.top = top + 16 + 'px'
      this.tooltipBox.style.left = left + 12 + 'px'
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseEnter: this.handleMouseEnter.bind(this),
      onMouseLeave: this.handleMouseLeave.bind(this),
      onMouseMove: this.handleMouseMove.bind(this),
      ref:'child'
    })
  }
}
