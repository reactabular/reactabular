[![Join the chat at https://gitter.im/bebraw/reactabular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bebraw/reactabular) [![build status](https://secure.travis-ci.org/bebraw/reactabular.png)](http://travis-ci.org/bebraw/reactabular) [![bitHound Score](https://www.bithound.io/github/bebraw/reactabular/badges/score.svg)](https://www.bithound.io/github/bebraw/reactabular) [![Dependency Status](https://david-dm.org/bebraw/reactabular.svg)](https://david-dm.org/bebraw/reactabular)
# Reactabular - Spectacular tables for React.js

Reactabular has been designed to be extensible. Rather than implementing a lot of functionality in its core, it provides extension points. You can, for instance, customize rendering on cell level. It is possible to implement functionality, such as search, pagination, sorting, and inline editing, through composition. The library includes a variety of utilities for this even though you may use third party ones as well.

By default Reactabular operates using a column and a data definition. It doesn't care where those come from. It just renders the table for you. This means Reactabular will fit right into your current data architecture. It doesn't constrain it in any manner.

The chosen approach pushes a lot of complexity out of the core. As a result it might take more code to achieve certain functionalities. This is the price of flexibility. And that's the primary design goal of Reactabular.

## Documentation

See `docs/`.

## Development

```bash
npm install
npm start
open http://localhost:8080
```

Now edit `demos/app.js`.

Your changes will appear without reloading the browser like in [this video](http://vimeo.com/100010922).

## Contributors

* [Brian Chang](https://github.com/eviltoylet) - Fixed README formatting examples. Improved `column.cell` architecture. Helped to improve and design `cell` API.
* [Antoine Verger](https://github.com/antoineverger) - Allow editor text inputs to be erased correctly
* [Daan Nijkamp](https://github.com/daannijkamp) - Fixed README search example.
* [Utku Demir](https://github.com/utdemir) - Helped to ideate row API.
* [Andrea de la Isla](https://github.com/nuragic) - Made search algorithm stable and allowed header to be customized.
* [cameron](https://github.com/cameront) - Helped to render nested properties through cells.
* [Igor Kaplounenko](https://github.com/megawidget) - Allowed `rowKey` to be set.
* [BJR Matos](https://github.com/bjrmatos) - Restored Node 0.10 support.
* [Sitian Liu](https://github.com/goldensunliu) - Fixed header definition documentation.
* [Eugene Cheung](https://github.com/arkon) - Fixed object protocol example at documentation.
* [Johnson Liang](https://github.com/MrOrz) - Cleaned up cell prop/value merging and made it work correctly if only cell functions are provided. Fixed formatter logic for falsy values.
* [Jeff Sanchez](https://github.com/JeffSanchez) - Added support for multi-column sorting.

## Acknowledgments

Based on [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate) (MIT) by Dan Abramov.

## License

MIT. See LICENSE for details.
