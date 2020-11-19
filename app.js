const countCourts = require("./countCourts");
const write = require("./write");

function format(str){
    return str.toString().length < 2 ? "0" + str : str;

}

const clubs = ["224", "13", "21", "29", "30", "32"];

module.exports = {

    start: function(){
        const date = new Date();
        const dateParam = `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;
        console.log("Script ran at ", date.getHours());
        for (let i = 0; i < clubs.length; i++) {
            countCourts.countAvailable(clubs[i], dateParam);
        };
    }
}





write.createSheet();
