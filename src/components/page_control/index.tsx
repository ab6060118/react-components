import * as React from 'react';
import Input from '../input';
import Dropdown, { Option } from '../dropdown';

import './style.scss'

enum ICON_TYPE {
  LEFT = 1,
  RIGHT,
  FIRST,
  LAST,
  REFRESH,
}

interface PageControlProps {
  currentPage:number
  totalItems:number
  itemPerPage:number
  itemPerPageList:number[]
  handleGoPage:Function
  disabled?:boolean
  pageText?:string
  displayItemText?:string
  totalText?:string
  showText?:string
  itemsText?:string
}

interface PageControlState {
  pageTemp:number
}

export default class PageControl extends React.Component<PageControlProps, PageControlState> {
  constructor(props:PageControlProps) {
    super(props)
    this.state = {
      pageTemp: props.currentPage
    }
  }

  componentWillReceiveProps(nextProps:PageControlProps) {
    this.setState({
      pageTemp: nextProps.currentPage
    })
  }

  handlePageTempUpdate(page:any) {
    this.setState({
      pageTemp: page
    })
  }

  handleGoPage() {
    let { totalItems, itemPerPage } = this.props
    let { pageTemp } = this.state
    let totalPage = Math.ceil(totalItems/itemPerPage)

    if(pageTemp > 0 && !isNaN(pageTemp) && pageTemp <= totalPage) {
      this.goPage(pageTemp)
    }
  }

  handleIconClick(type:ICON_TYPE) {
    let { currentPage, totalItems, itemPerPage } = this.props
    let totalPage = Math.ceil(totalItems/itemPerPage)
    let page:number

    if(type === ICON_TYPE.FIRST && currentPage !== 1) this.goPage(1)
    if(type === ICON_TYPE.LEFT && currentPage !== 1) this.goPage(currentPage - 1)
    if(type === ICON_TYPE.RIGHT && currentPage !== totalPage) this.goPage(currentPage + 1)
    if(type === ICON_TYPE.LAST && currentPage !== totalPage) this.goPage(totalPage)
    if(type === ICON_TYPE.REFRESH) this.goPage(currentPage)
  }

  goPage(page:number) {
    let { handleGoPage } = this.props

    if(handleGoPage) {
      handleGoPage(page)
    }
  }

  getItemPerpageDropdownOptions() {
    let { itemPerPageList } = this.props
    let options:Option[]

    options = itemPerPageList.map((data) => ({
      value: data,
      element: <span>{data}</span>
    }))

    return options
  }

  getIconStyle(type:ICON_TYPE, originClassName:string) {
    let className:string[] = [originClassName]
    let { disabled, currentPage, totalItems, itemPerPage } = this.props
    let totalPage = Math.ceil(totalItems/itemPerPage)

    console.log(totalPage, currentPage, type);

    if(disabled === true) className.push('disable')

    if(type === ICON_TYPE.LEFT && currentPage === 1) className.push('disable')

    if(type === ICON_TYPE.RIGHT && currentPage === totalPage) className.push('disable')

    return className.join(' ')
  }

  render() {
    let { pageTemp } = this.state
    let { currentPage, itemPerPage, pageText, totalItems, displayItemText, totalText, showText, itemsText } = this.props
    let totalPage = Math.ceil(totalItems/itemPerPage)
    let itemStart = (currentPage-1)*itemPerPage
    let itemEnd = itemStart+itemPerPage

    return (
      <div className='page-control'>
        <div className='page-control-left'>
          <span className={this.getIconStyle(ICON_TYPE.LEFT, 'page-control-icon-more-left')} onClick={this.handleIconClick.bind(this, ICON_TYPE.FIRST)}></span>
          <span className={this.getIconStyle(ICON_TYPE.LEFT, 'page-control-icon-left')} onClick={this.handleIconClick.bind(this, ICON_TYPE.LEFT)}></span>
          <div className='page-control-divider'></div>
          <Input
            className='page-control-input'
            labelElement={<span>{pageText || 'Page'}</span>}
            id="page-control-input"
            value={pageTemp}
            handleUpdate={this.handlePageTempUpdate.bind(this)}
            handleEnter={this.handleGoPage.bind(this)} />
          <span style={{paddingLeft: 6}}>{'/' + totalPage}</span>
          <div className='page-control-divider'></div>
          <span className={this.getIconStyle(ICON_TYPE.RIGHT, 'page-control-icon-right')} onClick={this.handleIconClick.bind(this, ICON_TYPE.RIGHT)}></span>
          <span className={this.getIconStyle(ICON_TYPE.RIGHT, 'page-control-icon-more-right')} onClick={this.handleIconClick.bind(this, ICON_TYPE.LAST)}></span>
          <div className='page-control-divider'></div>
          <span className={this.getIconStyle(ICON_TYPE.REFRESH, 'page-control-icon-refresh')} onClick={this.handleIconClick.bind(this, ICON_TYPE.REFRESH)}></span>
        </div>
        <div className='page-control-right'>
          <div className='page-control-divider'></div>
          <span>{displayItemText || 'Disable item:'}</span>
          <span>{`${itemStart+1}-${itemEnd < totalItems ? itemEnd : totalItems},`}</span>
          <span>{totalText || 'Total:' + totalItems}</span>
          <div className='page-control-divider'></div>
          <Dropdown
            className='page-control-dropdown'
            labelElement={<span style={{marginRight: 4}}>{showText || 'show'}</span>}
            handleUpdate={()=>{}}
            id='page-control-dropdown'
            valueElement={<span>{itemPerPage}</span>}
            options={this.getItemPerpageDropdownOptions()} />
          <span style={{marginLeft: 6}}>{itemsText||'items'}</span>
        </div>
      </div>
    )
  }
}
