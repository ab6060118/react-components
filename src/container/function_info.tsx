import * as React from 'react'
import FunctionInfo from '../components/function_info'
import Checkbox from './checkbox';

export default class FunctionInfoContainer extends React.Component<any> {
  render() {
    let functionInfoElement = <span>{'Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test Test Function Info Test'}</span>

    return (
      <FunctionInfo className="example-function-info" wrapElement={<Checkbox />}>
        {functionInfoElement}
      </FunctionInfo>
    )
  }
}
