/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { edit as _edit } from '../src';
import { expect } from 'chai';

const { boolean, dropdown, input, edit } = _edit;

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
          onValue={() => {
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
          onValue={() => {
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
          onValue={v => {
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

describe('edit', function () {
  it('activates editing', function () {
    const testProperty = 'test';
    let receivedProperty;
    const editor = edit({
      isEditing() {},
      onActivate({ property }) {
        receivedProperty = property;
      },
      onValue() {}
    });
    const result = editor('div')('foo', {
      rowData: {},
      property: testProperty
    });

    result.onClick();

    expect(receivedProperty).to.equal(testProperty);
  });

  it('returns an editor', function () {
    const editor = edit({
      isEditing() {
        return true;
      },
      onActivate: () => {},
      onValue: () => {}
    });
    const value = 'foo';
    const editorElement = 'div';
    const result = editor(editorElement)(value, {
      rowData: {},
      property: 'foo'
    });

    expect(result.children.type).to.equal(editorElement);
    expect(result.children.props.value).to.equal(value);
  });

  it('passes onValue to an editor', function () {
    let receivedValue;
    let receivedProperty;
    const editor = edit({
      isEditing() {
        return true;
      },
      onActivate() {},
      onValue({ value, property }) {
        receivedValue = value;
        receivedProperty = property;
      }
    });
    const editorProperty = 'foo';
    const editorValue = 'foobar';
    const result = editor('div')('foo', {
      rowData: {},
      property: editorProperty
    });

    result.children.props.onValue(editorValue);

    expect(receivedValue).to.equal(editorValue);
    expect(receivedProperty).to.equal(editorProperty);
  });

  it('allows value passed to edit to be shaped', function () {
    let receivedValue;
    let receivedProperty;
    const editor = edit({
      isEditing() {
        return true;
      },
      onActivate() {},
      onValue({ value, property }) {
        receivedValue = value;
        receivedProperty = property;
      },
      getEditValue: v => v.value
    });
    const editorProperty = 'foo';
    const editorValue = 'foobar';
    const result = editor('div')({ value: editorValue }, {
      rowData: {},
      property: editorProperty
    });

    result.children.props.onValue(editorValue);

    expect(receivedValue).to.equal(editorValue);
    expect(receivedProperty).to.equal(editorProperty);
  });

  it('throws an error if isEditing is not passed', function () {
    expect(edit.bind(null, {
      onActivate: () => {},
      onValue: () => {}
    })).to.throw(Error);
  });

  it('throws an error if onActivate is not passed', function () {
    expect(edit.bind(null, {
      isEditing: () => {},
      onValue: () => {}
    })).to.throw(Error);
  });

  it('throws an error if onValue is not passed', function () {
    expect(edit.bind(null, {
      isEditing: () => {},
      onActivate: () => {}
    })).to.throw(Error);
  });

  it('throws an error if editor is not passed', function () {
    expect(edit({
      isEditing: () => {},
      onActivate: () => {},
      onValue: () => {}
    }).bind(null)).to.throw(Error);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}
