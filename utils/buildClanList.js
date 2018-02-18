var fs = require('fs');


function read (clanData, callback) {
    try {
        return fs.readFile(`clanData/${clanData.number+1}clan.json`, (err, data)=>{
            if (err) {
                console.log(err);
            } else {
                callback( data.toString() );
            }
        });
    } catch (e) {
        console.log(e);
    }
};

function write (clanData) {
    try {
        let data = [];
        clanData.data[1].forEach(element => {
            if (element.$$hashKey) {
                delete element.$$hashKey; 
            }
        });
        return fs.writeFile(`clanData/${clanData.number+1}clan.json`, JSON.stringify(clanData.data) ,(err)=>{})
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    read: read,
    write: write
};