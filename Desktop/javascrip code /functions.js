// basic function
function greet(name) {
return 'hello,${name}!';
}
console.log(greet('gadiye'));

// function with multiple parameters 
function calculatearea(length , width) {
    return lenth * width;
}
console.log(calculatearea(234 , 568));

//function with default parameters
function power(base , exponent = 2) {
    return Math.pow(base , exponent);
}
console.log(power(7))
console.log(power(5 , 10))

//arrow function 
const multiply = (a, b) => a * b;

console.log(multiply(4 , 6));

//function as parameter (call back)
function ProsessArray(arr , callback) {
    return arr.map(callback);
}

const numbers = [1,2,3,4,5,];
const doubled = ProssesArray(numbers, (num) => num * 2);

console.log(doubled); 

//closure
function counter() {
    let count = 0;
    return function() {
        count++;
        return count;

    };
}

const increment = counter();
console.log(increment());
console.log(increment());
console.log(increment());