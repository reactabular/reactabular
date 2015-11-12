# Table Definition

Reactabular expects a list of objects and then maps them to table cells using some configuration. A basic data definition could look like this:

```javascript
var data = [
    {
        name: 'React.js',
        type: 'library',
        description: 'Awesome library for handling view.',
        followers: 23252,
        worksWithReactabular: true,
        id: 123
    },
    {
        name: 'Angular.js',
        type: 'framework',
        description: 'Swiss-knife of frameworks. Kitchen sink not included.',
        followers: 35159,
        worksWithReactabular: false,
        id: 456
    },
    {
        name: 'Aurelia',
        type: 'framework',
        description: 'Framework for the next generation.',
        followers: 229,
        worksWithReactabular: false,
        id: 789
    },
];
```

Another thing we are going to need is a column definition. Here's a basic example:

```javascript
var cx = require('classnames');

var columns = [
    {
        property: 'name',
        header: 'Name',
        headerClass: cx({'name-column': true}), // custom props
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
