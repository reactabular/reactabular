Root level `props` allows you to attach props to all header and content cells. The `props` injected by more specific configuration can override these:

**Example:**

```code
lang: js
---
{
  props: {
    style: {
      width: 100
    }
  },
  ...
}
```
