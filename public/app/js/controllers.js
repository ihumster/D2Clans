angular.module('SUClan')
    .controller('homeStateController', ['$scope', 'services', '$state', function ($scope, services, $state) {
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                placeholder: undefined
            }
        }
        $scope.clans = services.clans;
        $scope.isVisibleItems = false;
        $scope.toggleMenuItems = function (event) {
            if (event.target.className === 'hasExpandableMenu') {
                $scope.isVisibleItems = !$scope.isVisibleItems;
            }
        }
    }])

    .controller('suHeaderController', ['$scope', 'services', '$state', function ($scope, services, $state) {
        $scope.isShownSearch = $scope.headerConfig.isShownSearch;
        $scope.placeholder = $scope.headerConfig.placeholder;
        $state.srModel = $scope.headerConfig.model;
        $scope.headerStyle = $state.is('home') ? 'appHeaderContainer isHomeState' : 'appHeaderContainer'
        $scope.appHeaderContainer = true;    
    }])

    .controller('clanStatistic', ['$scope', 'services', '$state', '$stateParams', 'orderByFilter', function ($scope, services, $state, $stateParams, orderBy) {
        $scope.settings = {
            header: {
                model: '',
                isShownSearch: true,
                placeholder: 'search member'
            }
        }
 
        var clanList;
        var membersList = services.getData($stateParams.clanNumber-1, function (response, isLoading) {
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
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
                ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            $scope.clanList = orderBy(clanList, $scope.propertyName, $scope.reverse);
        };
    }])
    .controller('suScrollTopController', ['$scope', function($scope){
        $scope.isButtonVisible = false;
        $scope.scrollDone = window.pageYOffset;
        $scope.scrollToTop = function(){
            window.scrollTo({ 
                top: 0,
                left: 0, 
                behavior: 'smooth' 
            });
        };
        $scope.$watch('scrollDone', function (newValue) {
            if (newValue === 0) {
                $scope.isButtonVisible = false;
            } else {
                $scope.isButtonVisible = true;
            }
        });
    }])