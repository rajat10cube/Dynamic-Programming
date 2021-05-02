/* 
Given target sum and array of numbers, return an array containing shortest Combination of numbers that add up to targetSum
Example:
targetSum : 8
numbers   : [2,3,5]

the function should return [5,3] as it is the shortest among [2,2,2,2], [5,3], [3,3,2] (numbers that add upto 8)

*/


//if m is target sum and n is length of numbers
//brute Force with O(n^m*m) time complexity and O(m^2) space complexity
const bestSumNormal = (targetSum, numbers) =>{
    //for the recursive call, if targetSum becomes 0 -> we found the set of numbers that add up to targetSum
    if(targetSum === 0 ) return [];
    //if the targetSum becomes less than 0, the given sequence of numbers cannot add up to targetSum
    if(targetSum < 0) return null;

    //initialising a variable to store list of shortest Combination of numbers that add up to targetSum
    let bestCombination = null

    //iterating through the loop of numbers so we can check every number from array with the targetSum
    for (let num of numbers){
        const remainder = targetSum - num;
        //recursive call to the function with the remainder as targetSum now
        const result = bestSumNormal(remainder, numbers);
        if( result !== null ){
            //adding the number which added up to give targetSum in the variable of array which stores solution
            const combination = [... result, num];
            //finding the shortest array among all solutions
            if(bestCombination===null || combination.length < bestCombination.length){
                bestCombination = combination;
            }
        }
    }
    return bestCombination;
     
};

/*
Three steps to convert any function to dynamic programming
    1. Add a memo object (keys: argument to our function; value:return value)
    2. Add a base case to return memo values
    3. Store return values to memo
*/

//dynamic memoization with O(n*m^2) time complexity and O(m^2) space complexity
const bestSumDynamic = (targetSum, numbers, memo={}) =>{
    //1. Add a memo object (keys: argument to our function; value:return value)
    //2. Add a base case to return memo values
    if(targetSum in memo) return memo[targetSum];
    if(targetSum === 0 ) return [];
    if(targetSum < 0) return null;

    let bestCombination = null

    for (let num of numbers){
        const remainder = targetSum - num;
        const result = bestSumDynamic(remainder, numbers, memo);
        if( result !== null ){
            const combination = [... result, num];
            if(bestCombination===null || combination.length < bestCombination.length){
                bestCombination = combination;
            }
        }
    }
    // 3. Store return values to memo
    memo[targetSum] =  bestCombination;
    return memo[targetSum];
};

console.log(bestSumDynamic(7,[5,3,4,7]))   //[7]
console.log(bestSumDynamic(8,[2,3,5]))     //[3,5]
console.log(bestSumDynamic(8,[1,4,5]))     //[4,4]
console.log(bestSumDynamic(100,[1,2,5,25]))//[25,25,25,25]

console.log(bestSumNormal(7,[5,3,4,7]))   //[7]
console.log(bestSumNormal(8,[2,3,5]))     //[3,5]
console.log(bestSumNormal(8,[1,4,5]))     //[4,4]
console.log(bestSumNormal(100,[1,2,5,25]))//[25,25,25,25]
