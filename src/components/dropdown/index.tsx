import * as React from 'react'
import Scrollbar from '../scrollbar';
import './style.scss'

interface Option {
  value:any
  element:JSX.Element
  disabled?:boolean
  selectAble?:boolean
}

interface DropdownProps {
  disabled?: boolean
  handleUpdate:Function
  id:string
  options: Option[]
  labelElement?:JSX.Element
  value: any
}

interface DropdownState {
  isOpend:boolean
}

interface DropdownItemProps extends Option{
  handleSelect:Function
}

class DropdownItem extends React.Component<DropdownItemProps> {
  handleSelect(e:React.MouseEvent<HTMLElement>) {
    let { value, disabled, selectAble, handleSelect } = this.props

    if(disabled || selectAble === false) {
      e.stopPropagation()

      return
    }

    handleSelect(value)
  }

  render() {
    return (
      <div className="dropdown-item" onClick={this.handleSelect.bind(this)}>
        {this.props.element}
      </div>
    )
  }
}

export default class DropdownList extends React.Component<DropdownProps, DropdownState> {
  refs:{[key:string]:HTMLElement}

  constructor(props:DropdownProps) {
    super(props)
    this.state = {
      isOpend: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleWheelOutOfDropdown = this.handleWheelOutOfDropdown.bind(this)
  }

  componentWillUnmount() {
    this.unbindListeners()
  }

  componentDidUpdate() {
    this.menuOverflow()
  }

  handleWheelOutOfDropdown(e:MouseEvent) {
    if(!this.refs.dropdown.contains(e.target as Node)) {
      this.closeMenu()
    }
  }

  handleMouseDown(e:any) {
    let forId = (e.target.getAttribute('for'))

    if(this.refs.dropdown.contains(e.target) || !this.state.isOpend || forId === this.props.id) {
      return
    }

    this.closeMenu()
  }

  handleClick() {
    let isOpend = !this.state.isOpend

    if(this.props.disabled === true) return
    
    if(isOpend) {
      document.addEventListener('wheel', this.handleWheelOutOfDropdown)
      document.addEventListener('mousedown', this.handleMouseDown)
      this.setState({ isOpend: isOpend })
    }
    else {
      this.closeMenu()
    }
  }

  handleSelect(value:any) {
    let { handleUpdate } = this.props

    if(handleUpdate) handleUpdate(value)

    this.closeMenu()
  }

  closeMenu() {
    this.unbindListeners()

    this.setState({ isOpend: false })
  }

  unbindListeners() {
    document.removeEventListener('mousedown', this.handleMouseDown)
    document.removeEventListener('wheel', this.handleWheelOutOfDropdown)
  }

  menuOverflow() {    
    if(!this.refs.menu || !this.state.isOpend){
      return;
    }

    let { menu } = this.refs

    let paddingSpace = 10;
    let { innerHeight:windowHeight } = window;
    let { top:parentTop, left:parentLeft, height: parentHeight, bottom: parentBottom, width:parentWidth } = menu.parentElement.getBoundingClientRect();
    let { top, height } = menu.getBoundingClientRect();
    let newTop = parentTop + parentHeight;
    let maxHeight:number;

    if (windowHeight > newTop + height + paddingSpace){
      // display as bottom side 
      menu.style.top = newTop + 'px';
      menu.style.marginTop = '-1px'
    }else if ( parentTop - height > paddingSpace){
      // display as top side
      menu.style.top = parentTop - height + 'px';
      menu.style.marginTop = '1px'
    }else{
      // limit menu height
      if (parentTop > windowHeight - parentBottom ){
        // display as top side
        maxHeight = parentTop - paddingSpace;
        menu.style.top = parentTop - maxHeight + 'px';
        menu.style.marginTop = '1px'
      }else{
        // display as bottom side 
        maxHeight = windowHeight - parentBottom - paddingSpace
        menu.style.top = newTop + 'px';
        menu.style.marginTop = '-1px'
      }
      menu.style.maxHeight = maxHeight + 'px';
    }

    menu.style.left = parentLeft + 'px';
    menu.style.width = parentWidth + 'px';
  }

  getDropdownClassName() {
    let className:string[] = ['dropdown']

    if(this.props.disabled) {
      className.push('disabled')
    }

    return className.join(' ')
  }

  render() {
    let { id, labelElement, options, value } = this.props
    let { isOpend } = this.state
    let dispalyValue = options.filter(option => option.value === value)[0] || options[0]

    return (
      <div className={this.getDropdownClassName()} ref='dropdown'>
        <input style={{display: 'none'}} readOnly id={id} onClick={this.handleClick.bind(this)} />
        {labelElement && <label className="dropdown-label-container" htmlFor={id}>{labelElement}</label> }
        <div className="dropdown-field" onClick={this.handleClick.bind(this)}>
          <div className="dropdown-item">
            {dispalyValue.element}
          </div>
          <div className="dropdown-icon-container">
            <span className={isOpend ? 'dropdown-close-icon' : 'dropdown-open-icon'}></span>
          </div>
        { isOpend &&
          <div className="dropdown-menu" ref='menu'>
            <Scrollbar>
            {
              options.map((item, key:number) => (
                <DropdownItem 
                  {...item}
                  handleSelect={this.handleSelect.bind(this)}
                  key={key}/>
              ))
            }
            </Scrollbar>
          </div>
        }
        </div>
      </div>
    )
  }
}
