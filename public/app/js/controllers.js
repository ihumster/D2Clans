angular.module('SUClan')
    .controller('homeStateController', ['$scope', 'services', '$state', function ($scope, services, $state) {
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                align: 'center',
                placeholder: undefined
            }
        }
        $scope.clans = services.clans;
    }])

    .controller('suHeaderController', ['$scope', 'services', '$state', function ($scope, services, $state) {
        $scope.isShownSearch = $scope.headerConfig.isShownSearch;
        $scope.placeholder = $scope.headerConfig.placeholder;
        $state.srModel = $scope.headerConfig.model;
        $scope.headerStyle = $scope.headerConfig.align == 'center' ? 'appHeaderContainer alignCenter' : 'appHeaderContainer'
        $scope.appHeaderContainer = true;
    }])

    .controller('clanStatistic', ['$scope', 'services', '$state', '$stateParams', 'orderByFilter', function ($scope, services, $state, $stateParams, orderBy) {
        $scope.appContent = services.isMobileView() ? 'appContent mobile' : 'appContent';
        $scope.settings = {
            header: {
                model: '',
                isShownSearch: true,
                align: '',
                placeholder: 'search member'
            }
        }

        var clanList;
        var membersList = services.getData($stateParams.clanNumber - 1, function (response, isLoading) {
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
        var header = document.getElementsByClassName('appHeader')[0];
        
        $scope.isButtonVisible = false;
        $scope.scrollDone = window.pageYOffset;
        $scope.scrollToTop = function () {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        };
        $scope.$watch('scrollDone', function (newValue) {
            if (newValue === 0) {
                $scope.isButtonVisible = false;
                if (header.className.includes('scrolled')){
                    header.classList.remove('scrolled');
                }
            } else {
                $scope.isButtonVisible = true;
                header.classList.add('scrolled');
            }
        });
    }])

    .controller('weeklyActivitiesController', ['$scope', 'services', '$state', '$stateParams', function ($scope, services, $state, $stateParams) {
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                align: 'center',
                placeholder: undefined
            }
        }
    }])