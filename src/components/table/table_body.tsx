import * as React from 'react'
import Scrollbar from '../scrollbar'

interface TableBodyProps {
  selectable?:boolean
  multiSelect?:boolean
  maxHeight?:number
  stopWheelEvent?:boolean
  widths?:number[]
}

interface TableBodyStete {
  selected:any[]
  lastSelectedRowIndex:number
}

export enum TABLE_ROW_CLICK_OPERATIONS {
  NORMAL,
  CTRL,
  SHIFT,
}

export default class TableBody extends React.Component<TableBodyProps, TableBodyStete> {
  constructor(props:TableBodyProps) {
    super(props)

    this.state = {
      selected: [],
      lastSelectedRowIndex: undefined
    }

    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleRowClick(operation:TABLE_ROW_CLICK_OPERATIONS, index:number, id:any) {
    let { lastSelectedRowIndex, selected } = this.state
    let { selectable, multiSelect, children } = this.props
    let newLastSelectedRowIndex:number = lastSelectedRowIndex
    let newSelected:any[] = [...selected]
    let rowElements = React.Children.toArray(children)

    if(selectable === false) return

    if(operation === TABLE_ROW_CLICK_OPERATIONS.CTRL && multiSelect === true) {
      if(newSelected.indexOf(id) < 0) {
        newSelected.push(id)
      }
      else {
        newSelected = newSelected.filter((selected:any) => selected !== id)
      }
    }
    else if(operation === TABLE_ROW_CLICK_OPERATIONS.SHIFT && multiSelect === true) {
      let selectedIndexs:number[] = []

      newSelected = rowElements.filter((row, rowIndex) => {
        if(index > lastSelectedRowIndex) {
          return rowIndex <= index && rowIndex >= lastSelectedRowIndex
        }

        return rowIndex >= index && rowIndex <= lastSelectedRowIndex
      }).map((row) => (row as any).props.id)
    }
    else {
      newSelected = [id]
    }

    if(operation !== TABLE_ROW_CLICK_OPERATIONS.SHIFT && multiSelect === true) {
      newLastSelectedRowIndex = index
    }

    this.setState({
      selected: newSelected,
      lastSelectedRowIndex: newLastSelectedRowIndex
    }, () => {
      // if(handleBodyRowSelect !== undefined) {
        // handleBodyRowSelect(this.state.selected)
      // }
    })
  }

  render() {
    let { maxHeight, stopWheelEvent, children, widths } = this.props
    let { selected } = this.state

    return (
      <div className="table-body" style={{ maxHeight:maxHeight }}>
        <Scrollbar stopWheelEventWhenMouseOver={ stopWheelEvent === true }>
        {
          React.Children.map(children, (child, index) => {
            console.log(this.state);
            return React.cloneElement(React.Children.only(child), { 
              isSelected: selected.indexOf((child as any).props.id) > -1,
              handleRowClick: this.handleRowClick,
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
