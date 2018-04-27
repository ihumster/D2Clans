angular.module('SUClan')
    .controller('homeStateController', ['$scope', 'clanListServices', '$state', 'sharedServices', function ($scope, clanListServices, $state, sharedServices) {
        // if (!window.location.href.includes('code')) {
        //     window.location.replace(`https://www.bungie.net/en/OAuth/Authorize?client_id=${sharedServices.apiConfig.clientId}&response_type=code`);
        // }
        // sharedServices.oauth();
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

    .controller('clanStatisticController', ['$scope', 'clanListServices', '$state', '$stateParams', 'orderByFilter', '$http',
        function ($scope, clanListServices, $state, $stateParams, orderBy, $http) {
            var clanList;
            $scope.settings = {
                header: {
                    model: '',
                    isShownSearch: true,
                    align: '',
                    placeholder: 'search member'
                }
            };

            $http.post('/getList', JSON.stringify({number: $stateParams.clanNumber - 1}))
                .then((res)=>{
                    clanList = res.data[1];
                    $scope.clanList = res.data[1];
                    $scope.lastDate = res.data[0].replace('T', ' ').split('.')[0];
                });
                
            $scope.update = function() {
                $scope.showSpinner = true;
                clanListServices.getData($stateParams.clanNumber - 1, function (response, isLoading) {
                    clanList = response;
                    $scope.clanList = response;
                    $scope.isLoading = isLoading;
                    $scope.showSpinner = false;
                    if (!isLoading) {
                        $http.post('/sendList', JSON.stringify({
                            number: $stateParams.clanNumber - 1,
                            data: [
                                new Date().toLocaleDateString() + ': ' + new Date().toLocaleTimeString(),
                                response
                            ]
                        })).catch((e)=>{
                            console.log(e);
                        });
                    }
                });
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
        }
    ])

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
        weeklyActivityServices.getWeeklyMilestones(function (response, activeSpinner) {
            $scope.milestones = response.outputData;
            $scope.isSpinnerActive = activeSpinner;
            console.dir(response.errors);
            console.dir(response.outputData);
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

    .controller('weeklyLegendsController', ['$scope', '$http', function ($scope, $http) {
        $scope.settings = {
            header: {
                model: null,
                isShownSearch: false,
                align: 'center',
                placeholder: undefined
            }
        };
        $http.post('/getLeaderBoard').then((res) => {
            console.log(res)
        });
    }]);