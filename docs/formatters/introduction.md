Formatters provide means to customize Reactabular column definition through `header` and `cell`:

* `header.format = label => <string|React element>`
* `cell.format = value => <string|React element>`

As long as a formatter returns something that React can render, it will work. The results are rendered **inside** a table cell.

Reactabular provides a formatter to make it easier to highlight search results. It is a good example of a more complicated one.
