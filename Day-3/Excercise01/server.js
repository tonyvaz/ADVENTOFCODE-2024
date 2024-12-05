const { createServer } = require('node:http');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  //console.log(`Server running at http://${hostname}:${port}/`);

  
fs.readFile('../input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let input = data;
    const regexp = /mul\([0-9]?[0-9]?[0-9],[0-9]?[0-9]?[0-9]\)/gm
    let matchesIterator = [...input.matchAll(regexp)] 
    

    let matchStringArray = matchesIterator.map( (match) => {
        return match[0]
    } )
    
    let sum = 0;
     
    matchStringArray.forEach( (matchString) => {
        let indexOfOpeningParentesis = matchString.indexOf('(')
        let indexOfComma = matchString.indexOf(',')
        let indexOfClosingParentesis = matchString.indexOf(')')
    
        let firstNumber =  +matchString.substring(indexOfOpeningParentesis + 1 , indexOfComma);
        let secondNumber =  +matchString.substring(indexOfComma + 1, indexOfClosingParentesis);
    
        // console.log('indexOfOpeningParentesis',indexOfOpeningParentesis);
        // console.log('indexOfComma',indexOfComma);
        // console.log('indexOfClosingParentesis',indexOfClosingParentesis);
        // console.log('firstNumber',firstNumber);
        // console.log('secondNumber',secondNumber);
    
        sum = sum + ( firstNumber * secondNumber );
    

    } )
    
    
    
    // console.log(matchStringArray);
    console.log('Total Sum', sum);

  });

});
