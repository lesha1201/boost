import React from 'react';

export default (asStory) => {
  asStory('Components/SecondaryNavigation', module, (story, { SecondaryNavigation }) => {
    story
      .add('default', () => (
        <SecondaryNavigation>
          <SecondaryNavigation.Item label="First item" />
          <SecondaryNavigation.Item label="Second item" className="active" />
          <SecondaryNavigation.Item label="Third item" />
          <SecondaryNavigation.Item label="Fourth item" />
        </SecondaryNavigation>
      ))
      .add('default with actions', () => (
        <SecondaryNavigation>
          <SecondaryNavigation.Item label="First item" />
          <SecondaryNavigation.Item label="Second item" className="active" actions={ [{ label: 'Action', onClick: () => null }] } />
          <SecondaryNavigation.Item label="Third item" />
          <SecondaryNavigation.Item label="Fourth item" />
        </SecondaryNavigation>
      ));
  });
};
