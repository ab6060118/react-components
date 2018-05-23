import * as React from 'react'

import Checkbox from '../components/checkbox';

export default class CheckboxContainer extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      value: true
    }
  }

  render() {
    let { value } = this.state
    return (
      <Checkbox
        id={'example-checkbox-' + +new Date()}
        handleClick={() => {this.setState({value: !value}); console.log('click')}}
        disabled={true}
        checked={value}>
        <span>{'Example checkbox'}</span>
      </Checkbox>
    )
  }
}
