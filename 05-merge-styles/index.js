const fs = require('fs');
const path = require('path');

const current = path.join(__dirname, 'styles');
const copy = path.join(__dirname, 'project-dist/bundle.css');
const content = fs.createWriteStream(copy);

fs.readdir(current, {withFileTypes: true}, (err, files) => {
  if (err) {
    // console.log('1', err);
  };
  // let arr = [];
  for (let file of files) {
    // console.log(file);
    if (!file.isFile()) {
      // console.log(file.name, 'Is not a file');
      continue;
    }
    const extName = path.extname(file.name).split('.').join('');
    // console.log(extName);
    if (extName !== 'css') {
      // console.log('Is not a css-file');
      continue;
    }
    fs.readFile(path.join(__dirname, 'styles', file.name.toString()), 'utf-8', (err, data) => {
      // console.log(data);
      // arr.push(data.toString());
      content.write(data.toString())
    });
    
  };
  // console.log(arr)
});



// fs.readdir(current, (err, files) => {
//   if (err) {
//     console.log('1', err);
//   };
//   fs.appendFile(path.join(__dirname, project-dist/bundle.css), '', (err) => {
//     // console.log('3.5', err)
//     });
//   let copyFile = path.join(__dirname, 'project-dist/bundle.css')
//   for (let file of files) {
//     const currentFile = path.join(__dirname, 'styles', ${file});

//     fs.copyFile(currentFile, copyFile, (err)=>{
//       if (err) {
//         console.log('4',err);
//       }
//     });
//   }
// })