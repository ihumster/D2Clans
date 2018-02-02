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

var clientId = 23137;
var authUrl = 'https://www.bungie.net/ru/OAuth/Authorize';
var tokenUrld = 'https://www.bungie.net/Platform/App/OAuth/token/';
var refreshUrl = 'https://www.bungie.net/Platform/App/OAuth/token/';

// {
//     "access_token": "CPQ9EoYCACCiwBpJJGwfowe3SGnfvw6L5gi0doE4FCdLlUyPsQ8fBOAAAAA4gHqvw1qv+AWvMhOXG/997YV8yWPU90rajIwOh6CyJoYP1Qvm1nKy6e1pGePD2oR9JFGX02CkNoPmw7rbRDxw1AvtdVXmKZSpcV2Dg/s8kuQaQ0YkQ9rvvMNX+nZYeVcLW1HGPzOcnauzbHbUINHyXC5we0u15fto94g3z6x+1vJXev1Vc7fWE9aDH5ZBaFr18k50lRt22p95GJIgPL+ovxwMUdjgwusURbH2LfuPQr7yAqmnUbvl5DouhTvF5HFryg4UjsWhIIhl2rZyGtbTV9AWgpBXooK3oYono1dTlA==",
//     "token_type": "Bearer",
//     "expires_in": 3600,
//     "membership_id": "13503654"
// }
function getRequest(path , replace) {
    var url = replace ? path : `https://www.bungie.net/Platform${path}`;
    return {
        method: 'GET',
        url: url,
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'        }
    };
};

angular.module('SUClan')
    .factory('clanListServices', ['$http', function ($http) {    
        function loadAllData(clanNumber, callback) {
            var isLoading = true;
            return $http(getRequest(`/GroupV2/${clans[clanNumber].id}/Members/?currentPage=1`))
                .then(function (res) {

                    var base = res.data.Response.results;
                    var count = 0;

                    function getEachProfile(iteration) {
                        $http(getRequest(`/Destiny2/${base[iteration].destinyUserInfo.membershipType}/Profile/${base[iteration].destinyUserInfo.membershipId}/?components=100`))
                            .then(function (activityRes) {
                                if (base[iteration].destinyUserInfo.displayName == 'chernjaga') {
                                    console.log(base[iteration]);
                                }
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
        function getWeeklyMilestones(callback) {
            $http(getRequest('/Destiny2/Milestones/')).then((response)=>{
                var milestones = response.data.Response;
                console.log(milestones);
                getDefinition(milestones);
            });

            function getDefinition(data){
                return $http.post('/getWeeklyActivities', JSON.stringify(data)).then((response)=>{
                    if (response.data) {
                        callback(response.data , false);
                    }
                });
            }
        };

        return {
            getWeeklyMilestones: getWeeklyMilestones
        };
    }])

    .factory('vendorsServices', ['$http', function($http){
        // Hunter
        // (3) ["2305843009265185311", "2305843009265185314", "2305843009265185316"] membershipId = "4611686018459909000"
        // var memberId = 13503654;

        var characterId = 2305843009265185311;
        var xurHash = 2190858386;
        // var memberId = 4611686018459909434;
        var memberId = 4611686018459909434;
        var membershipId = 13503654

        function getOAuth (){
            $http.get(`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`).then((res)=>{
                console.log(res);
            });
        }

        function getVendor(callback) {
            // profile
            // $http(getRequest(`/Destiny2/1/Profile/${memberId}/?components=100`)).then((response)=>{
            //     console.log(response);
            // });
            getOAuth();
            $http(getRequest(`/Destiny2/1/Profile/${membershipId}/Character/${characterId}/Vendors/${xurHash}?components=None`)).then((response)=>{
                console.dir(response);
            });
        }
        return {
            getVendor: getVendor
        };
    }])