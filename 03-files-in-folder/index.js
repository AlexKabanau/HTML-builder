const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '/secret-folder'), {withFileTypes: true}, (err, files) => {
  if(err){
    console.log(err);
  } else{
    for(let file of files) {
      if(file.isFile() === true){
        const name = path.basename(file.name , path.extname(file.name));
        const extName = path.extname(file.name).split('.').join('');
        let size;

        let myPromise = new Promise((resolve, reject) => {
          let fsPath = path.join(__dirname,`/secret-folder/${file.name}`);
          let fsOptions = { bigint: false };
          let fsCallback = (err, stats) => {
            if (err) {
               console.log(err);
               reject(err);
            } else {
              // console.log('1', stats);
              resolve(stats);
            }
          };

        fs.stat(fsPath, fsOptions, fsCallback);
        });
        // size = myPromise.then(data => { return (data.size)});
        myPromise.then(data => { 
          // console.log (data.size);
          size = data.size;
          console.log(`${name} - ${extName} - ${size/1000}kb`);
        })
        // myPromise.then(data => {return size = data["size"]})
        // const size = myPromise.then(data => { return data.size})
        // const size = myPromise.then((stats)=>{return stats["size"]});
        // setTimeout(()=>{
        //   console.log(`${name} - ${extName} - ${size}b`);
        // },10);
        
      }
    }
  }
});

// import { readdir } from 'fs/promises';

// try {
//   const files = await readdir(path);
//   for (const file of files) console.log(file);
// } catch (err) {
//   console.error(err);
// }
