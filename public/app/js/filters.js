angular.module('SUClan')
    .filter('timeFilter', function(){
        return function(item) {
            
            var outputValue = (new Date() - new Date(item))/86400000;
            var daysAgo = outputValue.toFixed(1);
            
            return daysAgo;
        }
    })
