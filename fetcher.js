// node app that takes two CL args: URL & local file path
// it should download the resource at URL to local path
// it should print out a msg upon completion

const request = require('request');
const fs = require('fs');
// takes in CL args
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

request(url, (error, response, body) => {
  console.log('statusCode: ', response);

  fs.writeFile(filePath, body, error => {
    if (error) {
      console.log('error: ', error);
      return
    }
  })
  console.log(`downloaded and saved ${body.length} bytes to ${filePath}`)
});