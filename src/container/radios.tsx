import * as React from 'react'

import Radio from '../components/radio';

export default class Radios extends React.Component<any, any> {
  constructor(props:any) {
    super(props)

    this.state = {
      value: '1',
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(value:any) {
    this.setState({
      value: value
    })
  }

  render() {
    let { value } = this.state

    return (
      <div>
        <Radio value="1" checked={value === '1'} handleClick={this.handleClick} disabled={true}>{'test1'}</Radio>
        <Radio value="2" checked={value === '2'} handleClick={this.handleClick} disabled={true}>{'test2'}</Radio>
        <Radio value="3" checked={value === '3'} handleClick={this.handleClick}>{'test3'}</Radio>
      </div>
    )
  }
}
