import uuid from 'uuid';
import sample from 'lodash/sample';
import range from 'lodash/range';
import schema2object from 'schema2object';
import generators from 'annogenerate';

const generate = schema2object.properties2object;

export default (amount, { definitions, properties }) => range(amount).map(
  () => generate({
    generators,
    fieldGenerators: {
      id() {
        return uuid.v4();
      },
      boss() {
        return {
          name: this.name()
        };
      },
      name() {
        const forenames = ['Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
          'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia'];
        const surnames = ['MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill'];

        return `${sample(forenames)} ${sample(surnames)}`;
      },
      product() {
        const adjectives = ['Super', 'Hyper', 'Awesome', 'Lame', 'Standard'];
        const names = ['Apple', 'Pear', 'Strawberry', 'Pineapple', 'Potato', 'Tomato'];

        return `${sample(adjectives)} ${sample(names)}`;
      },
      position() {
        return sample(['Boss', 'Contractor', 'Client', '']);
      },
      salary: generators.number.bind(null, 0, 10000),
      age: generators.number.bind(null, 1, 100),
      active() {
        return sample([true, false]);
      }
    },
    properties,
    definitions
  })
);
