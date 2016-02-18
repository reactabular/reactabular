# Searching a Table

`Reactabular` comes with a search helper that can be hooked up. See below:

```javascript
var Search = require('reactabular').Search;

...


var columns = [
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
        search: {
            column: '',
            query: ''
        },
        ...
    };
}

...

onSearch(search) {
    this.setState({
        search: search
    });
},
```

Then at your `render` you could do:

```javascript
render() {
    var data = this.state.data;

    if (this.state.search.query) {
        // apply search to data
        // alternatively you could hit backend `onChange`
        // or push this part elsewhere depending on your needs
        data = Search.search(
            data,
            columns,
            this.state.search.column,
            this.state.search.query
        );
    }

    return (
        <div>
            <div className='search-container'>
                Search <Search columns={columns} data={this.state.data} onChange={this.onSearch} />
            </div>
            <Table columns={columns} data={this.state.search.data} rowKey={'id'} />
        ...
        </div>
    );
}
```

`onChange` will update `search` data. This data is then used for filtering table data before showing it. More functionality, such as sorting and pagination, may be added to this pipe as you will see in the subsequent sections.

You can deal with filtering in an entirely different manner. The method shown here works if you need to filter local data. You can easily replace the solution with something Flux based for instance. Just operate based on that `onChange` hook.

> IMPORTANT! It's preferable to set `rowKey`. It allows you to control React `key` per row leading to better performance. Object id works well for this for example.

## i18n

It's possible to i18n `Search` through `i18n` prop. It defaults to English if no translation is provided.

```javascript
<Search i18n={{all: 'Kaikki'}} ... />
```

## Highlighting Search Results

We can highlight individual search results by using a premade `highlight` helper. This helper takes advantage of the matches method on an instance of the Search component. Here's a demo:

```javascript
var highlight = require('reactabular/formatters/highlight');
var highlighter = (column) => highlight((value) => {
    return Search.matches(column, value, this.state.search.query);
});

...
var columns = [
    ...
    {
        property: 'followers',
        header: 'Followers',
        cell: [(followers) => followers - (followers % 100), highlighter('followers')],
        search: (followers) => followers - (followers % 100),
    },
    ...
];
```

We just pipe the formatted cell to `highlight` helper which then figures out what part of the search result hit it, if it hit altogether. If there's a match, it will emit a `span` with `class='highlight'`. For example, if the search term was 'oo' and
the data under evaluation 'noon moon', the following structure would be emitted:

```jsx
<span className='search-result'>
    <span>n</span>
    <span className='highlight'>oo</span>
    <span>n m</span>
    <span className='highlight'>oo</span>
    <span>n</span>
</span>
```

Style as you like.
