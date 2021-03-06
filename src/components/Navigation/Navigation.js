// @flow

import React from 'react';
import { COLORS } from '../../theme';

import { NavigationTag } from './Navigation.theme';
import { NavigationItem } from './NavigationItem';


type NavigationProps = {
  children?: React$Node,
  expandedWidth?: string,
  collapsedWidth: string,
  color: $Keys<typeof COLORS>
};

type NavigationState = {
  expandedWidth?: string,
  expanded: boolean,
};

class Navigation extends React.Component<NavigationProps, NavigationState> {
  static displayName = 'Navigation';
  static Item = NavigationItem;
  static defaultProps = {
    collapsedWidth: '60px',
  };

  state = {
    expandedWidth: this.props.expandedWidth,
    expanded: false,
  }

  // $FlowFixMe
  navRef = React.createRef();

  componentDidMount() {
    const { current: navElement } = this.navRef;

    if (navElement) {
      requestAnimationFrame(() => {
        if (!this.props.expandedWidth) {
          this.setState({
            expandedWidth: getComputedStyle(navElement).width,
          });
        }

        navElement.style.width = this.props.collapsedWidth;
        navElement.addEventListener('mouseenter', this.onMouseEnter);
        navElement.addEventListener('mouseleave', this.onMouseLeave);
      });
    }
  }

  componentWillUnmount() {
    const { current: navElement } = this.navRef;

    if (navElement) {
      navElement.removeEventListener('mouseenter', this.onMouseEnter);
      navElement.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }

  onMouseEnter = () => {
    if (this.navRef.current) {
      this.navRef.current.style.width = this.state.expandedWidth;
    }

    this.setState({
      expanded: true,
    });
  }

  onMouseLeave = () => {
    if (this.navRef.current) {
      this.navRef.current.style.width = this.props.collapsedWidth;
    }

    this.setState({
      expanded: false,
    });
  }

  render() {
    const { color, children, ...rest } = this.props;
    const { expanded } = this.state;

    return (
      <NavigationTag { ...rest } insideRef={ this.navRef } color={ color } tagName="nav">
        {
          React.Children.map(children, child =>
            React.cloneElement(child, {
              color: child.props.color || color,
              parentExpanded: expanded,
            }),
          )
        }
      </NavigationTag>
    );
  }
}

export { Navigation };
