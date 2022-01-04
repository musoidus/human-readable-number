const numbersWritten = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
    100: "hundred",
    1000: "thousand",
    1000000: "million",
};

function decimalInWords(number) {
    let decimalReadable = "";
    const decimalNumber = number % 100;
    if (decimalNumber >= 20 && number % 10 !== 0)
        // decimal part >20, not multiple 10
        decimalReadable += `${numbersWritten[decimalNumber - (number % 10)]} ${
            numbersWritten[number % 10]
        }`;
    if (
        (decimalNumber > 9 && decimalNumber < 20) || //teens
        (decimalNumber > 9 && decimalNumber % 10 === 0) || //multiple 10
        (decimalNumber > 0 && decimalNumber < 10) // 1-9
    )
        decimalReadable += `${numbersWritten[decimalNumber]}`;

    return decimalReadable;
}

function inWords(number) {
    let result = "";

    if (number / 100 >= 1) {
        // add hundreds description to the result
        result += `${numbersWritten[Math.floor(number / 100)]} hundred`;
        if (number % 100 !== 0) result += " "; // if decimal > 0 add space
        // add decimals description to the result
        result += decimalInWords(number);
    } else {
        // number does`t have hundreds, if decimal > 0, add description
        if (number % 100 > 0) {
            result += decimalInWords(number);
        }
    }
    return result;
}

module.exports = function toReadable(number) {
    const million = Math.floor(number / 1e6); // get million part xxx.000.000
    const thousand = Math.floor((number % 1e6) / 1e3); // get thousand part 000.xxx.000
    const hundred = Math.floor(number % 1e3); // get hundred part 000.000.xxx
    return (
        (million ? inWords(million) + " million " : "") + // add if number contains million part
        (thousand ? inWords(thousand) + " thousand " : "") + // add if number contains thousand part
        (hundred ? inWords(hundred) : `${numbersWritten[0]}`) // add if number is not 0, or 'zero'
    );
};
