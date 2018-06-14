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

export default class TableBody extends React.PureComponent<TableBodyProps, TableBodyStete> {
  constructor(props:TableBodyProps) {
    super(props)

    this.state = {
      selected: [],
      lastSelectedRowIndex: undefined
    }

    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleRowRightClick = this.handleRowRightClick.bind(this)
  }

  handleRowClick(e:React.MouseEvent<HTMLElement>) {
    let { selectable, multiSelect, children, handleRowSelect } = this.props
    let { lastSelectedRowIndex, selected } = this.state
    let id = e.currentTarget.dataset.id
    let index = parseInt(e.currentTarget.dataset.index)
    let newLastSelectedRowIndex:number = lastSelectedRowIndex
    let newSelected:any[] = [...selected]
    let rowElements = React.Children.toArray(children)

    if(selectable === false) return

    if(e.ctrlKey && multiSelect) {
      if(newSelected.indexOf(id) < 0) {
        newSelected.push(id)
      }
      else {
        newSelected = newSelected.filter((selected:any) => selected !== id)
      }
    }
    else if(e.shiftKey && multiSelect) {
      let selectedIndexs:number[] = []

      newSelected = rowElements.filter((row, rowIndex) => {
        if(index > lastSelectedRowIndex) {
          return rowIndex <= index && rowIndex >= lastSelectedRowIndex
        }

        return rowIndex >= index && rowIndex <= lastSelectedRowIndex
      }).map((row) => (row as any).props.id.toString())
    }
    else {
      newSelected = [id]
    }

    if(!e.shiftKey && multiSelect) {
      newLastSelectedRowIndex = index
    }

    this.setState({
      selected: newSelected,
      lastSelectedRowIndex: newLastSelectedRowIndex
    }, () => {
      let { selected } = this.state
      if(handleRowSelect !== undefined) {
        handleRowSelect(e, selected)
      }
    })
  }

  handleRowRightClick(e:React.MouseEvent<HTMLElement>) {
    let { selected } = this.state
    let id = e.currentTarget.dataset.id
    let index = parseInt(e.currentTarget.dataset.index)
    let { handleRowRightClick } = this.props

    if(!handleRowRightClick) return ;

    e.persist()

    if(selected.indexOf(id) < 0) {
      this.setState({
        selected: [id],
        lastSelectedRowIndex: index,
      }, () => {
        let { selected } = this.state
        handleRowRightClick(e, selected)
      })
    }
    else {
      handleRowRightClick(e, selected)
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
              isSelected: selected.indexOf((child as any).props.id.toString()) > -1,
              onClick: this.handleRowClick,
              onContextMenu: this.handleRowRightClick,
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
