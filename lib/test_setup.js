import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line no-console
global.console = { log: console.log, error: console.error, warn: jest.fn() };
