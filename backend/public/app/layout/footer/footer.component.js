angular.module('app').component('footerComponent', {
  templateUrl: 'app/layout/footer/footer.template.html',
  controller: function() {
    this.year = new Date().getFullYear();
  }
});
