import { expect } from 'chai';
import { edit } from '../src';

describe('edit.edit', function () {
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
