/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { input } from '../src';

describe('edit.input', function () {
  it('renders given value', function () {
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

  it('triggers onValue onBlur', function () {
    let changedValue = false;
    const Input = input();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input
          value="name"
          onValue={() => {
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

  it('triggers onValue onEnter', function () {
    let changedValue = false;
    const Input = input();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input
          value="name"
          onValue={() => {
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
      which: 13
    });

    expect(changedValue).to.equal(true);
  });

  it('returns a number if passed value was a number', function () {
    const newValue = 321;
    let receivedValue;
    const Input = input();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Input
          value={123}
          onValue={(v) => {
            receivedValue = v;
          }}
        />
      </Wrapper>
    );

    const renderedInput = TestUtils.findRenderedDOMComponentWithTag(
      result, 'input'
    );
    renderedInput.value = newValue;

    TestUtils.Simulate.keyUp(renderedInput, {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });

    expect(receivedValue).to.equal(newValue);
  });


  it('accepts custom props', function () {
    const testClassName = 'demo';
    const Input = input({
      props: { className: testClassName }
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
