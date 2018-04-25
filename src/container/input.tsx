import * as React from 'react'

import Input from '../components/input'

export default class InputContainer extends React.Component<any> {
  render() {
    return (
      <Input 
        value={'test'}
        labelElement={<span>Example</span>}
        handleUpdate={()=>{}}
        id='example-input' />
    )
  }
}
