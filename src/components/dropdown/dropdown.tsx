import * as React from 'react'
import Scrollbar from '../scrollbar';

interface DropdownProps {
  id:string
  disabled:boolean
  multiMode:boolean
  valueElement:JSX.Element
  labelElement:JSX.Element
  handleSelect:React.MouseEventHandler<HTMLElement>
  handleCloseDropdown:Function
  className?:string
}

interface DropdownState {
  isOpend:boolean
}

export default class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
  refs:{[key:string]:HTMLElement}

  constructor(props:DropdownProps) {
    super(props)
    this.state = {
      isOpend: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleWheelOutOfDropdown = this.handleWheelOutOfDropdown.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    this.unbindListeners()
  }

  componentDidUpdate(prevProps:DropdownProps, prevState:DropdownState) {
    if(this.state.isOpend && !prevState.isOpend) this.menuOverflow()
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

    if(isOpend) {
      document.addEventListener('wheel', this.handleWheelOutOfDropdown)
      document.addEventListener('mousedown', this.handleMouseDown)
      this.setState({ isOpend: isOpend })
    }
    else {
      this.closeMenu()
    }
  }

  handleWindowResize(e:Event) {
    this.closeMenu()
  }

  handleSelect(e:React.MouseEvent<HTMLElement>) {
    let { handleSelect, multiMode } = this.props

    handleSelect(e)

    if(!multiMode) {
      this.closeMenu()
    }
  }

  closeMenu() {
    let { handleCloseDropdown } = this.props

    this.unbindListeners()

    if(handleCloseDropdown) handleCloseDropdown()

    this.setState({ isOpend: false })
  }

  unbindListeners() {
    document.removeEventListener('mousedown', this.handleMouseDown)
    document.removeEventListener('wheel', this.handleWheelOutOfDropdown)
    window.removeEventListener('resize', this.handleWindowResize)
  }

  menuOverflow() {    
    if(!this.refs.menu || !this.state.isOpend){
      return;
    }

    let { menu, field } = this.refs

    let paddingSpace = 10;
    let { innerHeight:windowHeight } = window;
    let { top:fieldTop, left:fieldLeft, height: fieldHeight, bottom: fieldBottom, width:fieldWidth } = field.getBoundingClientRect();
    let { top, height } = menu.getBoundingClientRect();
    let newTop = fieldTop + fieldHeight;
    let maxHeight:number

    if(height > windowHeight / 2) {
      if(fieldTop + fieldHeight / 2 < windowHeight){
        menu.style.marginTop = '-1px'
        menu.style.top = fieldBottom + 'px'
        maxHeight = windowHeight - fieldBottom - paddingSpace
      }
      else {
        menu.style.marginTop = '1px'
        menu.style.bottom = windowHeight -fieldTop + 'px'
        maxHeight = fieldTop - paddingSpace
      }
    }
    else {
      if(fieldBottom + height < windowHeight) {
        menu.style.marginTop = '-1px'
        menu.style.top = fieldTop + fieldHeight + 'px'
        maxHeight = windowHeight - fieldBottom - paddingSpace
      }
      else {
        menu.style.marginTop = '1px'
        menu.style.bottom = windowHeight -fieldTop + 'px'
        maxHeight = fieldTop - paddingSpace
      }
    }

    menu.style.maxHeight = maxHeight + 'px';
    menu.style.left = fieldLeft + 'px';
    menu.style.width = fieldWidth + 'px';
  }

  getDropdownClassName() {
    let className:string[] = ['dropdown']
    let { disabled, className:classStr } = this.props

    if(classStr !== undefined) className.push(classStr)
    if(disabled === true) className.push('disabled')

    return className.join(' ')
  }

  render() {
    let { id, labelElement, valueElement, children, disabled, handleSelect } = this.props
    let { isOpend } = this.state

    return (
      <div className={this.getDropdownClassName()} ref='dropdown'>
        <input style={{display: 'none'}} readOnly id={id} onClick={this.handleClick} disabled={disabled}/>
        <label className="dropdown-label-container" htmlFor={id}>
          {labelElement}
          <div className="dropdown-field" ref='field'>
            <div className="dropdown-item">
              {valueElement}
            </div>
            <div className="dropdown-icon-container">
              <span className={isOpend ? 'dropdown-close-icon' : 'dropdown-open-icon'}></span>
            </div>
          </div>
        </label>
      { isOpend &&
        <div className="dropdown-menu" ref='menu'>
          <Scrollbar>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(React.Children.only(child), {
              handleSelect: this.handleSelect
            })
          })}
          </Scrollbar>
        </div>
      }
      </div>
    )
  }
}
