import { Body } from 'reactabular-sticky';
import { bodyChildContextTypes } from './types';

class VirtualizedBody extends Body {
  getChildContext() {
    const props = this.props;
    const style = props.style || {};
    const e = this.ref || {
      offsetHeight: style.maxHeight
    };

    return {
      bodyHeight: e.offsetHeight
    };
  }
}
VirtualizedBody.childContextTypes = bodyChildContextTypes;

export default VirtualizedBody;
