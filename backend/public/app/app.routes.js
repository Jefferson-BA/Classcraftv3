angular.module('app')
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        template: '<home-component></home-component>'
      })
      .when('/teacher/role-selection.component.html', {
        template: '<role-selection-component></role-selection-component>'
      })
      .when('/auth/register', {
        templateUrl: 'app/auth/register/register.template.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/' });
  });