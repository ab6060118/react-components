import * as React from 'react'
import * as ReactDOM from 'react-dom';
import Table, { TableBody, TableBodyRow, TableBodyCol, TableHeader, TableHeaderRow, TableHeaderCol } from '../components/table'
import Tooltip from '../components/tooltip'
import PageControl from '../components/page_control'
import TableMenu from './table_menu';

const tableDataTotal = [
  { id: 1, name: 'a', method: ''}, { id: 2, name: 'a', method: ''},
  { id: 3, name: 'a', method: ''}, { id: 4, name: 'a', method: ''},
  { id: 5, name: 'a', method: ''}, { id: 6, name: 'a', method: ''},
  { id: 7, name: 'a', method: ''}, { id: 8, name: 'a', method: ''},
  { id: 9, name: 'a', method: ''}, { id: 10, name: 'a', method: ''},
  { id: 11, name: 'a', method: ''}, { id: 12, name: 'a', method: ''},
  { id: 13, name: 'a', method: ''}, { id: 14, name: 'a', method: ''},
  { id: 15, name: 'a', method: ''}, { id: 16, name: 'a', method: ''},
  { id: 17, name: 'a', method: ''}, { id: 18, name: 'a', method: ''},
  { id: 19, name: 'a', method: ''}, { id: 20, name: 'a', method: ''},
  { id: 21, name: 'a', method: ''}, { id: 22, name: 'a', method: ''},
  { id: 23, name: 'a', method: ''}, { id: 24, name: 'a', method: ''},
  { id: 25, name: 'a', method: ''}, { id: 26, name: 'a', method: ''},
  { id: 27, name: 'a', method: ''}, { id: 28, name: 'a', method: ''},
  { id: 29, name: 'a', method: ''}, { id: 30, name: 'a', method: ''},
  { id: 31, name: 'a', method: ''}, { id: 32, name: 'a', method: ''},
]

const getTableData = (offset:number, limit:number) => {
  return tableDataTotal.slice(offset*limit, (offset+1)*limit)
}

interface TableContainerState {
  currentPage:number
  selected:any[]
  head:string[]
  isRightClickMenuOpened:boolean
  reightClickPos:{left:number,top:number}
  itemPerPage:number
  tableData:any[]
}

export default class TableContainer extends React.PureComponent<any, TableContainerState> {
  refs:{[key:string]:HTMLElement}
  tableData:any[]

  constructor(props:any) {
    super(props)
    this.state = {
      isRightClickMenuOpened: false,
      currentPage: 1,
      selected:[],
      head: ['name', 'delivery method', 'action'],
      reightClickPos:{left:0,top:0},
      itemPerPage:30,
      tableData:[]
    }

    this.removeRow = this.removeRow.bind(this)
    this.handleBodyRowRightClick = this.handleBodyRowRightClick.bind(this)
    this.handlePressESC = this.handlePressESC.bind(this)
    this.handleClickOutOfRightClickMenu = this.handleClickOutOfRightClickMenu.bind(this)
    this.handleGoPage = this.handleGoPage.bind(this)
    this.handlePerpageUpdate = this.handlePerpageUpdate.bind(this)
  }

  componentWillMount() {
    this.updateTableData()
  }

  componentWillUnmount() {
    this.unbindEvent()
  }

  handlePerpageUpdate(e:React.MouseEvent<HTMLElement>) {
    this.setState({
      itemPerPage: parseInt(e.currentTarget.dataset.value)
    }, this.updateTableData)
  }

  handleBodyRowRightClick(e:React.MouseEvent<HTMLElement>, selected:any[]) {
    document.addEventListener('click', this.handleClickOutOfRightClickMenu)
    document.addEventListener('keydown', this.handlePressESC)

    this.setState({
      selected: selected,
      isRightClickMenuOpened: true,
      reightClickPos: {
        top: e.clientY,
        left: e.clientX,
      }
    })
  }

  handleClickOutOfRightClickMenu(e:MouseEvent) {
    if(this.state.isRightClickMenuOpened === false) return

    if(!ReactDOM.findDOMNode(this.refs.menu).contains(e.target as Node)) {
      this.closeRightClickMenu()
    }
  }

  handlePressESC(e:KeyboardEvent) {
    if(this.state.isRightClickMenuOpened === false) return

    if(e.keyCode === 27) {
      this.closeRightClickMenu()
    }
  }

  handleGoPage(page:number) {
    this.setState({
      currentPage: page
    }, this.updateTableData)
  }

  unbindEvent() {
    document.removeEventListener('click', this.handleClickOutOfRightClickMenu)
    document.removeEventListener('keydown', this.handlePressESC)
  }

  updateTableData() {
    let { itemPerPage, currentPage} = this.state

    this.setState({
      tableData: getTableData(currentPage-1, itemPerPage)
    })
  }

  closeRightClickMenu() {
    if(this.state.isRightClickMenuOpened === false) return

    this.unbindEvent()

    this.setState({
      isRightClickMenuOpened: false
    })
  }

  removeRow() {
    this.setState({
      isRightClickMenuOpened: false
    })
  }

  render () {
    let { currentPage, head, reightClickPos, isRightClickMenuOpened, selected, itemPerPage, tableData } = this.state

    let headSpanStyle:React.CSSProperties = {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      padding: '0 10px',
    }

    return (
      <div>
        <div className="example-table-container">
        {isRightClickMenuOpened === true &&
          <TableMenu 
            handleRowRemove={this.removeRow}
            top={reightClickPos.top}
            left={reightClickPos.left}
            ids={selected}
            ref="menu"/>
        }
          <Table className="example-table">
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCol>
                  <span style={headSpanStyle}>{'test'}</span>
                </TableHeaderCol>
                <TableHeaderCol>
                  <span style={headSpanStyle}>{'index'}</span>
                </TableHeaderCol>
                <TableHeaderCol>
                  <span style={headSpanStyle}>{'id'}</span>
                </TableHeaderCol>
              </TableHeaderRow>
            </TableHeader>
            <TableBody multiSelect={true} selectable={true} handleRowSelect={(e:React.MouseEvent<HTMLElement>,selected:any[])=>{console.log(selected)}} handleRowRightClick={this.handleBodyRowRightClick}>
            {tableData.map((item, index) => (
              <TableBodyRow id={item.id} key={index}>
                <TableBodyCol>
                  <span style={headSpanStyle}>{ 't' }</span>
                </TableBodyCol>
                <TableBodyCol>
                  <span style={headSpanStyle}>{ index+item.method }</span>
                </TableBodyCol>
                <TableBodyCol>
                  <span style={headSpanStyle}>{ item.id }</span>
                </TableBodyCol>
              </TableBodyRow>
            ))}
            </TableBody>
          </Table>
          <PageControl
            handleGoPage={this.handleGoPage}
            handleItemPerPageUpdate={this.handlePerpageUpdate}
            totalItems={tableDataTotal.length}
            itemPerPage={itemPerPage}
            itemPerPageList={[10,20,30,50,100,200,300,400]}
            currentPage={parseInt(currentPage as any)} />
        </div>
      </div>
    )
  }
}
