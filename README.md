[![build status](https://secure.travis-ci.org/bebraw/reactabular.png)](http://travis-ci.org/bebraw/reactabular)
# Reactabular - Spectacular tables for React.js

Reactabular has been designed to make it easier to build tables on top of React.js. The core has been kept simple while allowing you to extend it as needed. You can customize rendering on cell level and adjust the way data is sorted. This way you can implement basic functionalities such as search, pagination, sorting, inline editing and so on.

The library can work with either fixed data loaded once or you can hook it into a backend through a method of your choosing. For instance it works well with various Flux approaches. The table simply consumes the data from store which you then adjust using various actions.

The chosen approach means it might take more code to achieve certain goals. This gives you a degree of freedom while keeping the core easier to maintain.

## Basic Table

The examples below assume we are operating on data like this:

```javascript
var data = [
    {
        name: 'React.js',
        type: 'library',
        description: 'Awesome library for handling view.',
        followers: 23252,
        worksWithReactabular: true,
    },
    {
        name: 'Angular.js',
        type: 'framework',
        description: 'Swiss-knife of frameworks. Kitchen sink not included.',
        followers: 35159,
        worksWithReactabular: false,
    },
    {
        name: 'Aurelia',
        type: 'framework',
        description: 'Framework for the next generation.',
        followers: 229,
        worksWithReactabular: false,
    },
];
```

Reactabular expects a list of objects and then maps them to table cells using some configuration. In this case I've attached ids for each entry. That will come in handy for operations such as edit and delete.

Another thing we are going to need is column definition. Here's a basic example:

```javascript
var columns = [
    {
        property: 'name',
        header: 'Name',
    },
    {
        property: 'type',
        header: 'Type',
    },
    {
        property: 'description',
        header: 'Description',
    },
    {
        property: 'followers',
        header: 'Followers',
        // accuracy per hundred is enough for demoing
        cell: (followers) => followers - (followers % 100),
    },
    {
        property: 'worksWithReactabular',
        header: '1st Class Reactabular',
        // render utf ok if works
        cell: (works) => works && <span>&#10003;</span>,
    },
];
```

We simply define an ordering for our columns, tell the library what property to bind and what to display at header. You could inject internationalized strings there for instance.

I've attached custom formatting for `followers` and `worksWithReactabular` fields. `cell` property gives you access to rendering and works as an extension point. I'll show you later how to build inline editor, search highlighting and so on using it. For now we just take the value, tweak it a little bit and let Reactabular worry about rendering.

Finally to get some table to show up we should render it through Reactabular. Here's the minimum you can get by with:

```javascript
var Table = require('reactabular').Table;

...

<Table columns={columns} data={data} />
```

## Searching a Table

`Reactabular` comes with a search helper that can be hooked up. See below:

```javascript
var Search = require('reactabular').Search;

...


var columns: [
    ...
    {
        property: 'followers',
        header: 'Followers',
        // accuracy per hundred is enough for demoing
        cell: (followers) => followers - (followers % 100),
        // search targets values by default. we can customize
        // it by providing a custom data formatter to it to get
        // matches you might expect
        search: (followers) => followers - (followers % 100),
    },
    ...
];

...

getInitialState() {
    return {
        ...
        // Search `onChange` will emit a structure like this
        search: {
            query: '',
            column: '',
        },
        ...
    };
}
```

Then at your `render` you could do:

```jsx
var searchData = Search.search(
    this.state.search,
    this.state.columns,
    this.state.data
);

<div className='search-container'>
    Search <Search columns={columns} onChange={this.setState.bind(this)}></Search>
</div>
<Table data={searchData} />
```

`onChange` will update `search` data. It will then be used to filter the data using `Search.search`. You can replace `onChange` handler with something more custom and skip filtering like this altogether if you are dealing with a backend.

## Highlighting Search Results

We can highlight individual search results by using a premade `highlight` helper. Here's a demo:

```javascript
var highlight = Search.highlight(() => this.state.search.query);

...
var columns: [
    ...
    {
        property: 'followers',
        header: 'Followers',
        cell: [(followers) => followers - (followers % 100), highlight],
        search: (followers) => followers - (followers % 100),
    },
    ...
];
```

We just pipe the formatted cell to `highlight` helper which then figures out what part of the search result hit it, if it hit altogether. If there's a match, it will emit

```jsx
<span className='search-result'>
    <span className='highlight'>{match}</span>
    <span className='rest'>{rest}</span>
</span>
```

Style as you like.

## Paginating a Table

The next natural step could be implementing a pagination for our table. We could add two separately controls for that. One to display amount of items per page and one to control the current page. This will take some additional wiring.

The library doesn't come with pagination. Instead you can use an external library, such as [react-pagify](https://github.com/bebraw/react-pagify), for this purpose. Here's a brief example on how to set it up with `reactabular`:

```javascript
var Paginator = require('react-pagify');

require('react-pagify/style.css');

...

// state
pagination: {
    page: 0,
    perPage: 10
},

// handlers
onSelect(page) {
    var pagination = this.state.pagination || {};

    pagination.page = page;

    this.setState({
        pagination: pagination
    });
},

onPerPage(e) {
    var pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
        pagination: pagination
    });
},
```

You could push some of that into a mixin or a higher order component to decrease the amount of code in your components.

```jsx
<div className='per-page-container'>
    Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
</div>

...

<div className='pagination'>
    <Paginator
        page={paginated.page}
        pages={paginated.amount}
        beginPages='3'
        endPages='3'
        onSelect={this.onSelect}></Paginator>
</div>
```

In addition we need to change `Table` `data` field to point at `paginated.data` like this:

```jsx
<Table columns={columns} data={paginated.data} />
```

After these steps we should have pagination in our table. Pagination is simply a filtering step on data.

We are still missing one basic feature - sorting. We'll implement that next.

## Sorting a Table

Reactabular comes with a little helper to make this task easier. It is possible to replace the provided sorter with something more advanced. Here's the basic idea:

```javascript
var sortColumn = require('reactabular').sortColumn;

...

var header = {
    onClick: (column) => {
        sortColumn(
            this.state.columns,
            column,
            this.state.data,
            this.setState.bind(this)
        );
    },
};
```

In addition we need to provide `header` to our `Table` like this:

```jsx
<Table columns={columns} data={paginated.data} header={header} />
```

After that it should be possible to sort table content by hitting various column names at header. `sortColumn` sets either `sort-asc` or `sort-desc` class for currently active header column. This allows some degree of styling.

You can get something basic looking by utilizing `./style.css`. In Webpack you can import it to your project using `require('reactabular/style.css')` provided you have appropriate loaders set up.

> `header` key-value pairs will be applied as attributes to `th`'s. If you have an event handler (ie. something starting with `on`), the first parameter provided will be the column in question. The second one will be React event.

## Adding a Custom Column

It might be fun if it was possible to delete table entries directly. We can define custom column with a delete button for this purpose. A definition such as follows should work:

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

## Adding a Custom Footer

Adding a custom footer for our table is simple. Just write the definition inside `Table` itself. In this particular case it's not very useful but you could easily generate things like sums and such here.

```jsx
<Table columns={columns} header={header} data={paginated.data}>
    <tfoot>
        <tr>
            <td>
                You could show sums etc. here in the customizable footer.
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tfoot>
</Table>
```

## Inline Editing a Table

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
            editor: editors.input(),
        }),
        (estimatedValue) => parseFloat(estimatedValue).toFixed(2)
    ],
},
```

The simplest way would be just to provide an editor to a cell directly. In this case we take the approach further and combine it with custom formatting. As you can see, `cell` accepts a list of functions. If the editor gets triggered, it will override any possible formatting after it in the rendering queue.

The library comes with a couple of basic editors. As long as you follow the same interface (`value`, `onValue` properties), your editor should just work with the system.

## Implementing Custom Cell Operations

So far you have actually implemented a few custom cell operations already. There are a few basic ways to do these:

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

## Development

```bash
npm install
npm start
open http://localhost:3000
```

Now edit `demos/app.js`.

Your changes will appear without reloading the browser like in [this video](http://vimeo.com/100010922).

## Contributing

0. Open an issue to discuss the feature you want to implement or need. This will help us to figure out how to fit it in and will avoid unnecessary work on your part.
1. Implement whatever you want and write tests
2. Make sure `npm test` passes. This will run your tests and lint the code.
3. Once you are happy with the code, add yourself to project contributors (below).
4. Create a PR

## Contributors

* [Brian Chang](https://github.com/eviltoylet) - Fixed README formatting examples. Improved `column.cell` architecture. Helped to improve and design `cell` API.

## Acknowledgments

Based on [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate) (MIT) by Dan Abramov.

## License

MIT. See LICENSE for details.
