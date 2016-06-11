# Customizing Rows

Sometimes you might want to apply some special props or logic per table row. This can be achieved easily through `row` prop like this:

```javascript
<Table
  row={(d, rowIndex) => {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
      onClick: () => console.log('clicked row', d)
    };
  }}
>
```

Simply return the props you want to add to each `tr`'s within `tbody`.
