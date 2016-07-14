/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { transforms, sort, edit } from '../src';

const { toFormatter } = transforms;

describe('toFormatter', function () {
  it('converts edit to a formatter', function () {
    const editor = edit.edit({
      isEditing: () => {},
      onActivate: () => {},
      onValue: () => {}
    })('div');
    const formatter = toFormatter(editor());

    expect(React.isValidElement(formatter)).to.equal(true);
  });

  it('converts sort to a formatter', function () {
    const sorter = sort.sort();
    const formatter = toFormatter(
      sorter(
        'testValue',
        {
          columnIndex: 0
        }
      )
    );

    expect(React.isValidElement(formatter)).to.equal(true);
  });

  it('converted sort accepts props', function () {
    const className = 'demo-class';
    const sorter = sort.sort();
    const formatter = toFormatter(
      sorter(
        'testValue', {
          columnIndex: 0
        },
        {
          className
        }
      )
    );
    const element = TestUtils.renderIntoDocument(
      React.createElement(Wrapper, {}, formatter)
    );
    const elem = TestUtils.findRenderedDOMComponentWithClass(
      element, className
    );

    expect(elem).to.exist;
  });
});

class Wrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return React.createElement('div', this.props);
  }
}
