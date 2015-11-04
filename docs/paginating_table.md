# Paginating a Table

The library doesn't come with pagination. Instead you can use an external library, such as [react-pagify](https://github.com/bebraw/react-pagify), for this purpose. Here's a brief example on how to set it up with Reactabular:

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
render() {
    var data = this.state.data;
    var pagination = this.state.pagination;

    if (this.state.search.query) {
        ... // search logic
    }

    var paginated = Paginator.paginate(data, pagination);

    return (
        <div>
            <div className='per-page-container'>
                Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
            </div>

            ...

            <div className='pagination'>
                <Paginator
                    page={paginated.page}
                    pages={paginated.amount}
                    beginPages={3}
                    endPages={3}
                    onSelect={this.onSelect}></Paginator>
            </div>
        </div>
    );
}
```

In addition we need to change `Table` `data` field to point at `paginated.data` like this:

```jsx
<Table columns={columns} data={paginated.data} />
```

After these steps we should have pagination in our table. Pagination is simply a filtering step on data.
