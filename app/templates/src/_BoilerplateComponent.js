'use strict';

import templates from './Clay<%= componentName %>.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

class Clay<%= componentName %> extends Component {
}
Soy.register(Clay<%= componentName %>, templates);

export { Clay<%= componentName %> };
export default Clay<%= componentName %>;
