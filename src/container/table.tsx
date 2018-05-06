import * as React from 'react'
import * as ReactDOM from 'react-dom';
import Table, { TableBody, TableBodyRow, TableBodyCol, TableHeader, TableHeaderRow, TableHeaderCol } from '../components/table'
import Tooltip from '../components/tooltip'
import PageControl from '../components/page_control'
import TableMenu from './table_menu';

class Span extends React.Component<any> {
  render() {
    console.log('span');

    return (
      <span style={this.props.style}>ttt</span>
    )
  }
}

interface TableContainerState {
  currentPage:number
  selected:any[]
  head:string[]
  isRightClickMenuOpened:boolean
  tableData:{
    id:any
    name:string
    method:string
  }[] 
  reightClickPos:{left:number,top:number}
}

export default class TableContainer extends React.PureComponent<any, TableContainerState> {
  refs:{[key:string]:HTMLElement}

  constructor(props:any) {
    super(props)
    this.state = {
      isRightClickMenuOpened: false,
      currentPage: 1,
      selected:[],
      head: ['name', 'delivery method', 'action'],
      reightClickPos:{left:0,top:0},
      tableData: [
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
      ]
    }

    this.handleBodyRowRightClick = this.handleBodyRowRightClick.bind(this)
    this.handlePressESC = this.handlePressESC.bind(this)
    this.handleClickOutOfRightClickMenu = this.handleClickOutOfRightClickMenu.bind(this)
  }

  componentWillUnmount() {
    this.unbindEvent()
  }

  handleBodyRowRightClick(selected:any[], left:number, top:number) {
    document.addEventListener('click', this.handleClickOutOfRightClickMenu)
    document.addEventListener('keydown', this.handlePressESC)

    this.setState({
      selected: selected,
      isRightClickMenuOpened: true,
      reightClickPos: {
        left: left,
        top: top,
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

  unbindEvent() {
    document.removeEventListener('click', this.handleClickOutOfRightClickMenu)
    document.removeEventListener('keydown', this.handlePressESC)
  }

  closeRightClickMenu() {
    if(this.state.isRightClickMenuOpened === false) return

    this.unbindEvent()

    this.setState({
      isRightClickMenuOpened: false
    })
  }

  render () {
    let { currentPage, tableData, head, reightClickPos, isRightClickMenuOpened, selected } = this.state
    let headSpanStyle:React.CSSProperties = {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      padding: '0 10px',
    }

    return (
      <div className="example-table-container">
        <Table className="example-table">
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCol>
                <span style={headSpanStyle}>{1}</span>
              </TableHeaderCol>
              <TableHeaderCol>
                <span style={headSpanStyle}>{23123123123123123123124345345}</span>
              </TableHeaderCol>
              <TableHeaderCol>
                <span style={headSpanStyle}>{3123123123123123123124345345}</span>
              </TableHeaderCol>
            </TableHeaderRow>
          </TableHeader>
          <TableBody multiSelect={true}>
          {tableData.map((item, index) => (
            <TableBodyRow id={item.id} key={index}>
              <TableBodyCol>
                <Span style={headSpanStyle}/>
              </TableBodyCol>
              <TableBodyCol>
                <span style={headSpanStyle}>{ index+item.method }</span>
              </TableBodyCol>
              <TableBodyCol>
                <span>{ item.name }</span>
              </TableBodyCol>
            </TableBodyRow>
          ))}
          </TableBody>
        </Table>
        <PageControl
          handleGoPage={(page:number)=>{this.setState({currentPage: page})}}
          totalItems={77}
          itemPerPage={25}
          currentPage={parseInt(currentPage as any)}
          itemPerPageList={[10,20,30]} />
      </div>
    )
  }
}

      // {isRightClickMenuOpened === true &&
        // <TableMenu top={reightClickPos.top} left={reightClickPos.left} ids={selected} ref="menu"/>
      // }
        // <Table
          // selectable={true}
          // multiSelect={true}
          // handleBodyRowSelect={(selected:any) => {}}
          // handleBodyRowRightClick={this.handleBodyRowRightClick}
          // widths={[
            // { default: '33.33%', min: 30},
            // { default: '33.33%', min: 30},
            // { default: '33.33%', min: 30},
          // ]}
          // className='example-table'
          // resizable={ true }
          // headerElements={ head.map( str => (
            // <Tooltip text={str}>
              // <span style={headSpanStyle}>{ str }</span>
            // </Tooltip> 
          // ))} 
          // bodyRowElements={ tableData.map( ( item, index ) => ({
            // id: item.id,
            // selectable: true,
            // elements: [
              // <Span style={headSpanStyle}/>,
              // <span style={headSpanStyle}>{ index+item.method }</span>,
              // <span>{ item.name }</span>,
            // ] 
          // }))
        // }/>
