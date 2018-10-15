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
  describe('getBodyOffset', () => {
    it('should account for offsetTop', () => {
      const wrapper = shallow(<Body container={() => {}} rows={[]} />);
      const instance = wrapper.instance();
      instance.ref = {
        parentElement: {
          offsetTop: 100
        },
        offsetTop: 35
      };
      expect(instance.getBodyOffset()).to.equal(135);
    });
  });
  describe('onScroll', () => {
    it('should subtract getOffset() from event scrollTop if in a container', () => {
      const wrapper = shallow(<Body container={() => {}} rows={[]} />);
      const instance = wrapper.instance();
      // We don't actually care what this does for this test
      instance.calculateRows = () => ({});
      // Tested elsewhere
      instance.getBodyOffset = () => 100;
      instance.onScroll({
        target: {
          scrollTop: 300
        }
      });
      expect(instance.scrollTop).to.equal(200);
    });
  });
});
