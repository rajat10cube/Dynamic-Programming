/*
Write a function 'countConstruct(target,wordBank)' that accepts a target string and an array of substring of target string.

The function should return the number of ways that the 'target' can be constructed by concatenating elements of wordBank array
We may resuse elements of wordBank as many times as needed.
Example:
countConstruct(abcdef,[ab,abc,cd,def,abcd]) -> 1
countConstruct(purple,[purp,p,ur,le,purpl]) -> 2

*/

//Similar to canConstruct. Just returning numbers and adding them up instead of returning True/False

//m = target.length
//n = wordbank.length

// branching factor is n and height of the tree is m, so every level will get multiplied by n
//For this brute force method : 
//  O(n^m*m) time complexity {branching factor raise to height and multiplied by complexity of slicing} 
//  O(m*m) space complexity {m for stacks of tree and m for slicing}
const countConstruct=(target, wordBank)=>{
    if(target === '') return 1;

    let count = 0;
    for(let word of wordBank){
        if(target.indexOf(word) == 0){
            count += countConstruct(target.slice(word.length),wordBank)
        }
    }

    return count;
}

//For this Dynamic Programming
//  O(n*m*m) time complexity
//  O(m*m) space complexity
const countConstructDynamic=(target, wordBank, memo={})=>{
    if(target in memo) return memo[target];
    if(target === '') return 1;

    let count = 0;
    for(let word of wordBank){
        if(target.indexOf(word) == 0){
            count += countConstructDynamic(target.slice(word.length),wordBank,memo)
        }
    }

    memo[target] = count;
    return count;
}
console.log("Dynamic")
console.log(countConstructDynamic('abcdef',['ab','abc','cd','def','abcd']));                   //1
console.log(countConstructDynamic('purple',['purp','p','ur','le','purpl']));                   //2
console.log(countConstructDynamic("skateboard",["sk","bo","ard","skat","ate"]));               //1
console.log(countConstructDynamic("skateboard",["bo","rd","ate","t","ska","sk","boar"]));      //0
console.log(countConstructDynamic('enterapotentpot',['a','p','ent','enter','ot','o','t']));    //4
console.log(countConstructDynamic("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeef",                           //0
[
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
    "eeeeeee"
]));      
console.log("Brute Force")
console.log(countConstruct('abcdef',['ab','abc','cd','def','abcd']));                   //1
console.log(countConstruct('purple',['purp','p','ur','le','purpl']));                   //2
console.log(countConstruct("skateboard",["sk","bo","ard","skat","ate"]));               //1
console.log(countConstruct("skateboard",["bo","rd","ate","t","ska","sk","boar"]));      //0
console.log(countConstruct('enterapotentpot',['a','p','ent','enter','ot','o','t']));    //4
console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeef",                           //0
[
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
    "eeeeeee"
]));      