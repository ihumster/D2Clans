var Client = require('node-rest-client').Client;
var restClient = new Client();

var baseUrl = "https://www.bungie.net/Platform";

//https://bungie-net.github.io/multi/operation_get_GroupV2-GetGroup.html#operation_get_GroupV2-GetGroup
restClient.registerMethod("GroupV2GetGroup", baseUrl + "/GroupV2/${groupId}/", "GET");

//https://bungie-net.github.io/multi/operation_get_GroupV2-GetGroupByName.html#operation_get_GroupV2-GetGroupByName
//Clan Only. Replaced second path parameter {groupType} on "1".
restClient.registerMethod("GroupV2GetGroupByName", baseUrl + "/GroupV2/Name/${groupName}/1/", "GET");

//https://bungie-net.github.io/multi/operation_get_GroupV2-GetMembersOfGroup.html#operation_get_GroupV2-GetMembersOfGroup
restClient.registerMethod("GroupV2GetMembersOfGroup", baseUrl + "/GroupV2/${groupId}/Members/", "GET");

//https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile
restClient.registerMethod("Destiny2GetAllCharacters", baseUrl + "/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=200", "GET");


exports.restClient = restClient;