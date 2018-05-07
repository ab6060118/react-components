import * as React from 'react'
import Scrollbar from '../scrollbar'

interface TableBodyProps {
  selectable:boolean
  multiSelect:boolean
  maxHeight?:number
  stopWheelEvent?:boolean
  widths?:number[]
  handleRowSelect?:Function
  handleRowRightClick?:Function
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

    this.handleRowSelect = this.handleRowSelect.bind(this)
    this.handleRowRightClick = this.handleRowRightClick.bind(this)
  }

  handleRowSelect(operation:TABLE_ROW_CLICK_OPERATIONS, index:number, id:any, callback:Function) {
    let { lastSelectedRowIndex, selected } = this.state
    let { selectable, multiSelect, children, handleRowSelect } = this.props
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
      let { selected } = this.state
      if(handleRowSelect !== undefined) {
        handleRowSelect(selected)
      }
      if(callback !== undefined) {
        callback(selected)
      }
    })
  }

  handleRowRightClick(index:number, id:any, mousePosition?:{top:number, left:number}) {
    let { selected } = this.state
    let { handleRowRightClick } = this.props

    if(selected.indexOf(id) < 0) {
      this.handleRowSelect(TABLE_ROW_CLICK_OPERATIONS.NORMAL, index, id, (selected:any[]) => {
        handleRowRightClick(selected, mousePosition.top, mousePosition.left)
      })
    }
    else {
      handleRowRightClick(selected, mousePosition.top, mousePosition.left)
    }
  }

  render() {
    let { maxHeight, stopWheelEvent, children, widths } = this.props
    let { selected } = this.state

    return (
      <div className="table-body" style={{ maxHeight:maxHeight }}>
        <Scrollbar stopWheelEventWhenMouseOver={ stopWheelEvent === true }>
        {
          React.Children.map(children, (child, index) => {
            return React.cloneElement(React.Children.only(child), { 
              isSelected: selected.indexOf((child as any).props.id) > -1,
              handleRowSelect: this.handleRowSelect,
              handleRowRightClick: this.handleRowRightClick,
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
