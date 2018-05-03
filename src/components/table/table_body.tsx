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

export default class TableBody extends React.Component<TableBodyProps, TableBodyStete> {
  constructor(props:TableBodyProps) {
    super(props)

    this.state = {
      selected: [],
      lastSelectedRowIndex: undefined
    }

    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleRowClick(index:number, id:any) {
    let newLastSelectedRowIndex:number = undefined
    // let { lastSelectedRowIndex } = this.state
    // let newSelected:any[] = [...this.state.selected]
    // let { selectable, multiSelect } = this.props
    // // let rowElements:BodyRowElement[] = bodyRowElements.filter((rowElement:BodyRowElement) => rowElement.id === id)

    // if(selectable === false) return

    // if(e.ctrlKey === true && multiSelect === true) {
      // if(newSelected.indexOf(id) < 0) {
        // newSelected.push(id)
      // }
      // else {
        // newSelected = newSelected.filter((selected:any) => selected !== id)
      // }
    // }
    // else if(e.shiftKey === true && multiSelect === true) {
      // let selectedElements:BodyRowElement[]

      // if(index > this.lastSelectedRowIndex) {
        // selectedElements = bodyRowElements.slice(lastSelectedRowIndex, index+1)
      // }
      // else {
        // selectedElements = bodyRowElements.slice(index, lastSelectedRowIndex+1)
      // }

      // newSelected = selectedElements.map((e:BodyRowElement) => e.id)
    // }
    // else {
      // newSelected = [id]
    // }

    // if(e.shiftKey !== true && multiSelect === true) {
      // this.lastSelectedRowIndex = index
    // }

    // this.setState({
      // selected: newSelected
      // lastSelectedRowIndex = index
    // }, () => {
      // if(handleBodyRowSelect !== undefined) {
        // handleBodyRowSelect(this.state.selected)
      // }
    // })
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
