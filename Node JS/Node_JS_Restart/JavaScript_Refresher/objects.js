//Objects in JS
const person ={
    name:'Suresh',
    age:21,
    greet: function(){
        console.log('Hello I am '+this.name);
    }
};
person.greet(); 

// Arrays
const hobbies = ['Coding','Debugging'];
for(var i of hobbies){
    console.log(i);
}

const new_hobbies = hobbies.map(hobby=>hobby.toUpperCase());
console.log('New hobbies are :'+new_hobbies);
console.log('Old hobbies are :'+hobbies);
new_hobbies.push('Destructuring');
console.log('After Push :'+new_hobbies);

//Spread Operator
const copiedArray = [...hobbies];
console.log('Copied array :'+copiedArray);
console.log('Altering the copied array');
copiedArray.push('100');
console.log('[  Copied array :'+copiedArray);
console.log('Original array :'+hobbies+"    ]");

const copiedPerson = {...person};
console.log('Copying Object....'+copiedPerson.name);

//Rest operator
const RestExample = function(...args){
    return args;
}
console.log(RestExample(1,2,3,4,5));