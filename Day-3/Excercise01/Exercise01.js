let input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

const regexp = /mul\([0-9]?[0-9]?[0-9],[0-9]?[0-9]?[0-9]\)/gm

let matchesIterator = [...input.matchAll(regexp)] 

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

    console.log('indexOfOpeningParentesis',indexOfOpeningParentesis);
    console.log('indexOfComma',indexOfComma);
    console.log('indexOfClosingParentesis',indexOfClosingParentesis);
    console.log('firstNumber',firstNumber);
    console.log('secondNumber',secondNumber);

    sum = sum + ( firstNumber * secondNumber );
    

} )



console.log(matchStringArray);
console.log('Total Sum', sum);
