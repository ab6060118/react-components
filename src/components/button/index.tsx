import * as React from 'react'
import './style.scss'

interface IButton {
  disabled:boolean
  handleClick:React.MouseEventHandler<HTMLElement>
}

export default class Button extends React.Component<IButton> {
  getClass() {
    let className:string[] = ['default-button']

    if(this.props.disabled === true) {
      className.push('disabled')
    }

    return className.join(' ')
  }

  render() {
    let { children, disabled, handleClick } = this.props

    return (
      <button
        className={this.getClass()}
        onClick={handleClick}
        disabled={disabled}>
      {children}
      </button>
    )
  }
}
