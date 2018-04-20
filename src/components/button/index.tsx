import * as React from 'react'
import './style.scss'

interface IButton {
  handleClick:Function
  disabled:boolean
  text:string
}

interface IButtonState {
  isClicked:boolean
}

export default class Button extends React.Component<IButton, IButtonState> {
  constructor(props:IButton) {
    super(props)

    this.state = {
      isClicked: false
    }

    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleClick() {
    if(this.props.disabled === true) {
      return
    }

    this.props.handleClick()
  }

  handleMouseUp() {
    if(this.props.disabled === true) {
      return
    }

    this.setState({isClicked: false})

    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown() {
    if(this.props.disabled === true) {
      return
    }

    document.addEventListener('mouseup', this.handleMouseUp)

    this.setState({isClicked: true})
  }

  getClass() {
    let className:string[] = ['default-button']

    if(this.state.isClicked) {
      className.push('pressed')
    }

    if(this.props.disabled === true) {
      className.push('disabled')
    }

    return className.join(' ')
  }

  render() {
    let { text } = this.props

    return (
      <button
        className={this.getClass()}
        onClick={this.handleClick.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}>
      {text}
      </button>
    )
  }
}
