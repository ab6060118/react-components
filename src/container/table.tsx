import * as React from 'react'
import Table from '../components/table'
import Tooltip from '../components/tooltip'
import PageControl from '../components/page_control'

class Span extends React.Component<any> {
  render() {
    return (
      <span style={this.props.style}>ttt</span>
    )
  }
}

interface TableContainerState {
  currentPage:number
  head:string[]
  tableData:{
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
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
        { name: 'a', method: ''}, { name: 'a', method: ''}, { name: 'a', method: ''},
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
      <div>
        <Table
          bodyMaxHeight={ 100 }
          widths={[
            { default: '25%', min: 30},
            { default: '25%', min: 30},
            { default: '25%', min: 30},
            { default: '25%', min: 30},
          ]}
          className='example-table'
          resizable={ true }
          headElements={ head.map( str => (
            <Tooltip text={str}>
              <span style={headSpanStyle}>{ str }</span>
            </Tooltip> 
          ))} 
          bodyElements={ tableData.map( ( item, index ) => [
            <Span style={headSpanStyle}/>,
            <span style={headSpanStyle}>{ index+item.method }</span>,
            <span>{ item.name }</span>,
          ] ) }/>
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
