'use strict';

describe('MobilePracticeTowApp', () => {
  let React = require('react/addons');
  let MobilePracticeTowApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MobilePracticeTowApp = require('components/MobilePracticeTowApp.js');
    component = React.createElement(MobilePracticeTowApp);
  });

  it('should create a new instance of MobilePracticeTowApp', () => {
    expect(component).toBeDefined();
  });
});
