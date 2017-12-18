angular.module('SUClan')
   .directive('suHeader', function(){
      return {
         restrict: 'E',
         replace: true,
         templateUrl: '/app/templates/suHeader.html',
         controller: 'suHeaderController'
      };
   });