const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'',
        pass:'',
    }
});

const message = {
    from:'',
    to:'',
    subject:'issue solve',
};

transport.sendMail(message,(err,result)=>{
    if(err){
        console.log('error:',err);
    }
    else{
        console.log('success:',result);
    }
});