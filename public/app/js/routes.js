angular.module('SUClan', ['ui.router'])
   .config(function($stateProvider, $urlRouterProvider){

      var homeState = {
         name: 'home',
         url: '/home',
         templateUrl: './app/templates/home.html',
         controller: 'homeStateController'
      };

      var clanStatistic = {
         name: 'clanStatistic',
         url: '/clanStatistic/v{clanNumber}',
         params: {
            clanNumber: null
         },
         templateUrl: '/app/templates/clanStatisctic.html',
         controller: 'clanStatistic'
      };
      
      $stateProvider.state(clanStatistic);
      $stateProvider.state(homeState);
      $urlRouterProvider.otherwise('/home');
   });