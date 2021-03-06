'use strict';

import * as angular from 'angular';

describe('iconDirective: <uif-icon />', () => {
  let element: angular.IAugmentedJQuery;
  let scope: angular.IScope;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.icon');
  });

  beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
    element = angular.element('<uif-icon uif-type="arrowDownLeft" />');
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  /**
   * Verifies directive generates the correct HTML element.
   */
  it('should render correct HTML', () => {
    // get the rendered icon element
    let iconElement: angular.IAugmentedJQuery = element.find('i');

    // make sure found the icon
    expect(iconElement.length).toBe(1);
  });

  /**
   * Verifies directive generates the correct CSS classes.
   */
  it('should render correct Office UI Fabric CSS classes', () => {
    // get the rendered icon element
    let iconElement: angular.IAugmentedJQuery = element.find('i');

    // ensure icon has the correct classes
    expect(iconElement.eq(0)).toHaveClass('ms-Icon');
    expect(iconElement.eq(0)).toHaveClass('ms-Icon--arrowDownLeft');
  });

  /**
   * Verifies directive generates the aria-hidden attribute. 
   */
  it('should render correct aria-hidden attribute', () => {
    // get the rendered icon element
    let iconElement: angular.IAugmentedJQuery = element.find('i');

    // ensure icon has aria attribute with correct value
    expect(iconElement.eq(0)).toHaveAttr('aria-hidden');
    expect(iconElement.eq(0).attr('aria-hidden')).toBe('true');
  });

});
