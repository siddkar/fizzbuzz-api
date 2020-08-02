/**
 * Utility method to generate the fizz buzz pattern, it takes in the count as request and returns the patternArray
 * 
 * @param {number} count
 * @returns {Array} patternArray
 */
const generateFizzBuzzPattern = (count) => {
    const patternArray = [];
    for (let i = 1; i <= count; i++) {
        switch (true) {
            case (i % 15 === 0):
                patternArray.push("FizzBuzz");
                break;
            case (i % 3 === 0):
                patternArray.push("Fizz");
                break;
            case (i % 5 === 0):
                patternArray.push("Buzz");
                break;
            default:
                patternArray.push(i);
                break;
        }
    }
    return patternArray;
};

module.exports = {
    generateFizzBuzzPattern,
};
