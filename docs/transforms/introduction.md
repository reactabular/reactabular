**Transforms** allow you to inject `propTypes` to the current cell. They work with both `header` and `cell` at a column definition. If a transform returns `children` prop, then the returned elements will override the render result. This allows you to implement functionality like inline editing.

The API looks like this:

* `header.transforms = [(<label>, { rowData: <label>, column: <column>, columnIndex: <number> }) => ({... props ...})]`
* `cell.transforms = [(<value>, { rowData: <object>, property: <string>, column: <column>, columnIndex: <number> }) => ({... props ...})]`

Transforms are evaluated from right to left. The values they return are [deep merged](https://lodash.com/docs#merge). `className`s are concatenated together. This means the leftmost value will win.

## Transforms as Formatters

It is possible to convert a transform as a formatter (a React component) if it implements a `toFormatter()` method. This provides extra flexibility and allows you to use a transform within `format` configuration.

**Example:**

```code
lang: jsx
---
...
import { transforms } from 'reactabular';

...
header: {
  label: 'Position',
  format: (name, extraParameters) => (
    <div style={{ display: 'inline' }}>
      <span>{name}</span>
      {sortable().toFormatter(name, extraParameters)}
    </div>
  )
},
```
