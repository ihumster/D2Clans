angular.module('SUClan', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: '/app/templates/home.html',
            controller: 'homeStateController'
        };

        var weeklyActivities = {
            name: 'weeklyActivities',
            url: '/weeklyActivities',
            templateUrl: '/app/templates/weeklyActivities.html',
            controller: 'weeklyActivitiesController'
        };

        var clanStatistic = {
            name: 'clanStatistic',
            url: '/clanStatistic/v{clanNumber}',
            params: {
                clanNumber: null
            },
            templateUrl: '/app/templates/clanStatisctic.html',
            controller: 'clanStatisticController'
        };

        var vendors = {
            name: 'vendors',
            url: '/vendors?{vendorName}',
            params: {
                vendorName: null
            },
            templateUrl: '/app/templates/vendors.html',
            controller: 'vendorsController'
        };

        $stateProvider.state(clanStatistic);
        $stateProvider.state(vendors);
        $stateProvider.state(homeState);
        $stateProvider.state(weeklyActivities);
        $urlRouterProvider.otherwise('/home');
    });
