const fs = require('fs');
const path = require('path');

const current = path.join(__dirname, 'files');
const copy = path.join(__dirname, 'files-copy');
// copyDir(current, copy);

// function copyDir(current, copy) {
  fs.rm(copy, {recursive: true, force: true}, (err) => {
    if (err) {
      console.log('1',err);
    };
    fs.mkdir(copy, {recursive: true}, (err)=> {
      if (err) {
        console.log('2',err);
      }
    });
    fs.readdir(current, (err, files) => {
      if (err) {
        console.log('3',err);
      };
      // console.log(files);
      for(let file of files) {
        const currentFile = path.join(__dirname, 'files', `${file}`);
        const copyFile = path.join(__dirname, 'files-copy', `${file}`);
    //     // console.log(currentFile.name, copyFile.name);
        
        fs.appendFile(path.join(__dirname, `files-copy/${file}`), '', (err) => {
          // console.log('3.5', err)
          });
        fs.copyFile(currentFile, copyFile, (err)=>{
          if (err) {
            console.log('4',err);
          }
        });
      };
    });
  });
// };

