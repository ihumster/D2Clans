angular.module('SUClan', ['ui.router'])
   .config(function($stateProvider, $urlRouterProvider){
      var homeState = {
         name: 'home',
         url: '/home',
         templateUrl: './app/templates/home.html',
         controller: 'homeStateController'
      };
      var clanStatisticV1 = {
         name: 'clanStatisticV1',
         url: '/clanStatisticV1',
         params: {
            clanNumber: null
         },
         templateUrl: '/app/templates/clanStatisctic.html',
         controller: 'clanStatistic'
      };
      var clanStatisticV2 = {
         name: 'clanStatisticV2',
         url: '/clanStatisticV2',
         params: {
            clanNumber: null
         },
         templateUrl: '/app/templates/clanStatisctic.html',
         controller: 'clanStatistic'
      };
      var clanStatisticV3 = {
         name: 'clanStatisticV3',
         url: '/clanStatisticV3',
         params: {
            clanNumber: null
         },
         templateUrl: '/app/templates/clanStatisctic.html',
         controller: 'clanStatistic'
      };
      var clanStatisticV4 = {
         name: 'clanStatisticV4',
         url: '/clanStatisticV4',
         params: {
            clanNumber: null
         },
         templateUrl: '/app/templates/clanStatisctic.html',
         controller: 'clanStatistic'
      };

      $stateProvider.state(clanStatisticV1);
      $stateProvider.state(clanStatisticV2);
      $stateProvider.state(clanStatisticV3);
      $stateProvider.state(clanStatisticV4);
      $stateProvider.state(homeState);
      $urlRouterProvider.otherwise('/home');
   });