The `header` portion supports `label`, `transforms` and `formatters` fields.

## **`header.label = <string>`**

`label` is the most essential as it describes the value displayed to the user. This should be a string. For example search options are populated based on this.

**Example:**

```javascript
{
  header: {
    label: 'Name'
  }
}
```

Given you might want to attach custom functionality to a header, say sorting on click, it is possible to attach specific *transforms* to the header cell. The same idea works for table cells.

## **`header.transforms`**

```javascript
header.transforms = [
  (<label>, {
    columnIndex: <number>,
    column: <object>
  }
) => ({... props ...})]
```

A transform is expected to return an object containing props. We can for instance inject `onClick` handler and perform sorting based on that. If a transform returns `children`, it will override rendering behavior making it possible to implement editors.

The idea of transforms is that they can inject `propTypes` to the current cell (same idea for header and content). In this case we inject `onClick` handler so that sorting works. If a transform returns `children`, it will override rendering behavior. This is useful for transforms like `edit`.

**Example:**

```javascript
{
  header: {
    label: 'Name',
    transforms: [sortable]
  }
}
```

To give you a concrete example of overriding, consider the example below:

```javascript
{
  header: {
    label: 'Name',
    transforms: [
      () => ({
        children: <span>override to show instead of value</span>
      })
    ]
  }
}
```

## **`header.formatters = [label => <string|React element>]`**

If manipulating `propTypes` isn't enough, you can `format` the output. This should return something React can display. The result will be displayed **within** a table cell.

In the following example we use it to inject an extra checkbox to the header cell.

**Example:**

```javascript
{
  header: {
    label: 'Name',
    formatters: [
      name => (
        <div>
          <input
            type="checkbox"
            onClick={() => console.log('clicked')}
            style={{ width: '20px' }}
          />
          <span>{name}</span>
        </div>
      )
    ]
  }
}
```

## **`header.props = <object>`**

You can set header specific props through `props`.

**Example:**

```javascript
{
  header: {
    label: 'Name',
    props: {
      style: {
        width: 100
      }
    }
  }
}
```
