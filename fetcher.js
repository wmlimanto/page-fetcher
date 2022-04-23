// node app that takes two CL args: URL & local file path
// it should download the resource at URL to local path
// it should print out a msg upon completion

const request = require('request');
const fs = require('fs');
// takes in CL args
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
// readline module
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {
  console.log('StatusCode: ', response && response.statusCode);

  // edge case: if URL is invalid or non-200
  if (response.statusCode > 200) {
    console.log('The URL is invalid - please try again!');
    return;

  } else {
    // edge case: if file path is invalid
    fs.access(filePath, fs.F_OK, (err) => {

      // if file path exists
      if (!err) {

        // edge case: does user want to overwrite existing file?
        rl.question('This file already exists - press (y) and hit (enter) to overwrite this file: ', (confirmation) => {
          if (confirmation === 'y') {
            fs.writeFile(filePath, body, error => {
              if (error) {
                console.log('Error: ', error);
                return
              } else {
                console.log(`This file has been overwritten!` + '\n' + `Downloaded and saved ${body.length} bytes to ${filePath}`);
                rl.close();
              }
            })
          } else {
            rl.close();
          }
        })
        
      // if file path does not exist  
      } else {
        console.log(error);
        console.log('File path does not exist - please try again!');
        return;
      }
    })
  }
});