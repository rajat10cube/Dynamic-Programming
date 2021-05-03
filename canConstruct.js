/*
Write a function 'canConstruct(target, wordbank)' that accepts a target string and an array of sub-strings from target string.

The function should return a boolean indicating whether or not the 'target' can be constructed by concatenating elements of 'wordbank' array
You may reuse elements of 'wordbank' as many times as needed

Example:
canConstruct(abcdef, [ab,abc,cd,def,abcd]) -> abc + def so True
canConstruct(skateboard, [bo,rd,ate,t,ska,sk,boar]) -> False
canConstruct('',[cat,dog,mouse]) -> True
*/

//m = target.length
//n = wordbank.length
// branching factor is n and height of the tree is m, so every level will get multiplied by n
//For this brute force method : 
//  O(n^m*m) time complexity {branching factor raise to height and multiplied by complexity of slicing} 
//  O(m*m) space complexity {m for stacks of tree and m for slicing}
const canConstruct=(target, wordbank)=>{
    if (target === '') return true;

    for(let word of wordbank){
        if(target.indexOf(word)==0){
            const suffix = target.slice(word.length);
            if(canConstruct(suffix,wordbank)){
                return true;
            }
        }
    }
    return false;
}
//For this Dynamic Programming
//  O(n*m*m) time complexity
//  O(m*m) space complexity
const canConstructDynamic=(target, wordbank,memo={})=>{
    if (target in memo) return memo[target];
    if (target === '') return true;

    for(let word of wordbank){
        if(target.indexOf(word)==0){
            const suffix = target.slice(word.length);
            if(canConstructDynamic(suffix,wordbank,memo)){
                memo[target] = true;
                return true;
            }
        }
    }
    memo[target]=false;
    return false;
}


console.log(canConstructDynamic("abcdef",["ab","abc","cd","def","abcd"]));              //true
console.log(canConstructDynamic("skateboard",["bo","rd","ate","t","ska","sk","boar"])); //false
console.log(canConstructDynamic("skateboard",["sk","bo","ard","skat","ate"]));          //true

console.log(canConstructDynamic("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeef",
[
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
    "eeeeeee"
]));                                                                       //false



console.log(canConstruct("abcdef",["ab","abc","cd","def","abcd"]));              
console.log(canConstruct("skateboard",["bo","rd","ate","t","ska","sk","boar"])); 
console.log(canConstruct("skateboard",["sk","bo","ard","skat","ate"]));          
console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeef",[
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
    "eeeeeee"]));
