const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '/secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    for (let file of files) {
      // console.log(file)
      if (file.isFile() === true) {
        (async () => {
          const name = path.basename(file.name, path.extname(file.name));
          const extname = path.extname(file.name).split('.').join('');
          const size = await fs.promises.stat(path.join(__dirname, `/secret-folder/${file.name}`)).then(stats => {return stats.size});
          // console.log(name, '-', extname, '-', size, 'b');
          console.log(`${name} - ${extname} - ${size}b`)
        })();
        
        
        // let promise = new Promise(resolve => {fs.stat(path.join(__dirname, `/secret-folder/${file.name}`)), (err, stats) => {
        //   resolve(stats)
        // }});
        // const size = promise.then(
        //   stats => {return stats.size}
        // );

        // const stats = fs.stat(path.join(__dirname, `/secret-folder/${file.name}`), (err, stats) => {
        //   return stats
        // });
       
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
