import React from 'react';

export default (asStory) => {
  asStory('Components/TextArea', module, (story, { TextArea }) => {
    story
      .add('default', () => (
        <TextArea name="input" value="Affectious vindicably splenopathy demirevetment saffron redeny epitheliosis reacclimatization pistacite obdeltoid Balawu drugman lasher godlet immomentous unguentaria curwhibble dismastment filterable virilist subtrigonal iditol Silybum banshee" onChange={ () => null } cols={ 100 } rows={ 5 } />
      ))
      .add('without value', () => (
        <TextArea name="input" onChange={ () => null } cols={ 100 } rows={ 5 } />
      ))
      .add('with placeholder', () => (
        <TextArea name="input" placeholder="placeholder" onChange={ () => null } cols={ 100 } rows={ 5 } />
      ))
      .add('with disabled', () => (
        <TextArea name="input" placeholder="placeholder" onChange={ () => null } cols={ 100 } rows={ 5 } disabled />
      ))
      .add('with error', () => (
        <TextArea name="input" placeholder="placeholder" onChange={ () => null } cols={ 100 } rows={ 5 } hasError />
      ));
  });
};

