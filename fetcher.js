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
  if (response.statusCode !== 200) {
    console.log('The URL specified is invalid - please try again!');
    rl.close();
  } else {

  fs.writeFile(filePath, body, error => {
    if (error) {
      console.log('Error: ', error);
      return
    }
  })
  console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`)
}
});