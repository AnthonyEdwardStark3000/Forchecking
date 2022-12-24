const sum = function(a,b){
    if(a&&b){
        return a+b;
    }
    throw new Error('Need 2 numbers to perform arithmetic operation !');
}
try{console.log(sum(1));}
catch(error){
    console.log('error occurred!');
    console.log(error);
}
