import * as React from 'react'

import Checkbox from '../components/checkbox';

export default class CheckboxContainer extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      test: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e:React.MouseEvent<HTMLElement>) {
    let value = !this.state[e.currentTarget.dataset.value]
    console.log(e.currentTarget.dataset, value);

    this.setState({
      test: value,
    })
  }

  render() {
    let { value } = this.state
    return (
      <Checkbox
        id={'example-checkbox-' + +new Date()}
        value="test"
        onClick={this.handleClick}
        disabled={false}
        checked={value}>
        <span>{'Example checkbox'}</span>
      </Checkbox>
    )
  }
}
