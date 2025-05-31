// app/home/home.component.js
angular.module('app').component('homeComponent', {
  templateUrl: 'app/home/home.template.html',
  controller: function($location) {
    const vm = this;
    vm.title = "Bienvenido a ClassCraft";

    vm.navigateToRegister = function() {
      $location.path('/register/teacher');
    };
  }
});