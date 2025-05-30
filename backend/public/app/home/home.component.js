// app/home/home.component.js
angular.module('app').component('homeComponent', {
  templateUrl: 'app/home/home.template.html',
  controller: function() {
    const vm = this;
    vm.title = "Bienvenido a ClassCraft";
  }
});
