angular.module('SUClan')
    .factory('services', ['$http', function ($http) {
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

        function getMembersdRequest(clanNumber) {
            return {
                method: 'GET',
                url: 'https://www.bungie.net/Platform/GroupV2/' + clans[clanNumber].id + '/Members/?currentPage=1',
                headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                }
            };
        };

        function getActivityRequest(membershipType, membershipId) {
            return {
                method: 'GET',
                url: 'https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=100',
                headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                }
            };
        };

        function loadAllData(clanNumber, callback) {
            var isLoading = true;
            return $http(getMembersdRequest(clanNumber)).then(function (res) {
                var base = res.data.Response.results;
                var count = 0;

                function getEachProfile(iteration) {
                    $http(getActivityRequest(base[iteration].destinyUserInfo.membershipType, base[iteration].destinyUserInfo.membershipId))
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
    }]);