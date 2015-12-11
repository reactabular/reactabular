[![Join the chat at https://gitter.im/bebraw/reactabular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bebraw/reactabular) [![build status](https://secure.travis-ci.org/bebraw/reactabular.png)](http://travis-ci.org/bebraw/reactabular) [![bitHound Score](https://www.bithound.io/github/bebraw/reactabular/badges/score.svg)](https://www.bithound.io/github/bebraw/reactabular) [![Dependency Status](https://david-dm.org/bebraw/reactabular.svg)](https://david-dm.org/bebraw/reactabular)
# Reactabular - Spectacular tables for React.js

Reactabular has been designed to make it easier to build tables on top of React.js. The core has been kept simple while allowing you to extend it as needed. You can customize rendering on cell level and adjust the way data is sorted. This way you can implement basic functionalities such as search, pagination, sorting, inline editing and so on.

The library can work with either fixed data loaded once or you can hook it into a backend through a method of your choosing. For instance it works well with various Flux approaches. The table simply consumes the data from store which you then adjust using various actions.

The chosen approach means it might take more code to achieve certain goals. This gives you a degree of freedom while keeping the core easier to maintain.

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

## Acknowledgments

Based on [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate) (MIT) by Dan Abramov.

## License

MIT. See LICENSE for details.
