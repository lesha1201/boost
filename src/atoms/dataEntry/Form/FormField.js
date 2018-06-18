// @flow

import React from 'react';

import { createStyledTag, createTheme } from 'utils';
import type { InputType, MetaType } from '../formTypes';

type FormFieldProps = {
  children?: React$Node,
  label?: string,
  stretch?: boolean,
  hideErrorLabel?: boolean,
  direction?: 'row' | 'column',
  input: InputType,
  meta: MetaType,
};

const name = 'formField';

const theme = createTheme(name, {
  modifiers: {},
  defaults: {},
});

const FormFieldTag = createStyledTag(name, props => ({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: props.direction === 'row' ? 'row-reverse' : 'column',
  alignItems: props.direction === 'row' ? 'center' : 'flex-start',
  width: props.stretch ? '100%' : 'auto',
}));

const ControlErrorWrapperTag = createStyledTag(name, {
  display: 'block',
  position: 'absolute',
  bottom: 0,
  height: 0,
  lineHeight: 1,
});

const ControlErrorTag = createStyledTag(name, props => ({
  fontSize: '1rem',
  color: props.theme.COLORS.DANGER,
  lineHeight: 1,
}));

const ControlLabelTag = createStyledTag(name, props => ({
  marginLeft: props.direction === 'row' ? '1rem' : 0,
  fontSize: props.direction === 'row' ? '1.4rem' : '1.2rem',
  color: props.theme.COLORS.SECONDARY_TEXT_COLOR,
  lineHeight: 2,
}));

const FormField = ({
  meta,
  label,
  children,
  direction,
  hideErrorLabel,
  ...rest
  }: FormFieldProps) => {
  const { error, touched } = meta;
  const hasError = !!error && !!touched;
  const hasLabel = !!label;

  return (
    <FormFieldTag { ...rest } direction={ direction } tagName="div">
      <If condition={ hasLabel }>
        <ControlLabelTag direction={ direction } tagName="div">
          { label }
        </ControlLabelTag>
      </If>
      { children }
      <If condition={ hasError && !hideErrorLabel }>
        <ControlErrorWrapperTag tagName="div">
          <ControlErrorTag tagName="span">{ error }</ControlErrorTag>
        </ControlErrorWrapperTag>
      </If>
    </FormFieldTag>
  );
};

FormField.defaultProps = {
  hideErrorLabel: false,
  stretch: true,
  direction: 'column',
};

export { FormField, theme };
