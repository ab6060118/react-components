import * as React from 'react';
import Input from '../input';
import Dropdown, { DropdownItemNormal } from '../dropdown';

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
  handleItemPerPageUpdate:React.MouseEventHandler<HTMLElement>
  handleGoPage:Function
  disabled?:boolean
  pageText?:string
  displayItemText?:string
  totalText?:string
  showText?:string
  itemsText?:string
}

interface PageControlState {
  pageTemp:string
}

export default class PageControl extends React.Component<PageControlProps, PageControlState> {
  constructor(props:PageControlProps) {
    super(props)
    this.state = {
      pageTemp: props.currentPage.toString()
    }

    this.handlePageTempUpdate = this.handlePageTempUpdate.bind(this)
    this.handleGoPage = this.handleGoPage.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
  }

  componentWillReceiveProps(nextProps:PageControlProps) {
    this.setState({
      pageTemp: nextProps.currentPage.toString()
    })
  }

  handlePageTempUpdate(e:React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value

    if(!/^\d+$/.test(value) && value !== '') return 

    this.setState({
      pageTemp: value
    })
  }

  handleGoPage() {
    let { totalItems, itemPerPage } = this.props
    let pageTemp = parseInt(this.state.pageTemp)
    let totalPage = Math.ceil(totalItems/itemPerPage)

    if(pageTemp > 0 && !isNaN(pageTemp) && pageTemp <= totalPage) {
      this.goPage(pageTemp)
    }
  }

  handleIconClick(e:React.MouseEvent<HTMLElement>) {
    let { currentPage, totalItems, itemPerPage } = this.props
    let totalPage = Math.ceil(totalItems/itemPerPage)
    let type = parseInt(e.currentTarget.dataset.type)
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

  getIconStyle(type:ICON_TYPE, originClassName:string) {
    let className:string[] = [originClassName]
    let { disabled, currentPage, totalItems, itemPerPage } = this.props
    let totalPage = Math.ceil(totalItems/itemPerPage)

    if(disabled === true) className.push('disable')

    if(type === ICON_TYPE.LEFT && currentPage === 1) className.push('disable')

    if(type === ICON_TYPE.RIGHT && currentPage === totalPage) className.push('disable')

    return className.join(' ')
  }

  render() {
    let { pageTemp } = this.state
    let { currentPage, itemPerPage, pageText, totalItems, displayItemText, totalText, showText, itemsText, handleItemPerPageUpdate, itemPerPageList } = this.props
    let totalPage = Math.ceil(totalItems/itemPerPage)
    let itemStart = (currentPage-1)*itemPerPage
    let itemEnd = itemStart+itemPerPage

    return (
      <div className='page-control'>
        <div className='page-control-left'>
          <span className={this.getIconStyle(ICON_TYPE.LEFT, 'page-control-icon-more-left')} data-type={ICON_TYPE.FIRST} onClick={this.handleIconClick} />
          <span className={this.getIconStyle(ICON_TYPE.LEFT, 'page-control-icon-left')} data-type={ICON_TYPE.LEFT} onClick={this.handleIconClick} />
          <div className='page-control-divider'></div>
          <Input
            className='page-control-input'
            onClick={undefined}
            labelElement={<span>{pageText || 'Page'}</span>}
            id="page-control-input"
            value={pageTemp}
            onChange={this.handlePageTempUpdate}
            handleEnter={this.handleGoPage} />
          <span style={{paddingLeft: 6}}>{'/' + totalPage}</span>
          <div className='page-control-divider'/>
          <span className={this.getIconStyle(ICON_TYPE.RIGHT, 'page-control-icon-right')} data-type={ICON_TYPE.RIGHT} onClick={this.handleIconClick}/>
          <span className={this.getIconStyle(ICON_TYPE.RIGHT, 'page-control-icon-more-right')} data-type={ICON_TYPE.LAST} onClick={this.handleIconClick}/>
          <div className='page-control-divider'></div>
          <span className={this.getIconStyle(ICON_TYPE.REFRESH, 'page-control-icon-refresh')} data-type={ICON_TYPE.REFRESH} onClick={this.handleIconClick}/>
        </div>
        <div className='page-control-right'>
          <div className='page-control-divider'></div>
          <span>{displayItemText || 'Display item:'}</span>
          <span>{`${itemStart+1}-${itemEnd < totalItems ? itemEnd : totalItems},`}</span>
          <span>{totalText || 'Total:' + totalItems}</span>
          <div className='page-control-divider'></div>
          <Dropdown
            id='page-control-dropdown'
            multiMode={false}
            disabled={false}
            className='page-control-dropdown'
            handleSelect={handleItemPerPageUpdate}
            handleCloseDropdown={undefined}
            labelElement={<span style={{marginRight: 4}}>{showText || 'show'}</span>}
            valueElement={<span>{itemPerPage}</span>} >
          {
            itemPerPageList.map((item, index) => (
              <DropdownItemNormal value={item} key={index}>
                <span>{item}</span>
              </DropdownItemNormal>
            ))
          }
          </Dropdown>
          <span style={{marginLeft: 6}}>{itemsText||'items'}</span>
        </div>
      </div>
    )
  }
}
