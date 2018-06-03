import * as React from 'react'

import Radio from '../components/radio';

export default class Radios extends React.Component<any, any> {
  constructor(props:any) {
    super(props)

    this.state = {
      value: '1',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    let value = e.currentTarget.value
    this.setState({value})
  }

  render() {
    let { value } = this.state

    return (
      <div>
        <Radio id="label1" value="1" checked={value === '1'} onChange={this.handleChange} disabled={false}>{'test1'}</Radio>
        <Radio id="label2" value="2" checked={value === '2'} onChange={this.handleChange} disabled={true}>{'test2'}</Radio>
        <Radio id="label3" value="3" checked={value === '3'} onChange={this.handleChange}>{'test3'}</Radio>
      </div>
    )
  }
}
