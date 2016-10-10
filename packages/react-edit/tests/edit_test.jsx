/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { edit } from '../src';

describe('edit.edit', function () {
  it('activates editing', function () {
    const testClassName = 'demo';
    const testProperty = 'test';
    let receivedProperty;
    const editor = edit({
      isEditing() {},
      onActivate({ property }) {
        receivedProperty = property;
      },
      onValue() {}
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{
        React.createElement(
          'div',
          editor('div')('foo', {
            rowData: {},
            property: testProperty
          }, {
            className: testClassName
          })
        )
      }</Wrapper>
    );

    const renderedEditor = TestUtils.findRenderedDOMComponentWithClass(
      result, testClassName
    );

    TestUtils.Simulate.click(renderedEditor);

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

  it('passes extraParameters to an editor', function () {
    const editor = edit({
      isEditing() {
        return true;
      },
      onActivate() {},
      onValue: () => {}
    });
    const rowValue = 'foo';
    const rowDataBar = 'baz';
    const editorElement = () => {
      const editorComponent = ({ value, onValue, extraParameters }) =>
        <div value={value} onValue={onValue} extra={extraParameters} />;
      return editorComponent;
    };
    const result = editor(editorElement)(rowValue, {
      rowData: { bar: rowDataBar },
      property: 'foo'
    });

    expect(result.children.props.value).to.equal(rowValue);
    expect(result.children.props.extraParameters.rowData.bar).to.equal(rowDataBar);
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

  it('allows value and onValue to be replaced', function () {
    const testValue = 'testValue';
    const testOnValue = 'testOnValue';
    const editor = edit({
      isEditing() {
        return true;
      },
      onActivate: () => {},
      onValue: () => {},
      editingProps: {
        value: testValue,
        onValue: testOnValue
      }
    });
    const value = 'foo';
    const editorElement = 'div';
    const result = editor(editorElement)(value, {
      rowData: {},
      property: 'foo'
    });

    expect(result.children.type).to.equal(editorElement);
    expect(result.children.props[testValue]).to.equal(value);
    expect(result.children.props[testOnValue]).to.exist;
  });

  it('allows activation event to be replaced', function () {
    const testEvent = 'onDoubleClick';
    const editor = edit({
      isEditing() {
        return false;
      },
      onActivate: () => {},
      onValue: () => {},
      activateEvent: testEvent
    });
    const value = 'foo';
    const result = editor('div')(value, {
      rowData: {},
      property: 'foo'
    });

    expect(result[testEvent]).to.exist;
  });

  it('onActivate gives access to event', function () {
    const testClassName = 'demo';
    let receivedEvent;
    const editor = edit({
      isEditing() {},
      onActivate({ event }) {
        receivedEvent = event;
      },
      onValue() {}
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{
        React.createElement(
          'div',
          editor('div')('foo', {
            rowData: {},
            property: 'test'
          }, {
            className: testClassName
          })
        )
      }</Wrapper>
    );

    const renderedEditor = TestUtils.findRenderedDOMComponentWithClass(
      result, testClassName
    );

    TestUtils.Simulate.click(renderedEditor);

    expect(receivedEvent.target.className).to.equal(testClassName);
  });

  it('accepts custom value callback', function () {
    const testValue = 'foo';
    const testClassName = 'demo';
    const editor = edit({
      isEditing() {},
      onActivate() {},
      onValue() {}
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{
        React.createElement(
          'div',
          editor('div', value => ({
            children: <div className={testClassName}>{value}</div>
          }))(testValue, {
            rowData: {},
            property: 'test'
          })
        )
      }</Wrapper>
    );

    const renderedValue = TestUtils.findRenderedDOMComponentWithClass(
      result, testClassName
    );

    expect(renderedValue.innerHTML).to.equal(testValue);
  });

  it('accepts custom value callback and allows editing to be activated', function () {
    const testValue = 'foo';
    const testClassValue = 'value';
    const testClassName = 'demo';
    let receivedEvent;
    const editor = edit({
      isEditing() {},
      onActivate({ event }) {
        receivedEvent = event;
      },
      onValue() {}
    });
    const result = TestUtils.renderIntoDocument(
      <Wrapper>{
        React.createElement(
          'div',
          {
            ...editor('div', value => ({
              children: <div className={testClassValue}>{value}</div>
            }))(testValue, {
              rowData: {},
              property: 'test'
            }),
            className: testClassName
          }
        )
      }</Wrapper>
    );

    const renderedValue = TestUtils.findRenderedDOMComponentWithClass(
      result, testClassValue
    );
    const renderedEditor = TestUtils.findRenderedDOMComponentWithClass(
      result, testClassName
    );

    TestUtils.Simulate.click(renderedEditor);

    expect(renderedValue.innerHTML).to.equal(testValue);
    expect(receivedEvent.target.className).to.equal(testClassName);
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
