const fs = require('fs');
const Destiny2API = require('node-destiny-2');
const destiny = new Destiny2API({
    key: '8d7f75b5c93c4a61a55e5c072bc8a1a4',
    oauthConfg: {
        id: 23137,
        secret: null
    }
});

const clans = [{
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

function buildLeaderBoard(data) {
    return {
        test: 'test!!!'
    }
}

module.exports = buildLeaderBoard;