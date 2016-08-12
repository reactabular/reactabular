/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { dropdown } from '../src';

describe('edit.dropdown', function () {
  it('renders given options', function () {
    const options = [
      {
        value: 'name',
        name: 'Name'
      },
      {
        value: 'position',
        name: 'Position'
      },
      {
        value: 'age',
        name: 'Age'
      }
    ];
    const Dropdown = dropdown({ options });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Dropdown value="name" onValue={() => {}} />
      </Wrapper>
    );

    const renderedOptions = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'option'
    );

    expect(renderedOptions.length).to.equal(options.length);
    expect(renderedOptions[0].text).to.equal(options[0].name);
    expect(renderedOptions[0].value).to.equal(options[0].value);
  });

  it('triggers onValue', function () {
    let changedValue = false;
    const options = [
      {
        value: 'name',
        name: 'Name'
      }
    ];
    const Dropdown = dropdown({ options });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Dropdown
          value="name"
          onValue={() => {
            changedValue = true;
          }}
        />
      </Wrapper>
    );

    const renderedOptions = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'option'
    );

    TestUtils.Simulate.change(renderedOptions[0]);

    expect(changedValue).to.equal(true);
  });

  it('allows customizing fields', function () {
    const options = [
      {
        value: 'name',
        name: 'Name'
      },
      {
        value: 'position',
        name: 'Position'
      },
      {
        value: 'age',
        name: 'Age'
      }
    ];
    const Dropdown = dropdown({
      options,
      fields: {
        name: 'value',
        value: 'name'
      }
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

  it('accepts custom props', function () {
    const options = [
      {
        value: 'name',
        name: 'Name'
      }
    ];
    const testClassName = 'demo';
    const Dropdown = dropdown({
      options,
      props: { className: testClassName }
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Dropdown value={'name'} onValue={() => {}} />
      </Wrapper>
    );

    const renderedSelect = TestUtils.findRenderedDOMComponentWithTag(
      result, 'select'
    );

    expect(renderedSelect.className).to.equal(testClassName);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
