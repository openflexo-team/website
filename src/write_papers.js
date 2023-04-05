const fs    = require('fs');
const path  = require('path');

const start = 'export const data_papers = `'
const end   = '`'
var content = ''


const directoryPath = 'publis/';

fs.readdir(directoryPath, function (err, files) {

    files.forEach(function (file) {
        const filePath  = path.join(directoryPath, file)
        var buffer      = fs.readFileSync(filePath)
        content         += buffer.toString()
    })
    fs.writeFileSync('data/papers.js', start + content + end)
});
