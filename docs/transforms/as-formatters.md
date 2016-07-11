It is possible to convert a transform as a formatter (a React component) using `transforms.toFormatter`. It wraps a transform as a React component which you can use as a formatter then.

**Example:**

```code
lang: jsx
---
...
import { transforms } from 'reactabular';

...
header: {
  label: 'Position',
  format: (name, extra) => (
    <div style={{ display: 'inline' }}>
      <span>{name}</span>
      {toFormatter(
        sortable(name, extra, { className: 'demo' }),
        'span'
      )}
    </div>
  )
},
```
