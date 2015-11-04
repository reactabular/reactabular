# Inline Editing a Table

As you noticed in the custom column section above, Reactabular provides access to table cell rendering. This approach can be used to provide inline editing for tables.

```javascript
var cells = require('reactabular').cells;
var editors = require('reactabular').editors;

...

// bind context at getInitialState, provide name of field where to store the index
// of edited cell and deal with received data
var editable = cells.edit.bind(this, 'editedCell', (value, celldata, rowIndex, property) => {
    var idx = findIndex(this.state.data, {
        id: celldata[rowIndex].id,
    });

    this.state.data[idx][property] = value;

    this.setState({
        data: data,
    });
});

...

{
    property: 'estimatedValue',
    header: 'Estimated value',
    cell: [
        editable({
            // editors.input() accepts custom attributes as an object
            // example {autoFocus: true}
            editor: editors.input(),
        }),
        (estimatedValue) => parseFloat(estimatedValue).toFixed(2)
    ],
},
```

The simplest way would be just to provide an editor to a cell directly. In this case we take the approach further and combine it with custom formatting. As you can see, `cell` accepts a list of functions. If the editor gets triggered, it will override any possible formatting after it in the rendering queue.

The library comes with a couple of basic editors. As long as you follow the same interface (`value`, `onValue` properties), your editor should just work with the system.
