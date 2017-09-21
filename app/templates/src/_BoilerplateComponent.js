'use strict';

import templates from './Clay<%= componentName %>.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

/**
 * Metal Clay <%= componentName %> component.
 */
class Clay<%= componentName %> extends Component {}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
Clay<%= componentName %>.STATE = {}

Soy.register(Clay<%= componentName %>, templates);

export { Clay<%= componentName %> };
export default Clay<%= componentName %>;
