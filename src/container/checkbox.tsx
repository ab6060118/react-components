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
        id='example-checkbox'
        item='example'
        handleValueChange={(value:boolean) => {this.setState({value: value})}}
        labelElement={<span>{'Example checkbox'}</span>}
        disabled={false}
        value={value} />
    )
  }
}
