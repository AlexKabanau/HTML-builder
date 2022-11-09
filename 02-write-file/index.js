const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
 });
//  let data = '';
fs.appendFile(
  path.join(__dirname, 'mynotes.txt'), '', () => {}
);
console.log("Hello, put your test");
rl.on('line', (input) => {
  if (input === 'exit') {
    // console.log("Bye!");
    rl.close();
  } else {
    // console.log(data += input);
    fs.appendFile(
      path.join(__dirname, 'mynotes.txt'),
      `${input}\n`,
      () => {console.log(`Your text is ${input}`)}
    );
  }
});
process.on('beforeExit', () => {
  console.log('Bye!');
})

// fs.appendFile(
//   path.join(__dirname, 'notes', 'mynotes.txt'),
//   ' From append file',
//   err => {
//       if (err) throw err;
//       console.log('Файл был изменен');
//   }
// );

// fs.writeFile(
//     path.join(__dirname, 'text.txt'),
//     (err) => {
//         if (err) throw err;
//         console.log('Файл был создан');
//     }
// );

