import * as React from 'react'

interface TableBodyColProps {
  width?:number
  index?:number
}

export default class TableBodyCol extends React.Component<TableBodyColProps> {
  render() {
    let { children, width } = this.props
    return (
      <div className="table-col" style={{width: width}} >
      { children }
      </div> 
    )
  }
}
