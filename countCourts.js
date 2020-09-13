const http = require('http');
const write = require("./write");

var collectedData = [];

function collectData(data){
    collectedData.push(data);
    if ( collectedData.length === 6 ) {
        write.updateFile(collectedData);
        collectedData = [];
    }

};

module.exports = {

    countAvailable: function(clubId, date){
        var freeCourts = 0;
        var occupiedCourts = 0;

        const options = {
            host: 'squasharena.com.ua',
            path: `/get-courts-data-table.php?city_id=80&club_id=${clubId}&date_selected=${date}`,
            headers: {
                "Cache-Control":"private, no-cache, no-store, must-revalidate, max-age=0"
            }
        };

        callback = function(response){
            var str = '';

            response.on('data', function(chunk){
                str += chunk;
            });

            response.on('end', function(){
                const rows = str.split("<tr>")
                rows.splice(0, 1);

                rows.forEach((row) => {
                    const occupied = row.indexOf("courts-table__occupied") + 1;
                    const free = row.indexOf("courts-table__free") + 1;
                    if ( !(free === 0 && occupied === 0) ) {
                        if ( (free < occupied) || (occupied === 0) ) {
                            freeCourts += 1;
                        } else {
                            occupiedCourts += 1;

                        }
                    }
                });

                console.log(clubId, " free " + freeCourts + " occupied " + occupiedCourts);
                collectData({
                    id: clubId,
                    free: freeCourts,
                    occupied: occupiedCourts
                });
            });
        }
        http.request(options, callback).end();
    }
}
