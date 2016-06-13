import generators from 'annogenerate';
import range from 'lodash/range';

import {properties2object} from 'schema2object';

export default function(o) {
  return range(o.amount).map(() =>
    properties2object({
      generators: generators,
      fieldGenerators: o.fieldGenerators,
      properties: o.properties
    })
  );
};
