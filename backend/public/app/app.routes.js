angular.module('app')
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true); // URLs limpias

    $routeProvider
      .when('/', {
        template: '<home-component></home-component>'
      })

      // LOGIN
      .when('/login/teacher', {
        templateUrl: 'app/auth/login/login.template.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/login/alumno', {
        templateUrl: 'app/auth/login-alumno/loginAlumno.template.html',
        controller: 'LoginAlumnoController',
        controllerAs: 'vm'
      })

      // REGISTER
      .when('/auth/register', {
        templateUrl: 'app/auth/register/register.template.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/auth/alumnoRegister', {
        templateUrl: 'app/auth/register-alumno/registerAlumno.component.html',
        controller: 'RegisterAlumnoController',
        controllerAs: 'vm'
      })
      .when('/register/alumno', {
        templateUrl: 'app/auth/register-alumno/registerAlumno.component.html',
        controller: 'RegisterAlumnoController',
        controllerAs: 'vm'
      })

      // ROLE SELECTION
      .when('/teacher/role-selection.component.html', {
        template: '<role-selection-component></role-selection-component>'
      })

      // TEACHER DASHBOARD
      .when('/dashboard/teacher', {
        templateUrl: 'app/dashboard/teacher.template.html',
        controller: 'TeacherController',
        controllerAs: 'vm'
      })
      .when('/classroom', {
        templateUrl: 'app/dashboard/teacher-tools/classroom/classroom.component.html',
        controller: 'ClassroomController',
        controllerAs: 'vm'
      })

      // STUDENT DASHBOARD
      .when('/dashboard/alumno', {
        templateUrl: 'app/dashboard/Alumno.template.html',
        controller: 'AlumnoController',
        controllerAs: 'vm'
      })
      .when('/dashboard/alumno/misclases', {
        templateUrl: 'app/dashboard/student/student-classes.component.html',
        controller: 'StudentClassesController',
        controllerAs: 'vm'
      })
      .when('/alumno/classroom', {
        templateUrl: 'app/dashboard/Alumno-tools/classroom/classroom.component.html',
        controller: 'StudentClassesController',
        controllerAs: 'vm'
      })

      // FALLBACK
      .otherwise({ redirectTo: '/' });
  });
