import range from 'lodash/range';
import jsf from 'json-schema-faker';

export default (amount, schema) => range(amount).map(() => jsf(schema));
