`reactabular-column-extensions` provide syntax extensions for Reactabular column definition. Instead of typing out import and the related code, this takes some of that work away. You still have to connect the data processing portion, though.

## API

The API provides a **bind** function that merges the given **extensions** together with the provided column definition.

```javascript
import * as extensions from 'reactabular-column-extensions';

// Or you can cherry-pick
import { bind } from 'sortabular';
import { bind as bindExtensions } from 'sortabular';
```

### Binding

**`extensions.bind([<extension>]) => ([<column>]) => [<adjusted column>]`**

The binder accepts an array of extensions and a column definition. It adjusts the columns based on this information and merges the configuration emitted by extensions top to bottom.

An extension has to be an object like this:

```javascript
{
  match(column) {
    // If a column has `demo` property set, evaluate and merge
    return column.demo;
  },
  evaluate(column) {
    // Emit a structure to attach to the column definition
    return {
      demo: true
    }
  }
}
```

> If you want to implement a custom extension, you can wrap the object to a function and set defaults there.

### Extensions

**`extensions.draggableHeader({ onMoveColumns: <function> }) => <extension>`**

`draggableHeader` injects the configuration expected by `reactabular-dnd` if `header.draggable` is set. You still have to configure the rest, though.

**`extensions.highlightCell() => <extension>`**

`highlightCell` injects the configuration expected by highlighting functionality from `searchtabular` if `cell.highlight` is set. You have to connect the highlighting logic with your data processing to make this work.

**`extensions.resizableHeader({ window, onDragColumnStart, onDragColumn, onDragColumnEnd, props }) => <extension>`**

`resizableHeader` injects the configuration required for resizable headers if `header.resizable` is set. It accepts `window` so you can make resizing work in an iframe. Most often you don't need to touch the parameter, though. You should define `onDragColumn(width, { column }` handler and deal with the new width there. `reactabular-resizable` can be useful for that purpose. `props` allow you to inject custom styling/props to `resizable.column`.

**`extensions.sortableHeader({ sortingColumns, onSort, props, strategy }) => <extension>`**

`sortableHeader` is a light wrapper to `sortabular` that gets injected if `header.sortable` is set. It sets logic and user interface needed for altering sorting state. It also injects sort reset transform. `sortingColumns`, `onSort(sortingColumns)`, `props`, and `strategy` follow `sortabular` interface. `props` allow you to customize styling/props of `sortabular.sort`.

**`extensions.toggleChildrenCell({ idField, parentField, onToggleShowingChildren, props, rows }) => <extension>`**

`toggleChildrenCell` gets injected if `cell.toggleChildren` is set. It has been designed to work with nested tree data of `treetabular`. It allows you to customize tree `idField` and `parentField`. In addition you have to define what happens when children are toggled using `onToggleShowingChildren(rowIndex)`. If you want to customize `treetabular.toggleChildren`, you can pass `props` to it. The extension also expects you to pass the rows of your application to it.

## Column Extension Example

The example below shows how the transformation works.

**Example:**

```jsx
/*
import * as extensions from 'reactabular-column-extensions';
*/

const columns = [
  {
    property: 'color',
    header: {
      label: 'Color',
      draggable: true
    }
  },
  {
    property: 'name',
    header: {
      label: 'Name'
    },
    cell: {
      highlight: true
    }
  }
];

const extendedColumns = extensions.bind([
  extensions.draggableHeader({
    onMoveColumns: () => ({})
  }),
  extensions.highlightCell()
])(columns);

<ul>{
  (extendedColumns).map((d, i) =>
    <li key={`value-${i}`}>{JSON.stringify(d, null, 2)}</li>
  )
}</ul>
```
