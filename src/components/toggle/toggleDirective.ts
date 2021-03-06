'use strict';

import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name IToggleScope
 * @module officeuifabric.components.toggle
 *
 * @description
 * This is the scope used by the directive.
 *
 *
 * @property {string} ngModel         - The scope variable to bind to the toggle.
 * @property {string} uifLabelOff     - The label to display when not toggled
 * @property {string} uifLabelOn      - The label to display when toggled
 * @property {string} uifTextLocation - Location of the label (left or right), compared to the toggle
 * @property {string} uniqueId
 * @property {string} textLocation
 * @property {string} disabled
 * @property {string} ngChange        - Expression to be called on the ngChange event of the input element
 * @property {string} ngTrueValue     - Pass a constant for the ng-true-value of the input element
 * @property {string} ngFalseValue    - Pass a constant for the ng-false-value of the input element
 */

export interface IToggleScope extends angular.IScope {
    ngModel: string;
    uifLabelOff: string;
    uifLabelOn: string;
    uifTextLocation: string;
    uniqueId: number;
    textLocation: string;
    disabled: boolean;
    ngChange: string;
    ngTrueValue: string;
    ngFalseValue: string;
    checkboxChange: () => void;
}

/**
 * @ngdoc directive
 * @name uifToggle
 * @module officeuifabric.components.toggle
 *
 * @restrict E
 *
 * @description
 * `<uif-toggle>` is a toggle directive.
 *
 * @see {link http://officeuifabric.com/components/toggle/}
 *
 * @usage
 *
 * <uif-toggle ng-model='toggled' />
 */
export class ToggleDirective implements angular.IDirective {
    public template: string = '<div ng-class="[\'ms-Toggle\', textLocation, {\'is-disabled\': disabled}]">' +
                 '<span class="ms-Toggle-description"><ng-transclude/></span>' +
                '<input type="checkbox" id="{{::$id}}" class="ms-Toggle-input" ' +
                'ng-model="ngModel" ng-change="checkboxChange();ngChange()" ng-disabled="disabled" ' +
                'ng-attr-ng-true-value="{{ngTrueValue || undefined}}" ng-attr-ng-false-value="{{ngFalseValue || undefined}}" />' +
                '<label for="{{::$id}}" class="ms-Toggle-field">' +
                    '<span class="ms-Label ms-Label--off">{{uifLabelOff}}</span>' +
                    '<span class="ms-Label ms-Label--on">{{uifLabelOn}}</span>' +
                '</label>' +
                '</div>';
    public restrict: string = 'E';
    public transclude: boolean = true;
    public require: string[] = ['?ngModel'];
    public scope: {} = {
        ngChange: '&?',
        ngFalseValue: '@?',
        ngModel: '=?',
        ngTrueValue: '@?',
        uifLabelOff: '@',
        uifLabelOn: '@',
        uifTextLocation: '@'
    };

    public static factory(): angular.IDirectiveFactory {
        const directive: angular.IDirectiveFactory = () => new ToggleDirective();
        return directive;
    }

    public link(scope: IToggleScope, elem: angular.IAugmentedJQuery, attrs: angular.IAttributes, ctrls: any[]): void {
        let ngModelCtrl: angular.INgModelController;
        if (angular.isDefined(ctrls) && ctrls.length > 0) {
            ngModelCtrl = ctrls[0];
        }

        if (scope.uifTextLocation) {
            let loc: string = scope.uifTextLocation;
            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
            scope.textLocation = ' ms-Toggle--text' + loc;
        }
        scope.$watch(
            () => { return elem.attr('disabled'); },
            ((newValue) => { scope.disabled = typeof newValue !== 'undefined'; })
        );
        scope.disabled = 'disabled' in attrs;

        scope.checkboxChange = () => {
            if (angular.isDefined(ngModelCtrl) && ngModelCtrl  !== null) {
                ngModelCtrl.$setDirty();
                ngModelCtrl.$setTouched();
            }
        };
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.toggle
 *
 * @description
 * Toggle
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.toggle', [
    'officeuifabric.components'
  ])
  .directive('uifToggle', ToggleDirective.factory());
