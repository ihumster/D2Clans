angular.module('SUClan')
    .directive('suHeader', function () {
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
    .directive('suScrollToTopButton', function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/templates/suScrollToTopButton.html',
            controller: 'suScrollTopController',
            link: function(scope, element, attr) {
                document.addEventListener('scroll', function(){
                    scope.scrollDone = window.pageYOffset;
                })
            }
        };
    })