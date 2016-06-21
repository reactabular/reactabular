/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { editors } from '../../src';
import { expect } from 'chai';

const dropdown = editors.dropdown;

describe('Dropdown', function () {
  it('should render given options', function () {
    const options = [
      {
        value: 'name',
        name: 'Name',
      },
      {
        value: 'position',
        name: 'Position',
      },
      {
        value: 'age',
        name: 'Age',
      },
    ];
    const Dropdown = dropdown(options);
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Dropdown value={'name'} onValue={() => {}} />
      </Wrapper>
    );

    const renderedOptions = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'option'
    );

    expect(renderedOptions.length).to.equal(options.length);
    expect(renderedOptions[0].text).to.equal(options[0].name);
    expect(renderedOptions[0].value).to.equal(options[0].value);
  });

  it('should allow customizing fields', function () {
    const options = [
      {
        value: 'name',
        name: 'Name',
      },
      {
        value: 'position',
        name: 'Position',
      },
      {
        value: 'age',
        name: 'Age',
      },
    ];
    const Dropdown = dropdown(options, {
      name: 'value',
      value: 'name',
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Dropdown value={'name'} onValue={() => {}} />
      </Wrapper>
    );

    const renderedOptions = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'option'
    );

    expect(renderedOptions.length).to.equal(options.length);
    expect(renderedOptions[0].text).to.equal(options[0].value);
    expect(renderedOptions[0].value).to.equal(options[0].name);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
