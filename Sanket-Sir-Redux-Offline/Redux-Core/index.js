import { compose } from "redux";

function removeSpaces (str = "") {
    return str.split(" ").join("");
}

function doubleString(str) {
    return str+str;
}

function strToUpper(str) {
    return str.toUpperCase();
}

let str = "Manik Maity";
// const result = strToUpper(doubleString(removeSpaces(str)));

// have to write the function in oder of execution 
const composeFn = compose(removeSpaces, doubleString, strToUpper);
const result = composeFn(str);
console.log(result)