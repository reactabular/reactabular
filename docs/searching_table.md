# Searching a Table

`Reactabular` comes with a two pre-built search helpers that can be hooked up to your table.

## Components

### Option 1: Searching all (or one) field dropdown + input

```javascript
var Search = require('reactabular').Search;
```

This component lives outside your table and returns results that match the query in any of the columns, or if set, in a single column.

#### Usage
```javascript
    ...
    return (
        <div>
            <div className='search-container'>
                Search <Search columns={columns} data={this.state.data} onChange={this.onSearch} />
            </div>
            <Table columns={columns} data={this.state.search.data} rowKey={'id'} />
            ...
        </div>
    );
```


### Option 2: A search field for each column
```javascript
var Search = require('reactabular').SearchMultiple;
```

This component is generally positioned in the header of the table and allows users to filter by individual columns.

#### Usage
```javascript
    columnFilters() {
        var headerConfig = this.state.header;
        var columns = this.state.columns;
        return (
            <thead>
                <ColumnNames config={headerConfig} columns={columns} />
                <ColumnFilters columns={columns} onChange={this.onSearch} />
            </thead>
        );
    },
    ...
    render() {
        ...
        return (
            <div>
                <Table columns={columns} data={this.state.search.data} columnNames={this.columnFilters} rowKey={'id'} />
                ...
            </div>
        );
    }

```


## Handling search results

A column becomes searchable when it has a unique 'property' property for each column.
In the following example, the __Followers__ and __Tweets__ columns are searchable but __Actions__ is not.
```javascript
var columns = [
    {
        property: 'followers',
        header: 'Followers',
    },
    {
        property: 'tweets',
        header: 'Tweets',
    },
    {
        // This column is NOT searched because it has no 'property' property
        header: 'Actions',
    }
];
```

Here is an example of handling a search callback:
```javascript
The search filter can 
getInitialState() {
    return {
        search: {
            filter: {}
        },
    };
}

onSearch(filter) {
    this.setState({
        search: { filter }
    });
},
```

In your `render` method, you could do something like the following:

```javascript
render() {
    var data = this.state.data;

    if (this.state.search.filter) {
        // Apply the filter(s) to the data
        // Alternatively you could hit a backend `onChange` method,
        // or push this part elsewhere depending on your needs
        data = Search.search(
            data,
            columns,
            this.state.search.filter,
        );
    }

    return (...);
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
    var { filter } = this.state.search;
    
    // To highlight all matches based on a single filter (e.g. when using the search dropdown)
    return Search.matches(column, value, filter[Object.keys(filter).pop()]);
    
    // To highlight matches only in the searched column
    return Search.matches(column, value, this.state.search.filter[column]);
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
