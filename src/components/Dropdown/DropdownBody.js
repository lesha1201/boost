// @flow
import fp from 'lodash/fp';
import React, { PureComponent, Fragment } from 'react';
import { type HOC, compose, setDisplayName, withProps } from 'recompose';
import onClickOutside from 'react-onclickoutside';
import { Popper } from 'react-popper';
import { Portal } from 'react-portal';

import { withDropdownContext } from './DropdownContext';
import { offsetSizes, DropdownBodyTag } from './DropdownBody.theme';
import type { PropSizes } from '../../types';
import { Z_INDEX } from '../../theme';


type DropdownBodyProps = {
  /** takes either react dom element or function */
  children: React$Node | ({ closeDropdown: () => void }) => React$Node,

  /** Default content position relative target */
  placement?: 'top' | 'left' | 'bottom' | 'right' | 'auto',
  /** Default content align relative target*/
  pin?: 'left' | 'right',
  /** Set body offset relative target */
  offset?: PropSizes,
  /** Use fixed position instead of absolute */
  positionFixed?: boolean,
  /** Manual set width */
  width?: number,
  /** Popper js option https://popper.js.org/popper-documentation.html#modifiers..preventOverflow */
  preventOverflow?: boolean,
  /** Prevent unmount dropdown content on close */
  forceRender?: boolean,
  /** Replace dropdown body to the dom root by the portal */
  withPortal?: boolean,
  /** When true then close dropdown on outside clicking */
  closeOnClickOutside?: boolean,

  /**  */
  modifiers?: Object,
  /** Options for background color */
  background?: 'white' | 'dark' | 'none',
  /** Options for body padding */
  padding?: PropSizes,
  /** Stretch drodpown body width to the target width */
  stretch?: boolean,
}

const setPreventOverflow = (preventOverflow?: boolean) => preventOverflow
  ? fp.merge({ preventOverflow: { enabled: false }, hide: { enabled: false }})
  : fp.identity;

const setOffset = (offset?: PropSizes) => offset && offset !== 'none'
  ? fp.merge({ offset: { enabled: true, offset: offsetSizes[offset] }})
  : fp.identity;

const setFlip = fp.merge({
  flip: {
    behavior: ['bottom'],
    boundariesElement: 'viewport',
  },
});

const dropdownBodyEnhancer: HOC<*, DropdownBodyProps> = compose(
  setDisplayName('Dropdown.Body'),
  withDropdownContext,
  withProps(
    ({ dropdown: { outsideClickIgnoreClass }}) => ({ outsideClickIgnoreClass }),
  ),
  onClickOutside,
);

type DropdownBodyEnhancedProps = HOCBase<typeof dropdownBodyEnhancer>;

const DropdownBody = dropdownBodyEnhancer(
  class DropdownBodyBase extends PureComponent<DropdownBodyEnhancedProps> {
  static zIndex = Z_INDEX.DROPDOWN;

  static defaultProps = {
    background: 'none',
    padding: 'none',
    borderRadius: 'md',
    placement: 'bottom',
    pin: 'left',
    offset: 'xs',
    isOpen: false,
    forceRender: false,
    withPortal: false,
    positionFixed: false,
    closeOnClickOutside: true,
  }

  handleClickOutside = () => {
    const { closeOnClickOutside, dropdown: { closeDropdown }} = this.props;

    closeOnClickOutside && closeDropdown && closeDropdown();
  }

  getPopperPlacement = () => {
    const { pin, placement = '' } = this.props;
    const popperPin = pin === 'left' ? 'start' : 'end';

    return `${placement}-${popperPin}`;
  }

  getPopperModifiers = () => {
    const { preventOverflow, offset, modifiers } = this.props;

    return fp.pipe(
      setFlip,
      setPreventOverflow(preventOverflow),
      setOffset(offset),
      fp.merge(modifiers),
    )({});
  }

  getBodyWidth = () => {
    const { stretch, dropdown: { targetWidth }, width } = this.props;

    return stretch
      ? targetWidth
      : width && `${width}px`;
  }

  getBodyChildren = () => {
    const { children, dropdown: { closeDropdown }} = this.props;

    return typeof children === 'function'
      ? children({ closeDropdown })
      : children;
  }


  render() {
      const { withPortal, forceRender, positionFixed, dropdown: { isOpen }, ...rest } = this.props;

      const popperPlacement = this.getPopperPlacement();
      const popperModifiers = this.getPopperModifiers();
      const bodyWidth = this.getBodyWidth();
      const renderChildren = this.getBodyChildren();
      const PortalCondComponent = withPortal ? Portal : Fragment;

      return forceRender || isOpen
        ? (
          <PortalCondComponent>
            <Popper
              placement={ popperPlacement }
              modifiers={ popperModifiers }
              positionFixed={ positionFixed }
            >
              { ({ ref, style, placement }) => (
                <DropdownBodyTag
                  { ...rest }
                  insideRef={ ref }
                  data-placement={ placement }
                  tagName="div"
                  style={{
                    ...style,
                    zIndex: DropdownBodyBase.zIndex,
                    width: bodyWidth,
                    display: isOpen ? 'block' : 'none',
                  }}
                >
                  { renderChildren }
                </DropdownBodyTag>
              ) }
            </Popper>
          </PortalCondComponent>
        )
        : null;
    }
  },
);

export { DropdownBody };
