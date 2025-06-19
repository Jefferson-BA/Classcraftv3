angular.module('app')
  .component('characterCreation', {
    templateUrl: 'app/dashboard/Alumno-tools/character-creation/characterCreation.component.html',
    bindings: {
      onFinish: '&'
    },
    controller: function($window, $http) {
      const vm = this;
      vm.step = 1;
      vm.gender = null;
      vm.character = null;
      vm.class = null;

      vm.characterImages = {
        masculino: [
          'app/image/personajes/m1.png',
          'app/image/personajes/m2.png',
          'app/image/personajes/m3.png'
        ],
        femenino: [
          'app/image/personajes/f1.png',
          'app/image/personajes/f2.png',
          'app/image/personajes/f3.png'
        ]
      };

      vm.classImages = [
        { name: 'guerrero', img: 'app/image/clases/guerrero.png' },
        { name: 'curador', img: 'app/image/clases/curador.png' },
        { name: 'mago', img: 'app/image/clases/mago.png' }
      ];

      vm.selectGender = function(g) { vm.gender = g; };
      vm.selectCharacter = function(img) { vm.character = img; };
      vm.selectClass = function(clase) { vm.class = clase; };

      vm.nextStep = function() { vm.step++; };
      vm.prevStep = function() { vm.step--; };

      vm.finish = function() {
        const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
        $http.post('/api/students/' + currentUser.id + '/personaje', {
          genero: vm.gender,
          personaje: vm.character,
          clase: vm.class
        }).then(function() {
          currentUser.personaje_creado = true;
          $window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
          vm.onFinish();
        });
      };
    }
  });