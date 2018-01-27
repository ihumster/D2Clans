angular.module('SUClan')
    .controller('homeStateController', ['$scope', 'clanListServices', '$state', function ($scope, clanListServices, $state) {
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                align: 'center',
                placeholder: undefined
            }
        }
        $scope.clans = clanListServices.clans;
    }])

    .controller('suHeaderController', ['$scope', '$state', function ($scope, $state) {
        $scope.isShownSearch = $scope.headerConfig.isShownSearch;
        $scope.placeholder = $scope.headerConfig.placeholder;
        $state.srModel = $scope.headerConfig.model;
        $scope.headerStyle = $scope.headerConfig.align == 'center' ? 'appHeaderContainer alignCenter' : 'appHeaderContainer'
        $scope.appHeaderContainer = true;
    }])

    .controller('clanStatisticController', ['$scope', 'clanListServices', '$state', '$stateParams', 'orderByFilter', function ($scope, clanListServices, $state, $stateParams, orderBy) {
        $scope.settings = {
            header: {
                model: '',
                isShownSearch: true,
                align: '',
                placeholder: 'search member'
            }
        }

        var clanList;
        var membersList = clanListServices.getData($stateParams.clanNumber - 1, function (response, isLoading) {
            clanList = response;
            $scope.clanList = response;
            $scope.isLoading = isLoading;
        });
        if (!membersList) {
            $state.transitionTo('home');
        }

        $scope.propertyName = '$index';
        $scope.reverse = true;
        $scope.clanList = orderBy(clanList, $scope.propertyName, $scope.reverse);

        $scope.sortBy = function (propertyName) {
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ?
                !$scope.reverse : false;
            $scope.propertyName = propertyName;
            $scope.clanList = orderBy(clanList, $scope.propertyName, $scope.reverse);
        };
    }])

    .controller('suScrollTopController', ['$scope', function ($scope) {
        $scope.scrollToTop = function () {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        };
    }])

    .controller('weeklyActivitiesController', ['$scope', 'weeklyActivityServices', '$state', '$stateParams', function ($scope, weeklyActivityServices, $state, $stateParams) {
        $scope.milestones = [];
        $scope.isSpinnerActive = true;
        weeklyActivityServices.getWeeklyMilestones(function(response, activeSpinner){
            $scope.milestones = response;
            $scope.isSpinnerActive =activeSpinner;
        });
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                align: 'center',
                placeholder: undefined
            }
        };
        
    }])

    .controller('vendorsController', ['$scope', 'vendorsServices', '$state', '$stateParams', function ($scope, vendorsServices, $state, $stateParams) {
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                align: 'center',
                placeholder: undefined
            }
        }
        $scope.vendorsTitle = $stateParams.vendorName;
        vendorsServices.getVendor();

    }])