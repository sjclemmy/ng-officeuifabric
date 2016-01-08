'use strict';

import * as ng from 'angular';
import * as iconModule from '../components/icon/iconDirective';
import * as spinnerModule from '../components/spinner/spinnerDirective';
import * as textFieldModule from '../components/textfield/textFieldDirective';


/**
 * @ngdoc module
 * @name officeuifabric.components
 *
 * @description
 * Office UI Fabric Angular directives components module that includes all
 * other directives within the library.
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components', [
    iconModule.module.name,
    spinnerModule.module.name,
    textFieldModule.module.name
  ]);