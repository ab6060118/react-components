import * as React from 'react';
import DropdownItemNormal, { DropdownItemNormalProps } from "./dropdown_item_normal";

interface DropdownItemMultiProps extends DropdownItemNormalProps{
  checked:boolean
}

interface DropdownItemMultiState {}

export default class DropdownItemMulti extends React.PureComponent<DropdownItemMultiProps,DropdownItemMultiState> {
  render() {
    let { handleSelect, children, checked, value, selectAble } = this.props

    return (
      <DropdownItemNormal 
        handleSelect={handleSelect}
        value={value}
        selectAble={selectAble}>
        <span className={`dropdown-icon-${checked ? 'checked' : 'unchecked'}`}></span>
        {children}
      </DropdownItemNormal>
    )
  }
}
