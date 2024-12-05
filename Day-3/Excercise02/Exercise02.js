let input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

const regexp = /mul\([0-9]?[0-9]?[0-9],[0-9]?[0-9]?[0-9]\)/gm
const DO_REGEXP = /do\(\)/gm
const DONT_REGEXP = /don\'t\(\)/gm

let matchesIteratorMul = [...input.matchAll(regexp)] 
let matchesIteratorDO = [...input.matchAll(DO_REGEXP)] 
let matchesIteratorDONT = [...input.matchAll(DONT_REGEXP)] 
let allMovements = []

// console.log(matchesIteratorMul);
// console.log('*************************************');
// console.log(matchesIteratorDO);
// console.log('------------------------------------');
// console.log(matchesIteratorDONT);

/*
[
  [
    'mul(2,4)',
    index: 1,
    input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
    groups: undefined
  ],
  [
    'mul(5,5)',
    index: 29,
    input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
    groups: undefined
  ],
  [
    'mul(11,8)',
    index: 53,
    input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
    groups: undefined
  ],
  [
    'mul(8,5)',
    index: 62,
    input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
    groups: undefined
  ]
]
*/

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

allMovements.sort( (a, b) =>  a.index-b.index  )

console.log(allMovements);

// let matchStringArray = matchesIterator.map( (match) => {
//     return match[0]
// } )

 let sum = 0;
 let doOperation = true;
 
allMovements.forEach( (matchString) => {

  if(matchString.operation.match(DONT_REGEXP)){
    doOperation = false
  }
  else if(matchString.operation.match(DO_REGEXP)){
    doOperation = true
  }
  else if(doOperation && matchString.operation.includes('mul(')){
    let indexOfOpeningParentesis = matchString.operation.indexOf('(')
    let indexOfComma = matchString.operation.indexOf(',')
    let indexOfClosingParentesis = matchString.operation.indexOf(')')

    let firstNumber =  +matchString.operation.substring(indexOfOpeningParentesis + 1 , indexOfComma);
    let secondNumber =  +matchString.operation.substring(indexOfComma + 1, indexOfClosingParentesis);

    console.log('indexOfOpeningParentesis',indexOfOpeningParentesis);
    console.log('indexOfComma',indexOfComma);
    console.log('indexOfClosingParentesis',indexOfClosingParentesis);
    console.log('firstNumber',firstNumber);
    console.log('secondNumber',secondNumber);

    sum = sum + ( firstNumber * secondNumber );
  }

} )



// console.log(matchStringArray);
 console.log('Total Sum', sum);
