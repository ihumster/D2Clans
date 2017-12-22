angular.module('SUClan')
   .directive('suHeader', function(){
      return {
         restrict: 'E',
         replace: true,
         scope: {
             headerConfig: '='
         },
         templateUrl: 'app/templates/suHeader.html',
         controller: 'suHeaderController'
      };
   })
