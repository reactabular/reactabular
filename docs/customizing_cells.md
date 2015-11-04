# Customizing Cells

Reactabular's cell interface is useful when you need to alter cell output formatting or attach interactive functionality to them. The interface is quite versatile and supports the following variants:

```javascript
// return a value, modify it somehow etc.
cell: (v) => v,

// return jsx
cell: (active) => active && <span>&#10003;</span>,

// return value and props
// props will be attached to td itself
cell: (v) => {
    value: v,
    props: {
        onClick: () => alert('hello world');
    }
},

// return jsx as value
cell: (v) => {
    value: <span>Content goes here</span>
    // props are optional
}
```

If you return JSX as value, it will override any other operation possibly after it. This is handy for implementing blocking features, such as inline editors. Once the editor is done, restore state so that it will return the possible new value and you are done.

## Delete Example

If you wanted to implement deletion to a cell, you could do something like this:

```javascript
{
    cell: (value, data, rowIndex, property) => {
        var remove = () => {
            // this could go through flux etc.
            var idx = findIndex(this.state.data, {
                id: celldata[rowIndex].id,
            });

            this.state.data.splice(idx, 1);

            this.setState({
                data: this.state.data
            });
        };

        return {
            value: <span>
                <span onClick={remove.bind(this)} style={{cursor: 'pointer'}}>&#10007;</span>
            </span>
        };
    },
},
```

It would be possible to add a confirmation there etc. but you get the idea. Besides the property and current value, the cell handler gets the row and column indices. That information can then be used to get rid of the row and update the state. You can also use the combination of indices to keep track of state per cell.

See `demos/full_table.jsx` to see the approach in practice.
