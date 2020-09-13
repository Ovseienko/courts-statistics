var excel = require('exceljs');
const { DREAM, KURENIVKA, MAIAK, POZNIAKY, PROTASIV, TEREMKY, clubNames } = require("./mappers");

const fileName = 'Statistics.xlsx';

var workbook = new excel.Workbook();

module.exports = {
    createSheet: function(){

        const clubs = [DREAM, KURENIVKA, MAIAK, POZNIAKY, PROTASIV, TEREMKY];
        clubs.forEach(club => {
            var worksheet = workbook.addWorksheet(club);

            worksheet.columns = [
                { header: 'Date', key: 'date' },
                { header: 'Free', key: 'free' },
                { header: 'Occupied', key: 'occupied' },
            ]
        })

        workbook.xlsx.writeFile(fileName);
    },

    updateFile: function(data){
        workbook.xlsx.readFile(fileName)
            .then(() => {
                data.forEach(clubData => {
                    const sheet = workbook.getWorksheet(clubNames[clubData.id]);
                    const row = sheet.actualRowCount;
                    const nextRow = row + 1;
                    const dateNow = new Date();
                    const cellDate = sheet.getCell("A" + nextRow);
                    const cellFree = sheet.getCell("B" + nextRow);
                    const cellOccupied = sheet.getCell("C" + nextRow);
                    cellDate.value = dateNow.toLocaleDateString() +": " + dateNow.toLocaleTimeString();
                    cellFree.value = clubData.free;
                    cellOccupied.value = clubData.occupied;
                });

            }).then(() => {
            workbook.xlsx.writeFile(fileName);

        }).then(() => {
            console.log('File is written');
        }).catch(err => console.error("ERROR", err));
    }
}
