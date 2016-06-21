/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { editors } from '../../src';
import { expect } from 'chai';

const input = editors.input;

describe('Input', function () {
  it('should render given value', function () {
    const testValue = 'name';
    const Input = input();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input value={testValue} onValue={() => {}} />
      </Wrapper>
    );

    const renderedInput = TestUtils.findRenderedDOMComponentWithTag(
      result, 'input'
    );

    expect(renderedInput.value).to.equal(testValue);
  });

  it('should trigger onValue onBlur', function () {
    let changedValue = false;
    const Input = input();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input
          value="name"
          onValue={function () {
            changedValue = true;
          }}
        />
      </Wrapper>
    );

    const renderedInput = TestUtils.findRenderedDOMComponentWithTag(
      result, 'input'
    );
    renderedInput.value = 'foobar';

    TestUtils.Simulate.blur(renderedInput);

    expect(changedValue).to.equal(true);
  });

  it('should trigger onValue onEnter', function () {
    let changedValue = false;
    const Input = input();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input
          value="name"
          onValue={function () {
            changedValue = true;
          }}
        />
      </Wrapper>
    );

    const renderedInput = TestUtils.findRenderedDOMComponentWithTag(
      result, 'input'
    );
    renderedInput.value = 'foobar';

    TestUtils.Simulate.keyUp(renderedInput, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(changedValue).to.equal(true);
  });

  it('should accept custom props', function () {
    const testClassName = 'demo';
    const Input = input({
      props: { className: testClassName },
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input value={'name'} onValue={() => {}} />
      </Wrapper>
    );

    const renderedInput = TestUtils.findRenderedDOMComponentWithTag(
      result, 'input'
    );

    expect(renderedInput.className).to.equal(testClassName);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
