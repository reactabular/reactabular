It is possible to convert a transform as a formatter (a React component) if it implements a `toFormatter()` method. This provides extra flexibility and allows you to use a transform within `format` configuration. You can also pass custom `props` here to customize the resulting component further.

**Example:**

```code
lang: jsx
---
...
import { transforms } from 'reactabular';

...
header: {
  label: 'Position',
  format: name => (
    <div style={{ display: 'inline' }}>
      <span>{name}</span>
      {sortable().toFormatter({ props: { className: 'demo' } })}
    </div>
  )
},
```
