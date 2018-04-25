function cleanFileName(file) {
  let name = file.split('.svg')[0].split('/').slice(-1)[0];
  name = name.replace(/[^a-zA-Z0-9]/g,'');
  name = name.replace(' ', '-');
  name = name.toLowerCase();
  return name;
}

const webfontsGenerator = require('webfonts-generator');
const testFolder = './icons/Basicos/';
const fs = require('fs');
let filesToConvert = [];

fs.readdir(testFolder, (err, files) => {
  files.forEach((file, index) => {
    files[index] = testFolder + file;
  });
  filesToConvert = files;
  webfontsGenerator({
    files: filesToConvert,
    dest: 'dest/',
    fontName: 'icons-comafi',
    html: true,
    htmlTemplate: './templates/html.hbs',
    templateOptions: {
      classPrefix: 'cfi-icon--',
      baseSelector: '.cfi-icon'
    },
    rename: function(font){
      return cleanFileName(font);
    }
  }, function(error) {
    if (error) {
      console.log('Fail!', error);
    } else {
      console.log('Done!');
    }
  });
});
 
