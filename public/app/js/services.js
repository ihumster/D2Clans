var clans = [{
                id: 568218,
                members: []
            },
            {
                id: 2103469,
                members: []
            },
            {
                id: 2489839,
                members: []
            },
            {
                id: 2895088,
                members: []
            }
        ];

function getRequest(path) {
    return {
        method: 'GET',
        url: `https://www.bungie.net/Platform/${path}`,
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    };
};

angular.module('SUClan')
    .factory('clanListServices', ['$http', function ($http) {
        
        function loadAllData(clanNumber, callback) {
            var isLoading = true;
            return $http(getRequest(`GroupV2/${clans[clanNumber].id}/Members/?currentPage=1`))
                .then(function (res) {

                    var base = res.data.Response.results;
                    var count = 0;
                    
                    function getEachProfile(iteration) {
                        $http(getRequest(`Destiny2/${base[iteration].destinyUserInfo.membershipType}/Profile/${base[iteration].destinyUserInfo.membershipId}/?components=100`))
                            .then(function (activityRes) {

                                clans[clanNumber].members.push({
                                    name: base[iteration].destinyUserInfo.displayName,
                                    lastTime: activityRes.data.Response ? activityRes.data.Response.profile.data.dateLastPlayed : '0, never played'
                                });

                                iteration++;

                                if (iteration !== base.length) {
                                    getEachProfile(iteration);
                                    callback(clans[clanNumber].members, isLoading);
                                } else {
                                    isLoading = false;
                                    callback(clans[clanNumber].members, isLoading);
                                }
                            })
                    };
                    getEachProfile(count);
            });
        };

        function getData(clanNode, dataCallback) {
            if (clanNode === null) {
                return false;
            }  
            if (clans[clanNode].members.length) {
                dataCallback(clans[clanNode].members);
            } else {
                return loadAllData(clanNode, dataCallback);
            }
        };

        return {
            getData: getData,
            clans: clans
        };
    }])

    .factory('sharedServices', [function () {
        var maxMobileResolution = 420;

        function isMobileView() {
            return window.innerWidth < maxMobileResolution;
        };

        return {
            isMobileView: isMobileView
        }
    }])

    .factory('weeklyActivityServices', ['$http', function($http){
        var milestoneList = [];
        function getWeeklyMilestones() {
            $http(getRequest('Destiny2/Milestones/')).then((response)=>{
                var milestones = response.data.Response;
                console.log(milestones);
                for (item in milestones) {
                    getDefinition(item);
                }
            });
        };
        
        function getDefinition(milestoneHash){
            return $http(getRequest(`Destiny2/Milestones/${milestoneHash}/Content/`)).then((response)=>{
                if (response.data.Response) {
                    console.log(response.data.Response.about);
                }
            });
        }

        return {
            getWeeklyMilestones: getWeeklyMilestones
        };
    }])

    .factory('vendorsServices', ['$http', function($http){

        function getManifest(){
            return $http(getRequest('Destiny2/Manifest/')).then((response)=>{
                return response;
            });
        };

        return {
            getManifest: getManifest
        };
    }])