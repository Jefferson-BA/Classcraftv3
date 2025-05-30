// backend/public/app/app.routes.js
angular.module('app', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.template.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/register/teacher', {
        templateUrl: 'app/auth/register/register.component.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/login/teacher', {
        templateUrl: 'app/auth/login/login.component.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/' });
  });
