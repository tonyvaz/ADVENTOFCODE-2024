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
    const DO_REGEXP = /do\(\)/gm
    const DONT_REGEXP = /don\'t\(\)/gm

    let matchesIteratorMul = [...input.matchAll(regexp)]
    let matchesIteratorDO = [...input.matchAll(DO_REGEXP)]
    let matchesIteratorDONT = [...input.matchAll(DONT_REGEXP)]
    let allMovements = []


    matchesIteratorMul.forEach(element => {
      allMovements.push({
        operation: element[0],
        index: element.index
      })
    });

    matchesIteratorDO.forEach(element => {
      allMovements.push({
        operation: element[0],
        index: element.index
      })
    });

    matchesIteratorDONT.forEach(element => {
      allMovements.push({
        operation: element[0],
        index: element.index
      })
    });

    allMovements.sort((a, b) => a.index - b.index)
    let sum = 0;
    let doOperation = true;

    allMovements.forEach((matchString) => {

      if (matchString.operation.match(DONT_REGEXP)) {
        doOperation = false
      }
      else if (matchString.operation.match(DO_REGEXP)) {
        doOperation = true
      }
      else if (doOperation && matchString.operation.includes('mul(')) {
        let indexOfOpeningParentesis = matchString.operation.indexOf('(')
        let indexOfComma = matchString.operation.indexOf(',')
        let indexOfClosingParentesis = matchString.operation.indexOf(')')

        let firstNumber = +matchString.operation.substring(indexOfOpeningParentesis + 1, indexOfComma);
        let secondNumber = +matchString.operation.substring(indexOfComma + 1, indexOfClosingParentesis);

        // console.log('indexOfOpeningParentesis', indexOfOpeningParentesis);
        // console.log('indexOfComma', indexOfComma);
        // console.log('indexOfClosingParentesis', indexOfClosingParentesis);
        // console.log('firstNumber', firstNumber);
        // console.log('secondNumber', secondNumber);

        sum = sum + (firstNumber * secondNumber);
      }

    })

    // console.log(matchStringArray);
    console.log('Total Sum', sum);

  });

});
