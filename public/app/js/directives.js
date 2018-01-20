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
                var header = document.getElementsByClassName('appHeader')[0];
                element.addClass('hide');
                document.addEventListener('scroll', function(){
                    scope.scrollDone = window.pageYOffset;
                    if (window.pageYOffset === 0) {
                        element.addClass('hide');
                        if (header.className.includes('scrolled')){
                            header.classList.remove('scrolled');
                        }
                    } else {
                        header.classList.add('scrolled');
                        if (element.hasClass('hide')) {
                            element.removeClass('hide')
                        }
                    }
                })
            }
        };
    })

    .directive('expandableMenu',  function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function(){
                    this.querySelector('.expandableSubMenu').classList.toggle('hide');
                })
            }
        };
    })
    .directive('suSpinner', function(){
        return {
            restrict: 'E',
            scope: {
                isActiveSpinner: '='
            },
            templateUrl: 'app/templates/suSpinner.html'
        }
    })