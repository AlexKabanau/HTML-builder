const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const current = path.join(__dirname, 'assets');
const copy = path.join(__dirname, 'project-dist', 'assets');
// copyDir(current, copy);

fs.rm(copy, {recursive: true, force: true}, (err) => {
  if (err) {
    console.log('01',err);
  };

  //create assets
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err)=> {
    if (err) {
      console.log('1',err);
    }
  });
  copyDir(current, copy);
  copyCSS();
  createHTML();

  //create style.css
});





function copyDir(from, to) {
  fs.mkdir(to, {recursive: true}, (err)=> {
    if (err) {
      console.log('2',err);
    }
  });
  // console.log('папка создана');
  fs.readdir(from, {withFileTypes: true}, (err, files) => {
    if (err) {
      console.log('3',err);
    };
    // console.log(files);
    for(let file of files) {
      const currentFile = path.join(from, file.name);
      const copyFile = path.join(to, file.name);
  //     // console.log(currentFile.name, copyFile.name);
      
      // fs.appendFile(path.join(__dirname, `files-copy/${file}`), '', (err) => {
      //   // console.log('3.5', err)
      //   });
      if (!file.isFile()) {
        copyDir(currentFile, copyFile);
      };
      fs.copyFile(currentFile, copyFile, (err)=>{
        if (err) {
          // console.log('4',err);
        }
      });
    };
  });
};

function copyCSS() {
  const currentCss = path.join(__dirname, 'styles');
  const copyCss = path.join(__dirname, 'project-dist/style.css');
  const content = fs.createWriteStream(copyCss);

  fs.readdir(currentCss, {withFileTypes: true}, (err, files) => {
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
};

function createHTML() {
  const readStream = fs.createReadStream(path.join(__dirname, 'template.html'));
  const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
  const currentFile = path.join(__dirname, 'template.html');
  const copyFile = path.join(__dirname, 'project-dist', 'index.html');
//попытка №3

  // readStream.on('data', async (data) => {
  //   const content = await HTML();

  //   async function HTML() {
  //     let html = data.toString();
  //     const matches = html.match(/{{(.*)}}/gi);
  //     for (let match of matches) {
  //       const tag = match.match(/\w+/);
  //       let fsPath = path.join(__dirname, 'components', `${tag[0]}.html`);
  //       let tagContent = await fsPromises.readFile(fsPath);
  //       html = html.replace(match, tagContent.toString());
  //     }
  //     return html;
  // };

  //   writeStream.write(content);

  // })







//попытка №2
  let myPromise = new Promise (resolve => {
    let htmlContent;
    // fs.readFile(currentFile, 'utf-8', (err, data) => {
    readStream.on('data', (data) => {
      let html = data.toString();
      const matches = html.match(/{{(.*)}}/gi);
      // for (let match of matches) {
        for (let i=0; i<matches.length; i++) {
        const tag = matches[i].match(/\w+/);
        let content;
        let myNewPromise = new Promise(resolve => {
          let fsPath = path.join(__dirname, 'components', `${tag[0]}.html`);
          let fsCallback = (err, stats) => {
            if (err) {
              console.log(err);
              // reject(err);
            } else {
              // console.log('1', stats);
              resolve(stats);
            }
          };
          fs.readFile(fsPath, fsCallback);
        })

        myNewPromise.then(data => {
          content = data;
          html = html.replace(matches[i], content.toString());
          console.log(matches.length-1);
          if (i===2) {

            writeStream.write(html);
          }
          // console.log(html.toString());
          // return html
          htmlContent = html;
        })
      }
      // console.log(htmlContent)
      resolve(htmlContent);
    });
    
  });

  myPromise.then(data => {
    console.log(data)
    // writeStream.write(data);
  })







  // let newPromise = new Promise ((resolve) => {
  //   let event = 'data';
  //   let callback = (err, data) => {
  //     if (err) {
  //        console.log(err);
  //       //  reject(err);
  //     } else {
  //       // console.log('1', stats);
        
  //         let html = data.toString();
  //         let htmlContent;
        
  //         const matches = html.match(/{{.*}}/gi);
  //         // function createContent() {
  //           for (let match of matches) {
  //             const tag = match.match(/\w+/);
  //             // console.log(tag);
  //             let content;
  //             let myPromise = new Promise(resolve => {
  //               let fsPath = path.join(__dirname, 'components', `${tag[0]}.html`);
  //               let fsCallback = (err, stats) => {
  //                 if (err) {
  //                   console.log(err);
  //                   reject(err);
  //                 } else {
  //                   // console.log('1', stats);
  //                   resolve(stats);
  //                 }
  //               };
  //               fs.readFile(fsPath, fsCallback);
  //             })
    
  //             myPromise.then(data => {
  //               content = data;
  //               html = html.replace(match, content.toString());
  //               // content.write(html.toString());
  //               console.log(html.toString());
  //               // return html
  //               htmlContent = html;
  //             })
                
              
  //             // console.log(content);
  //             // html = html.replace(match, content.toString());
  //           }
  //           // console.log(html)
        
  //       resolve(data);
  //     }
  //   };
  //   readStream.on(event, callback); //(err, data) => {
  //   // console.log(data);
  //   // arr.push(data.toString());
  // })

  //     // console.log(htmlContent);
  //   //   return html;
  //   // };
  //   // createContent();
    
  //   // console.log(html);


  //   // console.log(matches);
  //   newPromise.then(data => {
  //     console.log(data.toString());
  //     content.write(data);
  //   });
  //   // newPromise.catch(err => console.log(err))
  //   // content.write(html);
  // // });
  // // });
  


};