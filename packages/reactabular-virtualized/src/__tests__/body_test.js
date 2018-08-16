/* eslint-disable react/prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Body as StickyBody } from 'reactabular-sticky';
import { Body as TableBody } from 'reactabular-table';
import Body from '../body.js';

describe('Virtualized.Body', () => {
  it('should render Sticky Body normally', () => {
    const wrapper = shallow(<Body height={100} rows={[]}/>);  
    expect(wrapper.find(StickyBody)).to.have.length(1);
  });
  it('should render Table Body normally', () => {
    const wrapper = shallow(<Body container={() => {}} rows={[]}/>);  
    expect(wrapper.find(TableBody)).to.have.length(1);
  });
});
