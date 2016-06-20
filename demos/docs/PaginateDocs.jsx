/* eslint-disable max-len */
import React from 'react';
import { Page } from 'catalog';

export default () => (
  <Page>
    <p>
      Reactabular doesn't come with pagination. Instead you can use an external library, such as <a href="https://github.com/bebraw/react-pagify">react-pagify</a>, for this purpose. Just like with sorting or search, you will have to process your data through a paginator algorithm. See the FullTable example for further information.
    </p>
  </Page>
);
