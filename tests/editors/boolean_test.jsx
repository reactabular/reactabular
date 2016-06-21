/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { editors } from '../../src';
import { expect } from 'chai';

const boolean = editors.boolean;

describe('Boolean', function () {
  it('should render given value', function () {
    const testValue = false;
    const Boolean = boolean();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Boolean value={testValue} onValue={() => {}} />
      </Wrapper>
    );

    const renderedButtons = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'button'
    );

    expect(renderedButtons.length).to.equal(2);
    expect(renderedButtons[0].disabled).to.equal(testValue);
    expect(renderedButtons[1].disabled).to.equal(!testValue);
  });

  it('should trigger onValue', function () {
    let changedValue = false;
    const Boolean = boolean();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Boolean
          value={false}
          onValue={function () {
            changedValue = true;
          }}
        />
      </Wrapper>
    );

    const renderedButtons = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'button'
    );

    TestUtils.Simulate.click(renderedButtons[0]);

    expect(changedValue).to.equal(true);
  });

  it('should accept custom props', function () {
    const testClassName = 'demo';
    const Boolean = boolean({
      props: { className: testClassName },
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Boolean value={'name'} onValue={() => {}} />
      </Wrapper>
    );

    const renderedDiv = TestUtils.findRenderedDOMComponentWithClass(
      result, testClassName
    );

    expect(renderedDiv).to.exist;
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
