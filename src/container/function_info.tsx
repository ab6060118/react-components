import * as React from 'react'
import FunctionInfo from '../components/function_info'

export default class FunctionInfoContainer extends React.Component<any> {
  render() {
    let functionInfoElement = <span>{'Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test'}</span>

    return (
      <FunctionInfo className="example-function-info" element={functionInfoElement}>
        <span>{'Function Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info TestFunction Info Test'}</span>
      </FunctionInfo>
    )
  }
}
