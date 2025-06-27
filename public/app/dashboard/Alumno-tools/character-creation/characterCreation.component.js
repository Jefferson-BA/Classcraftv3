angular.module('app')
  .component('characterCreation', {
    templateUrl: 'app/dashboard/Alumno-tools/character-creation/characterCreation.component.html',
    bindings: {
      onFinish: '&'
    },
    controller: function($window, $http) {
      const $ctrl = this;
      $ctrl.step = 1;
      $ctrl.nombre = '';
      $ctrl.apellido = '';
      $ctrl.gender = null;
      $ctrl.character = null;
      $ctrl.class = null;

      $ctrl.characterImages = {
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

      $ctrl.classImages = [
        { name: 'guerrero', img: 'app/image/clases/guerrero.png' },
        { name: 'curador', img: 'app/image/clases/curador.png' },
        { name: 'mago', img: 'app/image/clases/mago.png' }
      ];

      $ctrl.selectGender = function(g) { $ctrl.gender = g; };
      $ctrl.selectCharacter = function(img) { $ctrl.character = img; };
      $ctrl.selectClass = function(clase) { $ctrl.class = clase; };

      $ctrl.nextStep = function() { $ctrl.step++; };
      $ctrl.prevStep = function() { $ctrl.step--; };

      $ctrl.finish = function() {
        const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
        $http.post('/api/students/' + currentUser.id + '/personaje', {
          nombre: $ctrl.nombre,
          apellido: $ctrl.apellido,
          genero: $ctrl.gender,
          personaje: $ctrl.character,
          clase: $ctrl.class
        }).then(function() {
          currentUser.personaje_creado = true;
          currentUser.genero = $ctrl.gender;
          currentUser.personaje = $ctrl.character;
          currentUser.clase = $ctrl.class;
          currentUser.nombre = $ctrl.nombre;
          currentUser.apellido = $ctrl.apellido;
          $window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
          $ctrl.onFinish();
        });
      };
    }
  });