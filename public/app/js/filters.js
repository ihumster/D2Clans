angular.module('SUClan')
    .filter('timeFilter', function(){
        return function(item) {
            return item.replace('T', ' ').replace('Z','');
        }
    })
