'use strict';

import templates from './<%= componentName %>.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './<%= kebabCaseName %>.scss';

class <%= componentName %> extends Component {
}
Soy.register(<%= componentName %>, templates);

export { <%= componentName %> };
export default <%= componentName %>;