const fs    = require('fs');
const path  = require('path');

const start     = 'export const data_papers = `'
const end       = '`'
var content     = ''


const directoryPath = 'publis/';

fs.readdir(directoryPath, function (err, files) {

    files.forEach(function (file) {
        const filePath = path.join(directoryPath, file)

        // fs.readFile(filePath, function(err, data) {
        //     content += data.toString()
        //     // console.log(content)
        // });

        var buffer = fs.readFileSync(filePath)
        // console.log(buffer.toString())
        content += buffer.toString()
    })
    fs.writeFileSync('data/papers.js', start + content + end)

});
