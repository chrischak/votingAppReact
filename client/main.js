import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/client/App';
import { Clock } from '../imports/client/Clock';
import { ConverterBox } from '../imports/client/CurrencyConverter';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
  render(<Clock />, document.getElementById('render-clock'));
  render(<ConverterBox />, document.getElementById('render-currency-converter'));
});
