/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { editors } from '../src';
import { expect } from 'chai';

const { boolean, dropdown, input } = editors;

describe('Boolean', function () {
  it('renders given value', function () {
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

  it('triggers onValue when value is false', function () {
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

  it('triggers onValue when value is true', function () {
    let changedValue = false;
    const Boolean = boolean();
    const result = TestUtils.renderIntoDocument(
      <Wrapper>
        <Boolean
          value
          onValue={function () {
            changedValue = false;
          }}
        />
      </Wrapper>
    );

    const renderedButtons = TestUtils.scryRenderedDOMComponentsWithTag(
      result, 'button'
    );

    TestUtils.Simulate.click(renderedButtons[1]);

    expect(changedValue).to.equal(false);
  });

  it('accepts custom props', function () {
    const testClassName = 'demo';
    const Boolean = boolean({
      props: { className: testClassName }
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

describe('Dropdown', function () {
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
          onValue={function () {
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

describe('Input', function () {
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

  it('triggers onValue onEnter', function () {
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
      which: 13
    });

    expect(changedValue).to.equal(true);
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
