var Uname = 'Suresh';
var age = 21;
var hasHobbies = true;
const notChangeable = 'Hardwork and suresh';

const aboutYou = (username,userage,userhasHobbies)=>
    'Hello '+username+' energetic at '+userage+' years and having hobbies :'+userhasHobbies;

console.log(aboutYou(Uname,age,hasHobbies));