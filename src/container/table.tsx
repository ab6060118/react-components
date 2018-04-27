import * as React from 'react'
import Table from '../components/table'
import Tooltip from '../components/tooltip'
import PageControl from '../components/page_control'

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
  head:string[]
  tableData:{
    id:number
    name:string
    method:string
  }[] 
}

export default class TableContainer extends React.PureComponent<any, TableContainerState> {
  constructor(props:any) {
    super(props)
    this.state = {
      currentPage: 1,
      head: ['name', 'delivery method', 'action'],
      tableData: [
        { id: 1, name: 'a', method: ''},
        { id: 2, name: 'a', method: ''},
        { id: 3, name: 'a', method: ''},
        { id: 4, name: 'a', method: ''},
        { id: 5, name: 'a', method: ''},
        { id: 6, name: 'a', method: ''},
        { id: 7, name: 'a', method: ''},
        { id: 8, name: 'a', method: ''},
        { id: 9, name: 'a', method: ''},
        { id: 10, name: 'a', method: ''},
        { id: 11, name: 'a', method: ''},
        { id: 12, name: 'a', method: ''},
        { id: 13, name: 'a', method: ''},
        { id: 14, name: 'a', method: ''},
        { id: 15, name: 'a', method: ''},
        { id: 16, name: 'a', method: ''},
        { id: 17, name: 'a', method: ''},
        { id: 18, name: 'a', method: ''},
        { id: 19, name: 'a', method: ''},
        { id: 20, name: 'a', method: ''},
        { id: 21, name: 'a', method: ''},
        { id: 22, name: 'a', method: ''},
        { id: 23, name: 'a', method: ''},
        { id: 24, name: 'a', method: ''},
        { id: 25, name: 'a', method: ''},
        { id: 26, name: 'a', method: ''},
        { id: 27, name: 'a', method: ''},
        { id: 28, name: 'a', method: ''},
        { id: 29, name: 'a', method: ''},
        { id: 30, name: 'a', method: ''},
        { id: 31, name: 'a', method: ''},
        { id: 32, name: 'a', method: ''},
        { id: 33, name: 'a', method: ''},
        { id: 34, name: 'a', method: ''},
        { id: 35, name: 'a', method: ''},
        { id: 36, name: 'a', method: ''},
        { id: 37, name: 'a', method: ''},
        { id: 38, name: 'a', method: ''},
        { id: 39, name: 'a', method: ''},
        { id: 40, name: 'a', method: ''},
        { id: 41, name: 'a', method: ''},
        { id: 42, name: 'a', method: ''},
        { id: 43, name: 'a', method: ''},
        { id: 44, name: 'a', method: ''},
        { id: 45, name: 'a', method: ''},
        { id: 46, name: 'a', method: ''},
        { id: 47, name: 'a', method: ''},
        { id: 48, name: 'a', method: ''},
        { id: 49, name: 'a', method: ''},
        { id: 50, name: 'a', method: ''},
        { id: 51, name: 'a', method: ''},
        { id: 52, name: 'a', method: ''},
        { id: 53, name: 'a', method: ''},
        { id: 54, name: 'a', method: ''},
        { id: 55, name: 'a', method: ''},
        { id: 56, name: 'a', method: ''},
        { id: 57, name: 'a', method: ''},
        { id: 58, name: 'a', method: ''},
        { id: 59, name: 'a', method: ''},
        { id: 60, name: 'a', method: ''},
        { id: 61, name: 'a', method: ''},
        { id: 62, name: 'a', method: ''},
        { id: 63, name: 'a', method: ''},
        { id: 64, name: 'a', method: ''},
        { id: 65, name: 'a', method: ''},
        { id: 66, name: 'a', method: ''},
        { id: 67, name: 'a', method: ''},
        { id: 68, name: 'a', method: ''},
        { id: 69, name: 'a', method: ''},
      ]
    }
  }

  render () {
    let { currentPage, tableData, head } = this.state
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
        <Table
          selectable={true}
          multiSelect={true}
          bodyMaxHeight={500}
          handleBodyRowSelect={(selected:any) => {console.log(selected)}}
          handleBodyRowRightClick={(selected:any) => {console.log(selected)}}
          widths={[
            { default: '33%', min: 30},
            { default: '33%', min: 30},
            { default: '33%', min: 30},
          ]}
          className='example-table'
          resizable={ true }
          headerElements={ head.map( str => (
            <Tooltip text={str}>
              <span style={headSpanStyle}>{ str }</span>
            </Tooltip> 
          ))} 
          bodyRowElements={ tableData.map( ( item, index ) => ({
            id: item.id,
            selectable: true,
            elements: [
              <Span style={headSpanStyle}/>,
              <span style={headSpanStyle}>{ index+item.method }</span>,
              <span>{ item.name }</span>,
            ] 
          }))
        }/>
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
