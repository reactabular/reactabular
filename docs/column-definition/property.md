Root level `property` allows you to map a data property to a column. It maps a field from `rows` into something you can display to the user.

**Example:**

```javascript
{
  property: 'name'
}
```

If you want nested definitions (i.e., `foo.bar.baz`), then you should `resolve` your rows before passing it to the table.
