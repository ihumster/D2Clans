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

var code;
var token;

function getRequest(url, authorization) {
    var url = 'https://www.bungie.net/Platform' + url;
    if (authorization) {
        return {
            method: 'GET',
            url: url,
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
    } else {
        return {
            method: 'GET',
            url: url,
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            }
        };
    }
};

angular.module('SUClan')
    .factory('clanListServices', ['$http', function ($http) {
        function loadAllData(clanNumber, callback) {
            var isLoading = true;
            return $http(getRequest(`/GroupV2/${clans[clanNumber].id}/Members/?currentPage=1`))
                .then(function (res) {

                    var base = res.data.Response.results;
                    var count = 0;
                    console.log(res.data.Response.results);

                    function getEachProfile(iteration) {
                        $http(getRequest(`/Destiny2/${base[iteration].destinyUserInfo.membershipType}/Profile/${base[iteration].destinyUserInfo.membershipId}/?components=100`))
                            .then(function (activityRes) {
                                clans[clanNumber].members.push({
                                    name: base[iteration].destinyUserInfo.displayName,
                                    lastTime: activityRes.data.Response ? activityRes.data.Response.profile.data.dateLastPlayed : '0, never played'
                                });

                                iteration = iteration + 1;

                                if (iteration < base.length) {
                                    getEachProfile(iteration);
                                    callback(clans[clanNumber].members, isLoading);
                                } else {
                                    isLoading = false;
                                    callback(clans[clanNumber].members, isLoading);
                                }
                            }).catch((e)=>{
                                console.log(e);
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

    .factory('sharedServices', ['$http', function ($http) {
            var maxMobileResolution = 420;

            function isMobileView() {
                return window.innerWidth < maxMobileResolution;
            };

            function oauth() {
                if (!code && !token) {
                    var code = window.location.href.split('code=')[1].split('#!')[0]
                    $http.post( 'https://www.bungie.net/Platform/App/OAuth/Token/', 
                                `client_id=${clientId}&grant_type=authorization_code&code=${code}`, 
                                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                        .then((res) => {
                            token = res.data.access_token;
                            console.log(token);
                        }).catch((e)=>{console.log('request has been failed')});
                }
            };

        return {
            oauth: oauth,
            apiConfig: {
                clientId: clientId
            },
            isMobileView: isMobileView
        }
    }])

    .factory('weeklyActivityServices', ['$http', function ($http) {
        var milestoneList = [];

        function getWeeklyMilestones(callback) {
            $http(getRequest('/Destiny2/Milestones/')).then((response) => {
                var milestones = response.data.Response;
                getDefinition(milestones);
            });

            function getDefinition(data) {
                return $http.post('/getWeeklyActivities', JSON.stringify(data)).then((response) => {
                    if (response.data) {
                        callback(response.data, false);
                    }
                });
            }
        };

        return {
            getWeeklyMilestones: getWeeklyMilestones
        };
    }])

    .factory('vendorsServices', ['$http', function ($http) {
        var characterIds = [
            '2305843009262525090',
            '2305843009262525091',
            '2305843009315154768'
        ];
        var vendorsHash = {
            xursHash: 2190858386
        };

        // Path: /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/{vendorHash}/
        // Path: /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/

        function getVendor(callback) {
            console.log('service is not available');
            $http(getRequest(`/Destiny2/1/Profile/4611686018459909434/Character/${characterIds[0]}/Vendors/${vendorsHash.xursHash}`)).then((response)=>{
                console.log(response)
            });
        };
        return {
            getVendor: getVendor
        };
    }])
