import * as React from 'react'
import Scrollbar from '../scrollbar'

interface TableBodyProps {
  maxHeight?:number
  stopWheelEvent?:boolean
  widths?:number[]
}

export default class TableBody extends React.Component<TableBodyProps> {
  render() {
    let { maxHeight, stopWheelEvent, children, widths } = this.props
    return (
      <div className="table-body" style={{ maxHeight:maxHeight }}>
        <Scrollbar stopWheelEventWhenMouseOver={ stopWheelEvent === true }>
        {
          React.Children.map(children, (child, index) => {
            return React.cloneElement(React.Children.only(child), { 
              widths: widths,
              index: index,
            })
          })
        }
        </Scrollbar>
      </div>
    )
  }
}
