// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// validateCred() uses Luhn's algorithm to determine if the credit card number is valid
const validateCred = (number) => {
    //store number so last digit can be removed without mutating original array
    const storedNumber = number.slice();
    //remove last digit for later
    let lastDigit = storedNumber.pop();
    //reverse number
    let reverseArray = storedNumber.reverse();
    //finds odd array numbers, times 2 and minus 9 if over 9
    let oddArraySorter = [];
    for (var i = 0; i < reverseArray.length; i++) {
        if (i % 2 === 1) { // index is even
            oddArraySorter.push(reverseArray[i]);
        } else {
            let timeTwo = reverseArray[i] * 2;
            if (timeTwo > 9) {
                oddArraySorter.push(timeTwo - 9)
            } else {
                oddArraySorter.push(timeTwo)
            };
        };
    };
    //add numbers in array using .reduce()
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let arraySum = oddArraySorter.reduce(reducer);
    //if 0 is returned from modulo number is valid and returns true
    if ((arraySum + lastDigit) % 10 === 0) {
        return true;
    } else {
        return false;
    };
    //end of validateCred()
};
//function that pushes invalid numbers into invalidArrays array which is then returned
const findInvalidCards = numberArrays => {
    let invalidArrays = [];
    for (var i = 0; i < numberArrays.length; i++) {
        if (validateCred(numberArrays[i]) === false)
            invalidArrays.push(numberArrays[i]);
    };
    return invalidArrays;
    //end of findInvalidCards()
};
let storedInvalidNumbers = findInvalidCards(batch);
//this function determines if an invalid card relates to a particular company and returns these as an array
const idInvalidCardCompanies = (storedInvalidNumbers) => {
    let companyArray = [];
    for (var i = 0; i < storedInvalidNumbers.length; i++) {
        let firstNumber = storedInvalidNumbers[i][0];
        let AmexExists = (firstNumber) => firstNumber === 3;
        const VisaExists = (firstNumber) => firstNumber === 4;
        const MastercardExists = (firstNumber) => firstNumber === 5;
        const DiscoverExists = (firstNumber) => firstNumber === 6;
        //if companyArray does not already have Amex
        if (companyArray.includes('Amex (American Express)') != true && AmexExists(firstNumber) == true) {
            companyArray.push('Amex (American Express)');
        } else if (companyArray.includes('Visa') != true && VisaExists(firstNumber) == true) {
            companyArray.push('Visa');
        } else if (companyArray.includes('Mastercard') != true && MastercardExists(firstNumber) == true) {
            companyArray.push('Mastercard');
        } else if (companyArray.includes('Discover') != true && DiscoverExists(firstNumber) == true) {
            companyArray.push('Discover');
        } else if (companyArray.includes('Company not found') != true) {
            companyArray.push('Company not found');
        };
    };
    return companyArray;
};
//batch is called as example, batch stores all valid, invalid and mystery arrays
console.log(idInvalidCardCompanies(findInvalidCards(batch)))
