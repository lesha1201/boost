// @flow
import React from 'react';

import { Grid } from '../Grid';
import { createThemeTag } from '../../theme/createThemeTag';
import { gapSizes } from '../../constants';
import type { PropSizes } from '../../types';


type TableBodyRowProps = {
  children?: React$Node,
  columnGap?: PropSizes,
};

const name = 'tableBodyRow';

const [TableBodyRowTag, theme] = createThemeTag(name, ({ COLORS }: *) => ({
  root: props => ({
    display: 'grid',
    minHeight: '48px',
    borderBottom: `1px solid ${COLORS.PRIMARY_BORDER_COLOR}`,
    columnGap: gapSizes[props.columnGap],
  }),
  modifiers: {
    condensed: {
      minHeight: '36px',
    },
  },
  defaults: {
  },
}));

function TableBodyRow({
  children,
  ...rest
  }: TableBodyRowProps) {
  return <TableBodyRowTag { ...rest } tagName={ Grid.Layout }>{ children }</TableBodyRowTag>;
}

export { TableBodyRow, theme };
