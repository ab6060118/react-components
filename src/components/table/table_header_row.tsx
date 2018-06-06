import * as React from 'react'

interface TableHeaderRowProps {
  widths?:number[]
  updateWidths?:Function
}

export default class TableHeaderRow extends React.Component<TableHeaderRowProps> {
  render() {
    let { children, widths, updateWidths } = this.props
    return (
      <div className="table-header-row">
      {
        React.Children.map(React.Children.toArray(children), (child, index) => {
          let resizable:boolean = true

          if((child as any).props.resizable !== undefined) resizable = (child as any).props.resizable
          if(React.Children.count(children) === index + 1) resizable = false

          return React.cloneElement(React.Children.only(child), { 
            resizable: resizable,
            width: widths[index],
            index: index,
            updateWidths: updateWidths,
          })
        })
      }
      </div>
    )
  }
}
