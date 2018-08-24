// @flow
/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';

import { createStyledTag, createTheme } from '../../utils';
import type { BreadcrumbsRoutes, BreadcrumbsMatchPath } from './Breadcrumbs.types';
import { getBreadcrumbs } from './Breadcrumbs.utils';
import { BreadcrumbsItem } from './BreadcrumbsItem';
import { BreadcrumbsDivider } from './BreadcrumbsDivider';

type BreadcrumbsProps = {|
  /* the location pathname */
  pathname: string,
  /* list of breadcrumbs routes */
  routes: BreadcrumbsRoutes,
  /* custom match path function */
  matchPath?: BreadcrumbsMatchPath,
  /* custom breadcrum's item tag */
  itemTagName?: string | React$ComponentType<*>,
|};

const name = 'breadcrumbs';

const theme = createTheme(name, {
  modifiers: {
  },
  defaults: {
  },
});

const BreadcrumbsTag = createStyledTag(name, {});

const Breadcrumbs = ({ itemTagName, pathname, routes, matchPath, ...rest }: BreadcrumbsProps) => {
  const breadcrumbs = getBreadcrumbs(pathname, routes, matchPath);

  return (
    <BreadcrumbsTag { ...rest }>
      {
        React.Children.toArray(
          breadcrumbs.map((item, index) => (
            <Fragment>
              <BreadcrumbsItem to={ item.originalPath } { ...{ ...rest, ...item, tagName: itemTagName } } />
              { index !== breadcrumbs.length - 1 && <BreadcrumbsDivider>></BreadcrumbsDivider> }
            </Fragment>
          )),
        )
      }
    </BreadcrumbsTag>
  );
};

export { Breadcrumbs, theme };