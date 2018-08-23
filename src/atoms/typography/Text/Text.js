// @flow

import React from 'react';
import fp from 'lodash/fp';
import { PALETTE } from '../../../theme';
import { createStyledTag, createTheme } from '../../../utils';
import type { PropSizes } from '../../../types';

type TextProps = {|
  /** text to display in the component */
  children?: React$Node | string | number,
  /** another way to set displayed text */
  text?: string | number,
  /** possible text colors */
  color?: $Keys<typeof PALETTE>,
  /** disabled text state*/
  disabled?: boolean,
  /** set style to bold or other weights */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold',
  /** possible sizes */
  size?: PropSizes,
  /** text align */
  align?: 'left' | 'center' | 'right',
  /** when true then cut text with ellipsis */
  ellipsis?: boolean,
|};

const name = 'text';

const theme = createTheme(name, (colors: *): * => ({
  modifiers: {
    color: fp.mapValues(
      (color) => ({ color }),
      PALETTE,
    ),

    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },

    disabled: {
      color: colors.DISABLED_TEXT_COLOR,
    },

    weight: {
      light: {
        fontWeight: 300,
      },
      normal: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      semibold: {
        fontWeight: 600,
      },
      bold: {
        fontWeight: 700,
      },
    },

    size: {
      xs: {
        fontSize: '1rem',
      },
      sm: {
        fontSize: '1.2rem',
      },
      md: {
        fontSize: '1.4rem',
      },
      lg: {
        fontSize: '1.6rem',
      },
      xl: {
        fontSize: '1.8rem',
      },
    },

    ellipsis: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },

  defaults: {
    color: 'DARK_GRAY1',
    size: 'md',
    weight: 'normal',
    ellipsis: false,
  },
}));

const StyledTag = createStyledTag(name, {
  lineHeight: 1.4,
  margin: 0,
});

function Text({
  text,
  children,
  ...rest
  }: TextProps) {
  return <StyledTag { ...rest } tagName="span">{ children || text }</StyledTag>;
}

Text.defaultProps = {
  ...theme[name].defaults,
};

export { Text, theme };
