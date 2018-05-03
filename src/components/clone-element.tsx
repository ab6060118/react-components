import * as React from 'react';

export default class CloneElement extends React.Component<any> {
  refs:{[key:string]:HTMLElement}

  handleClick() {
    this.refs.element.style.display = 'block';
    this.refs.element.style.height = '100px';
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children),{
      onClick:this.handleClick.bind(this),
      ref: 'element',
      className: 'clone-test ' + (this.props.children as any).props.className
    })
  }
}
