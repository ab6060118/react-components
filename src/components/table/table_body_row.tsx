import * as React from 'react'
import { TABLE_ROW_CLICK_OPERATIONS } from './table_body';

interface TableBodyRowProps {
  id?:any
  index?:number
  isSelected?:boolean
  selectable?:boolean
  widths?:number[]
  onClick?:(e:React.MouseEvent<HTMLElement>) => void
  onContextMenu?:(e:React.MouseEvent<HTMLElement>) => void
  handleRowClick?:Function
}

export default class TableBodyRow extends React.Component<TableBodyRowProps> {
  constructor(props:TableBodyRowProps) {
    super(props)

    this.handleRowClick = this.handleRowClick.bind(this)
  }

  getClassName() {
    let { isSelected } = this.props
    let className:string[] = ['table-body-row']

    if(isSelected === true) className.push('selected')

    return className.join(' ')
  }

  handleRowClick(e:React.MouseEvent<HTMLElement>) {
    let { id, index, handleRowClick } = this.props
    let operation:TABLE_ROW_CLICK_OPERATIONS = TABLE_ROW_CLICK_OPERATIONS.NORMAL

    if(e.ctrlKey === true) {
      operation = TABLE_ROW_CLICK_OPERATIONS.CTRL
    }
    else if(e.shiftKey === true) {
      operation = TABLE_ROW_CLICK_OPERATIONS.SHIFT
    }

    handleRowClick(operation, index, id)
  }

  render() {
    let { children, onClick, onContextMenu, widths } = this.props
    return (
      <div className={this.getClassName()} onClick={this.handleRowClick} onContextMenu={onContextMenu}>
      {
        React.Children.map(children, (child, index) => {
          return React.cloneElement(React.Children.only(child), { 
            width: widths[index],
            index: index,
          })
        })
      }
      </div>
    )
  }
}
