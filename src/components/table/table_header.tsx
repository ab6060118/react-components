import * as React from 'react'

interface TableHeaderProps {
  widths?:number[]
  updateWidths?:Function
}

export default class TableHeader extends React.Component<TableHeaderProps> {
  render() {
    let { children, widths, updateWidths } = this.props
    return (
      <div className="table-header">
        <div className="table-resize-line"></div>
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(React.Children.only(child), { 
            widths: widths,
            updateWidths: updateWidths,
          })
        })
      }
      </div>
    )
  }
}
