import React from 'react';

export default (asStory) => {
  asStory('Components/Scrollable', module, (story, { Scrollable }) => {
    story
      .add('default', () => (
        <div style={{ width: '100px', height: '300px' }}>
          <h1>Heading</h1>
          <Scrollable>
            { 'Overappareled analysis antemarginal czarist pedotrophist hemocrystallin ischioperineal Pelasgic rabbeting radicate shinza entame pleurotomy multicolor heterocyclic uncontestedness enwallow hydrazone tinderous roguishness postatrial cerotate kinetomeric' }
          </Scrollable>
        </div>
      ));
  });
};
