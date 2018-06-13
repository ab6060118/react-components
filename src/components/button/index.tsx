import * as React from 'react'
import './style.scss'

interface IButton {
  disabled:boolean
  onClick:React.MouseEventHandler<HTMLElement>
}

export default class Button extends React.Component<IButton> {
  getClass() {
    let className:string[] = ['default-button']

    return className.join(' ')
  }

  render() {
    let { children, disabled, onClick } = this.props

    return (
      <button
        className={this.getClass()}
        onClick={onClick}
        disabled={true}>
        {children}
      </button>
    )
  }
}
